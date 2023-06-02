<script>
import { RouterLink } from 'vue-router'
import { useAccountStore } from '../stores/accountStore.js';
import { mapState, mapActions } from 'pinia';
import Swal from 'sweetalert2'


export default {
    name: "LoginView",
    data() {
        return {
            email: "",
            password: "",
        }
    },
    methods: {
        ...mapActions(useAccountStore, ['login']),
        loginSubmit() {
            this.login(this.email, this.password)
        }
    },
}
</script>

<template>
    <html lang="en">

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.tailwindcss.com" rel="stylesheet">
    </head>

    <body class="h-screen overflow-hidden flex items-center justify-center bg-zinc-850">
        <div class=" bg-no-repeat bg-cover bg-center relative">
            <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
                <div class="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
                    <div class="self-start hidden lg:flex flex-col  text-white">
                        <img src="" class="mb-3">
                        <h1 class="mb-3 font-bold text-5xl">Pleb Kicks</h1>
                        <p class="pr-3">"Sure, our shoes are overpriced. But at least your money is in my pocket now"</p>
                    </div>
                </div>
                <div class="flex justify-center self-center  z-10">
                    <div class="p-12 bg-zinc-800 mx-auto rounded-2xl w-100 ">
                        <div class="mb-4">
                            <h3 class="font-semibold text-2xl text-white">Sign In </h3>
                            <p class="text-gray-500">Please sign in to your account.</p>
                        </div>

                        <form action="" @submit.prevent="loginSubmit">
                            <div class="space-y-5">
                                <div class="space-y-2">
                                    <label class="text-sm font-medium text-white tracking-wide">Email</label>
                                    <input v-model="email"
                                        class=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                                        type="" placeholder="Enter your email">
                                </div>
                                <div class="space-y-2">
                                    <label class="mb-5 text-sm font-medium text-white tracking-wide">
                                        Password
                                    </label>
                                    <input v-model="password"
                                        class="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                                        type="password" placeholder="Enter your password">
                                </div>
                                <div class="flex items-center justify-between">
                                    <div class="text-sm">
                                        <RouterLink to="/register">
                                            <a href="#" class="flex justify-end text-green-400 hover:text-green-500">
                                                Sign Up Here!
                                            </a>
                                        </RouterLink>
                                    </div>
                                </div>
                                <div>
                                    <button type="submit"
                                        class="btn btn-primary w-full flex justify-center  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500 text-black">
                                        Sign in
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </body>

    </html>
</template>