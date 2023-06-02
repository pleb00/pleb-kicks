const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

const { authenticate } = require("../middlewares/auths");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/addShoes", Controller.addShoes);
router.post("/addBrand", Controller.addBrand);
router.get("/getItems", Controller.readItems);
router.get("/getItems/:id", Controller.readItemById);
// router.post("/github-callback", Controller.githubLogin);
// router.post("/google-callback", Controller.googleLogin);
router.use(authenticate);
router.post("/generateMidtransToken", Controller.midtransToken);
router.get("/getInvoices", Controller.getInvoices);
// router.patch("/updateStatus", Controller.updateStatus);
router.post("/addInvoice/:itemId", Controller.addToCart);
router.get("/getWishlist", Controller.getWishlist);
router.post("/addWishlist/:itemId", Controller.addWishlist);
router.delete("/deleteWishlist/:itemId", Controller.deleteWishlist);
router.delete("/deleteInvoice/:invId", Controller.deleteInvoice);

module.exports = router;
