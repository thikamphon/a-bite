<script setup>
import { defineProps, onMounted } from "vue";
import { useProductStore } from '@/stores/user/product';
import { useCartStore } from '@/stores/user/cart';

const productStore = useProductStore()

onMounted(()=>{
    productStore.loadProduct()
})

defineProps({
    products: Array,
    addToCart: Function
})

</script>
<template>
    <section
        class="grid min-h-fit my-8 mx-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:mx-26 2xl:grid-cols-5 2xl:mx-32">
        <div v-for="(product, index) in products" :key="index" class="card bg-base-100 shadow-xl my-2 mx-2 md:mx-2">
            <figure class="h-40 sm:h-80 xl:h-96"><img class="object-cover w-full h-full" :src="product.imageUrl" />
            </figure>
            <div class="card-body flex p-2 sm:p-4">
                <h2 class="card-title font-bold">{{ product.name }}</h2>
                <p class="inline">{{ product.about }}</p>
                <div class="card-actions justify-between items-center">
                    <span class="text-lg font-bold">{{ product.price }}฿</span>
                    <button class="btn btn-warning" @click="addToCart(product)">Add to
                        Cart</button>
                </div>
            </div>
        </div>
    </section>
</template>
