<script>
export default {
    name: "Card",
    props: ['item', 'deleteButton']
}
</script>

<template>
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
            </div>
        </div>
    </div>
</template>