import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://localhost:3000";

export const useInvoiceStore = defineStore("invoice", {
  state: () => ({
    invoices: [],
    orderAmmount: 0,
    itemId: 0,
  }),
  actions: {
    async addInvoice(ammount, id) {
      try {
        const newInvoice = await axios.post(
          `${baseUrl}/addInvoice/${id}`,
          {
            ammount,
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        Swal.fire({
          icon: "success",
          title: "Berhasil menambahkan order",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
});

export const useCartStore = defineStore("Cart", {
  state: () => ({
    carts: [],
    totalPayment: 0,
    totalItem: 0,
    rawNumberPayment: 0,
  }),
  actions: {
    async readInvoice() {
      try {
        const allInvoice = await axios.get(`${baseUrl}/getInvoices`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        const rawInvoice = allInvoice.data.allInvoices;
        this.totalItem = this.carts.length;
        this.rawNumberPayment = allInvoice.data.finalPayment;
        this.totalPayment = this.rawNumberPayment.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        });
        this.carts = rawInvoice.map((element) => {
          element.Item.ammount = element.ammount;
          element.Item.totalPayment = element.totalPayment;
          element.Item.status = element.status;
          element.Item.invoiceId = element.id;
          return element.Item;
        });
      } catch (err) {
        console.log(err);
      }
    },

    async deleteInvoice(id) {
      try {
        const targetDeletion = await axios.delete(
          `${baseUrl}/deleteInvoice/${id}`,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
});
