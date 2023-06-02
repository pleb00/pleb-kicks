<script>
import Card from "../components/Card.vue"
import { RouterLink } from 'vue-router'
import { useItemStore } from '../stores/itemStore';
import { mapState, mapActions } from 'pinia';
export default {
  name: "HomeView",
  components: {
    Card
  },
  computed: {
    ...mapState(useItemStore, ['items'])
  },
  methods: {
    ...mapActions(useItemStore, ['fetchItems'])
  },
  async created() {
    this.fetchItems(1)
  }
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-6">
    <div v-for="item in items" :key="item.id">
      <RouterLink :to="/details/ + item.id">
        <Card :item="item" />
      </RouterLink>
    </div>
  </div>
</template>
