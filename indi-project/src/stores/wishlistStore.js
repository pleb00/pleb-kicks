import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://localhost:3000";

export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    wishlists: [],
  }),
  actions: {
    async addWishlist(id) {
      try {
        const newWishlist = await axios.post(
          `${baseUrl}/addWishlist/${id}`,
          {},
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        Swal.fire({
          icon: "success",
          title: "Berhasil menambahkan wishlist",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        console.log(err);
      }
    },

    async fetchWishlist() {
      try {
        const getWishlist = await axios.get(`${baseUrl}/getWishlist`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        const arrayWishlists = getWishlist.data.map((element) => {
          return element.Item;
        });

        this.wishlists = arrayWishlists;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
