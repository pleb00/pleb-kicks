<script>
import Card from "../components/Card.vue"
import { RouterLink } from 'vue-router'
import { useItemStore } from '../stores/itemStore';
import { useCartStore } from '../stores/invoiceStore'
import { useInvoiceStore } from '../stores/invoiceStore'
import { mapState, mapActions } from 'pinia';
import Swal from 'sweetalert2'
export default {
    name: "CartView",
    data() {
        return {

        }
    },
    computed: {
        ...mapState(useCartStore, ['totalPayment', 'totalItem', 'rawNumberPayment', 'carts'])
    },
    methods: {
        ...mapActions(useCartStore, ['readInvoice', 'deleteInvoice']),
        submitDeletion(id) {
            this.deleteInvoice(id)
            this.readInvoice()
        }
    },
}
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-6">
        <div v-for="item in carts" :key="item.id">
            <div class="w-full rounded-xl">
                <div class="card w-90 bg-base-100 shadow-xl bg-zinc-900">
                    <figure><img :src="item.imageUrl" alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">
                            {{ item.name }}
                        </h2>
                        <p>{{ item.price }}</p>
                        <div class="card-actions justify-end">
                            <div class="badge badge-outline">{{ item.Brand.name }}</div>
                        </div>
                        <div @click.prevent="submitDeletion(item.invoiceId)">
                            <button class="btn btn-square btn-outline">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>