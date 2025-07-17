<script setup>
import UserLayout from '@/layouts/UserLayout.vue';
import iconDelete from '@/components/icons/iconDelete.vue';
import { useCartStore } from '@/stores/user/cart';

const cartStore = useCartStore()

const changeQuantity = (e, index) => {
    const newQuantity = parseInt(e.target.value)
    cartStore.updateQuantity(index, newQuantity)
}

const getRemainQuantity = (stock) => Array.from({ length: stock }, (_, i) => i + 1)

</script>
<template>
    <UserLayout>
        <div class="m-4 sm:my-10 md:px-10 lg:w-4/5 lg:mx-auto">
            <h1 class="items-center mb-4 flex gap-4 text-xl font-bold sm:text-3xl">
                Your Order
            </h1>
            <div class="grid grid-rows-auto">
                <div v-if="cartStore.items.length === 0" class="flex w-full min-h-96 justify-center items-center">
                    Cart is empty.
                </div>
                <div v-else class="min-w-80 min-h-96 text-sm">
                    <div
                        class="grid grid-flow-col items-center justify-between h-fit border-x-0 border-y border-gray-400 p-4 mb-4">
                        <div class="grow pl-0 sm:pl-4 w-30 md:w-72">Product Ordered</div>
                        <div class="flex items-center font-normal text-sm">
                            <div class="w-16 sm:w-32 sm:mr-4 text-center">Amount</div>
                            <div class="w-14 md:w-20 text-center">Unit Price</div>
                            <div class="px-4 flex justify-center"></div>
                        </div>
                    </div>
                    <div v-for="(item, index) in cartStore.items"
                        class="bg-slate-50 grid grid-flow-col items-center justify-between border border-solid border-gray-400 rounded-md mb-2 md:mb-4 p-2 md:p-4 shadow-lg">
                        <div class="items-center w-fit flex gap-2">
                            <div class="avatar">
                                <div class="w-12 md:w-16 rounded-md">
                                    <img :src="item.imageUrl" />
                                </div>
                            </div>
                            <div class="text-xs md:text-sm">
                                <h1 class="underline underline-offset-2">{{ item.name }}</h1>
                                <span class="line-clamp-1 w-30 md:max-w-56"> {{ item.about }} </span>
                            </div>
                        </div>
                        <div class="grid grid-flow-col items-center">
                            <select @change="changeQuantity($event, index)" v-model="item.quantity"
                                class="select select-bordered min-w-10 min-h-8 h-8 sm:w-32 sm:mr-4">
                                <option selected v-for="(quantity, index) in getRemainQuantity(item.remainQuantity)"
                                    :key="index" :value="quantity">
                                    {{ quantity }}
                                </option>
                            </select>
                            <div class="w-14 text-center font-medium">{{ item.price }}฿</div>
                            <button @click="cartStore.removeItemInCart(index)" class="px-4 flex justify-center">
                                <iconDelete />
                            </button>
                        </div>
                    </div>
                </div>
                <div class="bottom-0 w-full py-6 grid">
                    <div>
                        <div class="flex text-right w-80 ml-auto">
                            <div class="flex-auto w-64">
                                <div>Merchandise Subtotal:</div>
                                <div>Shipping Total:</div>
                                <div>Total Payment:</div>
                            </div>
                            <div class="flex-auto w-32 font-semibold">
                                <div>{{ cartStore.summaryPrice }}฿</div>
                                <div>0฿</div>
                                <div>{{ cartStore.summaryPrice }}฿</div>
                            </div>
                        </div>
                        <div class="divider"></div>
                        <div class="grid justify-end">
                            <RouterLink :to="{ name: 'checkout' }" class="btn btn-primary">
                                Check Out
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </UserLayout>

</template>