<script setup>
import { onMounted, ref } from 'vue';
import UserLayout from '@/layouts/UserLayout.vue';
import { useCartStore } from '@/stores/user/cart';
import { useRoute } from 'vue-router';

const route = useRoute()

const cartStore = useCartStore()
const orderData = ref({});

onMounted(() => {
    cartStore.loadCheckOut()
    if (cartStore.checkOut.orderNumber) {
        orderData.value = cartStore.checkOut
    }
})
</script>
<template>
    <UserLayout>
        <div
            class="max-h-fit m-4 bg-gray-100 p-4 my-10 border border-solid border-gray-400 rounded-xl shadow-xl sm:m-4 md:p-8 lg:m-10">
            <div class="text-sm mx-auto sm:mx-4 flex justify-between">
                <div>
                    <h1 class="text-md md:text-2xl font-bold">Your order is Successful !</h1>
                    <h1 class="text-sm font-semibold">Hi, {{ orderData.name }}</h1>
                    <h1 class="text-sm mb-4 text-primary italic font-semibold">
                        Your order is being prepared for shipment.
                    </h1>
                </div>
                <div class="text-right text-xs font-normal">
                    <h1>{{ orderData.createdDate }}</h1>
                    <h1 class="mt-2">{{ orderData.orderNumber }}</h1>
                </div>
            </div>

            <table class="table mt-8 p-0 sm:p-10">
                <div></div>
                <thead>
                    <tr class="whitespace-normal text-xs md:text-sm md:whitespace-nowrap">
                        <th class="pl-0 sm:pl-4">Product Ordered</th>
                        <th class="w-20 text-center">Unit Price</th>
                        <th class="w-20 text-center">Amount</th>
                        <th class="w-20 text-center pr-0 sm:pr-4">Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in orderData.products">
                        <td class="grid grid-flow-col auto-cols-max gap-0 sm:gap-4 pl-0 md:pl-4">
                            <div class="avatar">
                                <div class="rounded-md sr-only sm:not-sr-only sm:w-16">
                                    <img :src="item.imageUrl" :alt="item.name" />
                                </div>
                            </div>
                            <div class="text-sm">
                                <h1 class="font-semibold">{{ item.name }}</h1>
                                <span class="line-clamp-1 w-28 md:max-w-56"> {{ item.about }} </span>
                            </div>
                        </td>
                        <td class="text-center">{{ item.price }}</td>
                        <td class="text-center">{{ item.quantity }}</td>
                        <td class="text-center pr-0 sm:pr-4">{{ item.price * item.quantity }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="min-h-36 sm:min-h-28"></div>
            <div class="divider m-0 h-fit my-6"></div>
            <div class="flex w-fit ml-auto text-sm m-0 sm:mr-10">
                <div class="flex-auto min-w-max px-10">
                    <div>Merchandise Subtotal:</div>
                    <div>Shipping Total:</div>
                    <div>Total Payment:</div>
                </div>
                <div class="flex-auto w-18 text-right font-semibold">
                    <div>฿{{ orderData.totalPrice }}</div>
                    <div>฿{{ 0 }}</div>
                    <div>฿{{ orderData.totalPrice }}</div>
                </div>
            </div>
            <div class="divider m-0 h-fit my-6"></div>
            <h1 class="text-sm font-semibold">
                Payment Method : <span class="font-normal">{{ orderData.paymentMethod }}</span>
            </h1>
            <h1 class="text-sm font-semibold">
                Address : <span class="font-normal">{{ orderData.address }}</span>
            </h1>
            <div class="grid gap-4 text-xs mt-10 md:mt-24 pb-4 sm:mr-10">
                <h1>Dear {{ orderData.name }}</h1>
                <div>
                    <div>We extend our heartfelt gratitude for choosing to dine with us.</div>
                    <div>
                        Your patronage is truly appreciated,and we hope your experience with us was
                        delightful.
                    </div>
                </div>
                <h1>Warm regards,</h1>
            </div>
        </div>
    </UserLayout>

</template>