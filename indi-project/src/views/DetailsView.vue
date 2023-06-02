<script>
import Card from "../components/Card.vue"
import { RouterLink } from 'vue-router'
import { useItemStore } from '../stores/itemStore';
import { useWishlistStore } from '../stores/wishlistStore'
import { useInvoiceStore, useCartStore } from '../stores/invoiceStore'
import { mapState, mapActions } from 'pinia';
import Swal from 'sweetalert2'
export default {
    name: "DetailsView",
    data() {
        return {
        }
    },
    computed: {
        ...mapState(useItemStore, ['targetItem']),
        ...mapState(useInvoiceStore, ['orderAmmount', 'itemId'])
    },
    methods: {
        ...mapActions(useItemStore, ['fetchItemById']),
        ...mapActions(useWishlistStore, ['addWishlist']),
        ...mapActions(useInvoiceStore, ['addInvoice']),
        ...mapActions(useCartStore, ['readInvoice']),
        addNewWishlist() {
            this.addWishlist(this.$route.params.id)
        },
        insertAmmount() {
            Swal.fire({
                title: 'Submit ammount',
                input: 'number',
                showCancelButton: true,
                confirmButtonText: 'Place order',
                showLoaderOnConfirm: true,
                preConfirm: (result) => {
                    this.addInvoice(result, this.$route.params.id)
                },
                allowOutsideClick: () => !Swal.isLoading(),
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: `${result.value.login}'s avatar`,
                    })
                }
                this.readInvoice()
            })

        }
    },

    async created() {
        this.fetchItemById(this.$route.params.id)
    }
}
</script>

<template>
    <div class="hero min-h-screen bg-base-200">
        <div class="hero-content flex-col lg:flex-row">
            <img :src="targetItem.imageUrl" class="max-w-sm rounded-lg shadow-2xl" />
            <div>
                <h1 class="text-4xl font-bold">{{ targetItem.Brand.name }}</h1>
                <h1 class="text-3xl font-bold">{{ targetItem.name }}</h1>
                <h1 class="text-1xl font-bold">{{ targetItem.price }}</h1>
                <p class="py-6">{{ targetItem.description }}</p>
                <button @click="insertAmmount" class="btn btn-primary">Add to cart</button>
                <button @click="addNewWishlist" class="ml-2 btn btn-accent">Add to Wishlist</button>
            </div>
        </div>
    </div>
</template>