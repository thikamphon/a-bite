<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAdminOrderStore } from '@/stores/admin/order';
import AdminLayout from '@/layouts/AdminLayout.vue';
import Product from '@/components/product.vue';
const route = useRoute()
const router = useRouter()
const adminOrderStore = useAdminOrderStore()
const orderIndex = ref(-1)
const orderData = ref({
    products: []
})
onMounted(() => {
    if (route.params.id) {
        orderIndex.value = parseInt(route.params.id)
        const selectedOrder = adminOrderStore.getOrder(orderIndex.value)
        orderData.value = selectedOrder
        console.log(orderData.value);
    }
})
</script>
<template>
    <AdminLayout>
        <div class="max-w-screen-xl mx-auto">
            <div class="h-fit flex justify-between items-center">
                <div class="font-bold text-3xl">Order Detail ID: {{ orderData.no }}</div>
            </div>
            <div class="divider"></div>
            <div class="grid grid-cols-2 gap-2">
                <div>
                    <div class="font-bold">Order date</div>
                    <div>{{ orderData.updatedAt }}</div>
                </div>
                <div>
                    <div class="font-bold">Order number</div>
                    <div>{{ orderData.no }}</div>
                </div>
                <div>
                    <div class="font-bold">Payment method</div>
                    <div>{{ orderData.paymentMethod }}</div>
                </div>
                <div>
                    <div class="font-bold">Address</div>
                    <div>{{ orderData.address }}</div>
                </div>
            </div>
            <div class="divider"></div>
            <div v-for="product in orderData.products" class="flex gap-2 items-center">
                <div cle><img class="p-2 rounded-xl w-20" :src="product.imageUrl" alt=""></div>
                <div class="flex-auto">
                    <div class="font-semibold">{{ product.name }}</div>
                    <div>{{ product.description }}</div>
                </div>
                <div class="flex-1">จำนวน {{ product.quantity }} ชิ้น</div>
                <div class="flex-1">{{ product.price }} Bath</div>
            </div>
            <div class="divider"></div>
            <div class="flex justify-between">
                <div class="font-bold">ราคาสินค้าทั้งหมด</div>
                <div>{{ orderData.totalPrice }} Bath</div>
            </div>
            <div class="flex justify-end">
                <RouterLink :to="{ name: 'admin-orders-list' }" class="btn my-4">Back</RouterLink>
            </div>

        </div>
    </AdminLayout>

</template>