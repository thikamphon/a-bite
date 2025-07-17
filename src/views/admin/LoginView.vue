<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

const login = () => {
    router.push({ name: 'admin-dashboard' })
}
</script>
<template>
    <div class="min-w-[350px] max-w-[500px] 
    absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-3/4 shadow-xl p-8 border
             border-slate-400 border-w-2 rounded-xl bg-gray-100">
        <!-- <div class="absolute top-1/2 -translate-y-1/2 w-96 shadow-xl p-8 border
             border-slate-400 border-w-2 rounded-xl bg-gray-100"> -->
        <h1 class="text-3xl font-bold text-center pb-8">Admin</h1>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text font-semibold">Email</span>
            </div>
            <input v-model="email" type="email" placeholder="username@mail.com" class="input input-bordered w-full" />
        </label>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text font-semibold">Password</span>
            </div>
            <input v-model="password" type="password" placeholder="xxxxxxxx" class="input input-bordered w-full" />
        </label>
        <button @click="login" class="btn btn-neutral my-4 w-full">
            LOGIN →
        </button>
    </div>
</template>
<style>
.height {
    height: -webkit-fill-available;
}
</style>