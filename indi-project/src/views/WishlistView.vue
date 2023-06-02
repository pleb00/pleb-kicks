<script>
import Card from "../components/Card.vue"
import { RouterLink } from 'vue-router'
import { useWishlistStore } from '../stores/wishlistStore';
import { mapState, mapActions } from 'pinia';
export default {
    name: "HomeView",
    components: {
        Card
    },
    computed: {
        ...mapState(useWishlistStore, ['wishlists'])
    },
    methods: {
        ...mapActions(useWishlistStore, ['fetchWishlist'])
    },
    async created() {
        this.fetchWishlist()
    }
}
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-6">
        <div v-for="item in wishlists" :key="item.id">
            <RouterLink :to="/details/ + item.id">
                <Card :item="item" />
            </RouterLink>
        </div>
    </div>
</template>
