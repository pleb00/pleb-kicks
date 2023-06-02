const { hashPassword, comparePassword } = require("../helpers/encryption");
const { signToken, verifyToken } = require("../helpers/jwt");
const { Brand, Invoice, Item, User, Wishlist } = require("../models/index");
const axios = require("axios");
const { Op } = require("sequelize");
const emailGenerator = require("../helpers/mailer");
const midtransClient = require("midtrans-client");
const passport = require("passport");
const GitHubStrategy = require("passport-github2");
const { isErrored } = require("nodemailer/lib/xoauth2");

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password, fullName } = req.body;
      const newAccount = await User.create({
        username,
        email,
        password,
        fullName,
      });
      emailGenerator(email);
      res.status(201).json(newAccount);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const targetAccount = await User.findOne({
        where: {
          email,
        },
      });

      const payload = {
        id: targetAccount.id,
        username: targetAccount.username,
      };

      const verdict = comparePassword(targetAccount.password, password);
      const access_token = signToken(payload);

      console.log(verdict);
      console.log(access_token);
      res.status(200).json({
        id: targetAccount.id,
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addBrand(req, res, next) {
    try {
      const { brand } = req.body;
      const newBrand = await Brand.create({
        name: brand,
      });

      res.status(201).json(newBrand);
    } catch (error) {
      next(error);
    }
  }

  static async addShoes(req, res, next) {
    try {
      const { name, brandId, price, description, imageUrl, size, stock } =
        req.body;
      console.log(name, brandId, price, description, imageUrl, size, stock);
      const newShoes = await Item.create({
        name,
        brandId,
        price,
        description,
        imageUrl,
        size,
        stock,
      });
      res.status(201).json(newShoes);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addToCart(req, res, next) {
    try {
      const { itemId } = req.params;
      const { ammount } = req.body;
      const userId = req.user.id;

      const targetItem = await Item.findByPk(itemId);
      const targetPrice = targetItem.price;

      const newInvoice = await Invoice.create({
        itemId,
        userId,
        ammount,
        totalPayment: ammount * targetPrice,
        status: "Unpaid",
      });

      res.status(201).json(newInvoice);
    } catch (error) {
      // next(error);
      console.log(error);
    }
  }

  static async getInvoices(req, res, next) {
    try {
      const { id } = req.user;

      const allInvoices = await Invoice.findAll({
        where: {
          userId: id,
          status: "Unpaid",
        },
        include: [
          {
            model: Item,
            include: [Brand],
          },
        ],
      });

      let finalPayment = 0;
      allInvoices.forEach((element) => {
        finalPayment += element.totalPayment;
      });
      console.log(finalPayment);
      res.status(200).json({
        allInvoices,
        finalPayment,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readItems(req, res, next) {
    try {
      let { count, page, search } = req.query;
      console.log(req.query);
      let option = {
        include: [Brand],
        order: [["id", "ASC"]],
        offset: (+page - 1) * count,
        limit: +count,
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${search}%`,
              },
            },
          ],
        },
      };

      if (!search) {
        delete option.where;
      }

      if (!count || !page) {
        delete option.limit;
        delete option.offset;
      }
      const items = await Item.findAndCountAll(option);
      const totalPage = Math.ceil(items.count / 5);

      res.status(200).json({
        statusCode: 200,
        data: {
          totalPost: items.count,
          page: +page,
          limit: +count,
          search: search,
          items: items.rows,
          totalPage,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async readItemById(req, res, next) {
    try {
      const { id } = req.params;
      const targetItem = await Item.findByPk(id, {
        include: [Brand],
      });

      res.status(200).json(targetItem);
    } catch (error) {
      next(error);
    }
  }

  static async addWishlist(req, res, next) {
    try {
      const { id } = req.user;
      const { itemId } = req.params;
      console.log("PLEB");
      const result = await Wishlist.findOrCreate({
        where: {
          userId: id,
          itemId,
        },
      });
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      // next(error);
    }
  }

  static async getWishlist(req, res, next) {
    try {
      const { id } = req.user;
      const readWishlist = await Wishlist.findAll({
        where: {
          userId: id,
        },
        include: [
          {
            model: Item,
            include: [Brand],
          },
        ],
      });

      res.status(200).json(readWishlist);
    } catch (error) {
      next(error);
    }
  }

  static async deleteWishlist(req, res, next) {
    try {
      const { itemId } = req.params;
      console.log(itemId);
      const deletedWishlist = await Wishlist.destroy({
        where: {
          itemId,
        },
      });

      res.status(200).json(deletedWishlist);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async deleteInvoice(req, res, next) {
    try {
      const { invId } = req.params;
      const targetDelete = await Invoice.destroy({
        where: {
          id: invId,
        },
      });
      res.status(200).json(targetDelete);
    } catch (error) {
      next(error);
    }
  }

  static async midtransToken(req, res, next) {
    try {
      const { ammount } = req.body;
      const { id } = req.user;
      console.log(req.user);
      const targetUser = await User.findByPk(id);
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id:
            "TRANSACTION_" + Math.floor(1000000 + Math.random() * 9000000),
          gross_amount: +ammount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          fullName: targetUser.fullName,
          email: targetUser.email,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      // console.log(midtransToken);
      res.status(200).json(midtransToken);
    } catch (error) {
      console.log(error);
    }
  }

  static async readProvinceRajaOngkir(req, res, next) {
    try {
      const { id } = req.query;
      const data = await axios({
        method: "get",
        url: `https://api.rajaongkir.com/starter/province/`,
        headers: {
          key: process.env.RAJA_ONGKIR_KEY,
        },
        params: {
          id: id,
        },
      });

      res.status(200).json(data.data.rajaongkir.results);
    } catch (err) {
      next(err);
    }
  }

  static async readCityRajaOngkir(req, res, next) {
    try {
      const { id, province } = req.query;
      const data = await axios({
        method: "get",
        url: `https://api.rajaongkir.com/starter/city`,
        headers: {
          key: process.env.RAJA_ONGKIR_KEY,
        },
        params: {
          id: id,
          province: province,
        },
      });

      res.status(200).json(data.data);
    } catch (err) {
      next(err);
    }
  }

  static async readDistrictRajaOngkir(req, res, next) {
    try {
      const { id, city } = req.query;
      const data = await axios({
        method: "get",
        url: `https://pro.rajaongkir.com/api/subdistrict`,
        headers: {
          key: process.env.RAJA_ONGKIR_KEY,
        },
        params: {
          id: id,
          city: city,
        },
      });

      res.status(200).json(data.data);
    } catch (err) {
      next(err);
    }
  }

  static async readCostRajaOngkir(req, res, next) {
    try {
      const { origin, destination, weight, courier } = req.body;
      const input = {
        origin: origin,
        originType: "city",
        destination: destination,
        destinationType: "subdistrict",
        weight: weight,
        courier: courier,
      };

      const formData = querystring.stringify(input);

      const result = await axios.post(
        "https://pro.rajaongkir.com/api/cost",
        formData,
        {
          headers: {
            key: process.env.RAJA_ONGKIR_KEY,
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      );

      res.status(200).json(result.data);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async githubLogin(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async googleLogin(req, res, next) {
    try {
      const client = new OAuth2Client(process.env.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      // (payload);
      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: "!@#$%^&*()_+",
        },
        hooks: false,
      });

      // (user);

      // assign token
      const generatePayload = {
        id: user.dataValues.id,
        username: user.dataValues.username,
      };

      const access_token = signToken(generatePayload);
      access_token;

      res.status(201).json({
        id: user.dataValues.id,
        access_token,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
