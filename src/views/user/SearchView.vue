<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

import UserLayout from '@/layouts/UserLayout.vue';
import Product from '@/components/product.vue';

import { useProductStore } from '@/stores/user/product';
import { useCartStore } from '@/stores/user/cart';

const route = useRoute()

const searchText = ref('')
const cartStore = useCartStore()
const productStore = useProductStore()

const addItemToCart = (product) => {
    cartStore.addToCart(product)
}


watch(() => route.query.q, (newSearchText) => {
    searchText.value = newSearchText
},
    // ให้แสดงผลที่เป็นสิ่งที่รันล่าสุดเสมอ
    { immediate: true })

const filterItem = computed(() => {
    return productStore.filterProduct(searchText.value)
})

</script>
<template>
    <UserLayout>
        <div class="m-8 text-3xl">
            <b>Search: {{ searchText }}</b>
        </div>
        <Product :products="filterItem" :addToCart="addItemToCart">
        </Product>
    </UserLayout>

</template>