<script setup>
import UserLayout from '@/layouts/UserLayout.vue';
import { useProductStore } from '@/stores/user/product';
import { useCartStore } from '@/stores/user/cart';
import Product from '@/components/product.vue';

const productStore = useProductStore()
const cartStore = useCartStore()

const addItemToCart = (product) => {
    cartStore.addToCart(product)
}


</script>
<template>
    <UserLayout>
        <div class="hero h-96"
            :style="`background-image: url(https://images.unsplash.com/photo-1545216560-68430ad77342?q=80&w=2130&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);`">
            <div class="hero-overlay bg-neutral-600 bg-opacity-60"></div>
            <div class="hero-content text-center text-neutral-content">
                <div class="max-w-xl">
                    <h1 class="mb-5 text-3xl font-bold italic lg:text-4xl">A taste that lingers <br /> in every
                        bite. </h1>
                    <p class="mb-5 text-sm lg:text-lg">Every dish we offer is crafted with high-quality ingredients
                        and meticulous
                        attention to
                        detail,
                        ensuring you experience a perfect and unique taste in every bite.</p>
                </div>
            </div>
        </div>
        <Product :products="productStore.list" :addToCart="addItemToCart">

        </Product>
    </UserLayout>

</template>
