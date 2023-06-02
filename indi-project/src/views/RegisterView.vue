<script>
import { RouterLink } from 'vue-router'
import { useAccountStore } from '../stores/accountStore.js';
import { mapState, mapActions } from 'pinia';
import Swal from 'sweetalert2'

export default {
    name: "RegisterView",
    data() {
        return {
            username: "",
            email: "",
            password: "",
            fullName: "",
        }
    },
    methods: {
        ...mapActions(useAccountStore, ['register']),
        submitRegister() {
            this.register(this.username, this.email, this.password, this.fullName)
        }
    }
}
</script>

<template>
    <div class="hero min-h-screen bg-base-200">
        <div class="hero-content flex-col lg:flex-row-reverse">
            <div class="text-center lg:text-left">
                <h1 class="text-5xl font-bold">Register now!</h1>
                <p class="py-6">And experience a discount of a lifetime! The shoes you ordered might not be delivered, but
                    you'll experience the discount anyway</p>
            </div>
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div class="card-body">

                    <form @submit.prevent="submitRegister" action="">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Username</span>
                            </label>
                            <input v-model="username" type="text" placeholder="johndoe" class="input input-bordered" />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input v-model="email" type="text" placeholder="John@doe.com" class="input input-bordered" />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Password</span>
                            </label>
                            <input v-model="password" type="password" placeholder="Password" class="input input-bordered" />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Full Name</span>
                            </label>
                            <input v-model="fullName" type="text" placeholder="John Doe" class="input input-bordered" />
                        </div>
                        <div class="form-control mt-6">
                            <button class="btn btn-primary">Login</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</template>