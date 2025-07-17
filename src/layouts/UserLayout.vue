// header and footer
<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

import { useCartStore } from '@/stores/user/cart';

const cartStore = useCartStore()

const isLogged = ref(false)
const searchText = ref('')
const router = useRouter()

onMounted(() => {
    if (localStorage.getItem('isLoggedIn')) {
        isLogged.value = true

    }
})

const login = () => {
    isLogged.value = true
    localStorage.setItem('isLoggedIn', true)
}

const logout = () => {
    isLogged.value = false

    localStorage.clear()
    location.href = location.pathname 
}

const handleSearch = (event) => {
    if (event.key === 'Enter') {
        router.push({
            name: 'search',
            query: {
                q: searchText.value
            }
        })
    }
}
</script>
<template>
    <div class="navbar bg-base-100 shadow-sm w-full mx-auto lg:w-4/5 ">
        <div class="flex-1">
            <RouterLink :to="{ name: 'home' }">
                <button class="flex gap-4 items-center btn btn-outline btn-warning text-3xl">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 448 512">
                        <path
                            d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z" />
                    </svg>
                    <div class="font-title inline-flex text-lg md:text-2xl">Bites</div>
                </button>
            </RouterLink>
        </div>
        <div class="flex gap-2">
            <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" @keyup="handleSearch"
                v-model="searchText" />
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                    <div class="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span class="badge badge-sm indicator-item">{{ cartStore.summaryQuatity }}</span>
                    </div>
                </div>
                <div tabindex="0" class="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                    <div class="card-body">
                        <span class="text-lg font-bold">{{ cartStore.summaryQuatity }} Items</span>
                        <span class="text-info">Subtotal: {{ cartStore.summaryPrice }}฿</span>
                        <div class="card-actions">
                            <RouterLink :to="{ name: 'cart' }" class="btn btn-success btn-block">
                                View cart
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
            <button @click="login()" v-if="!isLogged" class=" btn btn-ghost">
                LOGIN
            </button>
            <div v-if="isLogged" class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                        <RouterLink :to="{ name: 'profile' }" class="justify-between">
                            Profile
                        </RouterLink>
                    </li>
                    <li><a @click="logout">Logout</a></li>
                </ul>
            </div>

        </div>
    </div>
    <!-- main content -->
    <slot></slot>

    <footer class="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <div class="w-full gap-y-8 lg:w-4/5 lg:mx-auto">
            <aside class="col-span-3">
                <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd"
                    clip-rule="evenodd" class="fill-current">
                    <path
                        d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z">
                    </path>
                </svg>
                <p>
                    ACME Industries Ltd.
                    <br />
                    Providing reliable tech since 1992
                </p>
            </aside>
            <nav class="flex flex-col">
                <h6 class="footer-title">Services</h6>
                <a class="link link-hover">Branding</a>
                <a class="link link-hover">Design</a>
                <a class="link link-hover">Marketing</a>
                <a class="link link-hover">Advertisement</a>
            </nav>
            <nav class="flex flex-col">
                <h6 class="footer-title">Company</h6>
                <a class="link link-hover">About us</a>
                <a class="link link-hover">Contact</a>
                <a class="link link-hover">Jobs</a>
                <a class="link link-hover">Press kit</a>
            </nav>
            <nav class="flex flex-col">
                <h6 class="footer-title">Legal</h6>
                <a class="link link-hover">Terms of use</a>
                <a class="link link-hover">Privacy policy</a>
                <a class="link link-hover">Cookie policy</a>
            </nav>
        </div>
    </footer>
</template>