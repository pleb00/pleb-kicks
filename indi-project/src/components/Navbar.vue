<script>
import { RouterLink, RouterView } from 'vue-router'
import { useAccountStore } from '../stores/accountStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useInvoiceStore, useCartStore } from '../stores/invoiceStore';
import { mapState, mapActions, mapWritableState } from 'pinia';
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
    name: "Navbar",
    data() {
        return {
            access_token: "",
            search: "",
        }
    },
    computed: {
        ...mapWritableState(useAccountStore, ['isLogged']),
        ...mapState(useCartStore, ['totalPayment', 'totalItem', 'rawNumberPayment', 'carts'])
    },
    methods: {
        ...mapActions(useCartStore, ['readInvoice']),
        ...mapActions(useWishlistStore, ['wishlists']),
        logout() {
            localStorage.clear()
            this.isLogged = false;
            this.$router.push('/')
            Swal.fire({
                icon: "success",
                title: "Logout success",
                showConfirmButton: false,
                timer: 1500,
            });
        },
        loginChecker() {
            const access_token = localStorage.getItem('access_token')
            if (access_token) {
                this.isLogged = true
            } else {
                this.isLogged = false
            }
        },

        async checkout() {
            const result = await axios.post("http://localhost:3000/generateMidtransToken", {
                ammount: this.rawNumberPayment
            },
                {
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
            console.log(result.data)
            window.snap.pay(result.data.token, {
                onSuccess: function (result) {
                    /* You may add your own implementation here */
                    alert("payment success!"); console.log(result);
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    alert("wating your payment!"); console.log(result);
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    alert("payment failed!"); console.log(result);
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    alert('you closed the popup without finishing the payment');
                }
            })
        },

        async getInvoiceForNavbar() {
            this.readInvoice();
        }
    },
    async created() {
        this.loginChecker();
        this.getInvoiceForNavbar();
    },
}
</script>

<template>
    <div class="m-5">
        <div class="navbar bg-zinc-950 rounded-xl flex justify-center">
            <div class="flex-1">
                <RouterLink to="/">
                    <a class="btn btn-ghost normal-case text-xl">Pleb Kicks</a>
                </RouterLink>
            </div>
            <div class="flex-none">
                <div @click="getAllInvoice" class="dropdown dropdown-end">
                    <label tabindex="0" class="btn btn-ghost btn-circle">
                        <div class="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span class="badge badge-sm indicator-item">{{ this.carts.length }}</span>
                        </div>
                    </label>
                    <div tabindex="0" class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                        <div class="card-body bg-zinc-900">
                            <span class="font-bold text-lg">{{ this.carts.length }} Items</span>
                            <span class="text-info">Subtotal: {{ totalPayment }}</span>
                            <div class="card-actions">
                                <button @click="checkout" class="btn btn-primary btn-block">Checkout</button>
                            </div>
                            <RouterLink to="/cart">
                                <div class="card-actions">
                                    <button class="btn btn-secondary btn-block">Edit
                                        Cart</button>
                                </div>
                            </RouterLink>
                        </div>
                    </div>
                </div>
                <div class="dropdown dropdown-end ml-3">
                    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img src="../assets/profile.png" />
                        </div>
                    </label>
                    <div v-if="isLogged === true">
                        <ul tabindex="0"
                            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 bg-zinc-900">
                            <li>
                                <a class="justify-between">
                                    Profile
                                </a>
                            </li>
                            <li>
                                <RouterLink to="/wishlist">
                                    <a>Wishlist</a>
                                </RouterLink>
                            </li>
                            <li><a>Cart</a></li>
                            <li @click="logout"><a>Logout</a></li>
                        </ul>
                    </div>

                    <div v-else>
                        <ul tabindex="0"
                            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 bg-zinc-900">
                            <RouterLink to="/login">
                                Login
                            </RouterLink>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>