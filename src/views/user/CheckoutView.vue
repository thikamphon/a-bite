<script setup>
import { reactive } from 'vue';
import { useCartStore } from '@/stores/user/cart';
import { useRouter } from 'vue-router';

import UserLayout from '@/layouts/UserLayout.vue';
import iconMail from '@/components/icons/iconMail.vue';
import iconPerson from '@/components/icons/iconPerson.vue';
import iconAddress from '@/components/icons/iconAddress.vue';
import iconNote from '@/components/icons/iconNote.vue';

const router = useRouter()
const cartStore = useCartStore()
const FormData = [
    { name: "Email address", field: "email", icon: iconMail },
    { name: "Name", field: "name", icon: iconPerson },
    { name: "Address", field: "address", icon: iconAddress },
    { name: "Note", field: "note", icon: iconNote },
];
const userFormData = reactive({
    email: "",
    name: "",
    address: "",
    note: "",
});

const payment = (userFormData) => {
    // console.log(userFormData);
    cartStore.checkOut(userFormData)
    router.push('/success')
}
</script>
<template>
    <UserLayout>
        <div class="grid grid-cols-1 gap-14 m-4 mb-20 sm:my-10 lg:grid-cols-2 lg:w-4/5 lg:mx-auto md:px-10 ">
            <div>
                <h1 class="items-center mb-4 flex gap-4 text-xl font-bold sm:text-3xl">
                    Check out your order
                </h1>
                <div class="max-h-fit w-full border-x-0 border-y border-gray-400">
                    <table class="table p-0 sm:p-10">
                        <thead>
                            <tr class="text-xs text-center">
                                <th class="grow px-0 sm:pl-4 text-left">Product Ordered</th>
                                <th class="w-20 px-0 text-center">Unit Price</th>
                                <th class="w-20 px-0 text-center">Amount</th>
                                <th class="w-20 px-0 text-center pr-0 sm:pr-4">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in cartStore.items">
                                <td class="grid grid-flow-col auto-cols-max gap-0 sm:gap-4 pl-0 md:pl-4">
                                    <div class="avatar">
                                        <div class="rounded-md sr-only sm:not-sr-only sm:w-16">
                                            <img :src="item.imageUrl" :alt="item.imageUrl" />
                                        </div>
                                    </div>
                                    <div class="text-sm">
                                        <h1 class="underline underline-offset-2">{{ item.name }}</h1>
                                        <span class="line-clamp-2 w-28 md:max-w-56"> {{ item.about }} </span>
                                    </div>
                                </td>
                                <td class="text-center">{{ item.price }}</td>
                                <td class="text-center">{{ item.quantity }}</td>
                                <td class="text-center pr-0 sm:pr-4">
                                    {{ item.price * item.quantity }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex my-6 pr-4 text-xs text-right w-80 ml-auto">
                        <div class="flex-auto w-64">
                            <div>Merchandise Subtotal:</div>
                            <div>Shipping Total:</div>
                            <div>Total Payment:</div>
                        </div>
                        <div class="flex-auto w-32 font-semibold">
                            <div>{{ cartStore.summaryPrice }}฿</div>
                            <div>{{ 0 }}฿</div>
                            <div>{{ cartStore.summaryPrice }}฿</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid h-fit gap-4">
                <h1 class="text-xl font-bold mx-4 sm:text-3xl">Shipping address</h1>
                <div v-for="form in FormData">
                    <label v-if="form.field !== 'address'" class="input input-bordered flex w-full items-center gap-2">
                        <component :is="form.icon"></component>
                        <input v-model="userFormData[form.field]" type="text" :placeholder="form.field" />
                    </label>
                    <label v-else class="textarea textarea-bordered flex w-full items-center gap-2 pr-0 py-0">
                        <div class="flex gap-2 align-text-top">
                            <component class="h-[17px] w-auto" :is="form.icon"></component>
                            <textarea class="w-full -pt-2 h-10 outline-0 border-0" v-model="userFormData[form.field]"
                                :placeholder="form.field">
                            </textarea>
                        </div>

                    </label>
                </div>
                <div class="flex justify-between w-full">
                    <RouterLink :to="{ name: 'cart' }" class="btn">Back</RouterLink>
                    <button class="btn btn-outline btn-success" @click="payment(userFormData)">payment</button>
                    <!-- <RouterLink :to="{ name: 'success' }" class="btn btn-primary">
                        Next
                    </RouterLink> -->
                </div>
            </div>
        </div>
    </UserLayout>

</template>