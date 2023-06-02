import { defineStore } from "pinia";
import axios from "axios";
const baseUrl = "http://localhost:3000";

export const useItemStore = defineStore("item", {
  state: () => ({
    items: [],
    currentPage: 1,
    totalItems: 0,
    maxPage: 1,
    query: "",
    totalPage: 1,
    targetItem: {},
  }),
  actions: {
    async fetchItems(page, search) {
      if (!search || search === "") {
        this.query = `?count=8&page=${page}`;
        this.currentPage = page;
      } else {
        this.query = `?search=${search}`;
      }

      try {
        const fetchItems = await axios.get(`${baseUrl}/getItems`);
        console.log(fetchItems);
        this.items = fetchItems.data.data.items;
        this.items.forEach((element) => {
          element.price = element.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          });
        });
      } catch (err) {
        console.log(err);
      }
    },

    async fetchItemById(id) {
      try {
        const selectedItem = await axios.get(`${baseUrl}/getItems/${id}`);
        this.targetItem = selectedItem.data;
        this.targetItem.price = this.targetItem.price.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
});
