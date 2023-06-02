import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "http://localhost:3000";

export const useAccountStore = defineStore("account", {
  state: () => ({
    isLogged: false,
  }),
  actions: {
    async login(email, password) {
      try {
        const account = await axios.post(`${baseUrl}/login`, {
          email,
          password,
        });

        localStorage.setItem("access_token", account.data.access_token);
        this.isLoggedIn = true;
        Swal.fire({
          icon: "success",
          title: "Login success!",
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.push("/");
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Login gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },

    async register(username, email, password, fullName) {
      try {
        const newAccount = await axios.post(`${baseUrl}/register`, {
          username,
          email,
          password,
          fullName,
        });

        Swal.fire({
          icon: "success",
          title: "Regsiter success!",
          showConfirmButton: false,
          timer: 1500,
        });

        this.router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
});
