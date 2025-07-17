<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const activeMenu = ref('')
const isOpen = ref(false)

const menu = [
    {
        name: 'Dashboard',
        routerName: 'admin-dashboard',
        roles: ['admin', 'moderator']
    },
    {
        name: 'User',
        routerName: 'admin-users-list',
        roles: ['admin', 'moderator']
    },
    {
        name: 'Product',
        routerName: 'admin-products-list',
        roles: ['admin', 'moderator']
    },
    {
        name: 'Order',
        routerName: 'admin-orders-list',
        roles: ['admin']
    },
]

onMounted(() => {
    activeMenu.value = route.name
})

const logout = () => {
    router.push({ name: 'admin-login' })
}

</script>
<template>
    <div class="">
        <div class="lg:hidden bg-[--color-base-200] w-full flex items-center h-16">
            <label class="btn bg-transparent outline-none shadow-none border-none justify-start swap swap-rotate">
                <!-- this hidden checkbox controls the state -->
                <input type="checkbox" v-model="isOpen" />
                <svg v-if="!isOpen" class="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32"
                    height="32" viewBox="0 0 512 512">
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>
                <!-- close icon -->
                <svg v-if="isOpen" class="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32"
                    height="32" viewBox="0 0 512 512">
                    <polygon
                        points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
            </label>
        </div>


        <div class="drawer h-svh flex-col-reverse lg:drawer-open"
            :class="isOpen === false ? 'drawer-off' : 'drawer-open'">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content m-4 md:m-10 xl:m-16">

                <slot></slot>

            </div>
            <!-- drawer -->
            <div class="drawer-side h-full">
                <ul class="menu p-4 w-64 h-full bg-base-200 text-base-content">
                    <!-- Sidebar content here -->
                    <div>
                        <li><a class="text-3xl font-bold">Back Office</a></li>
                        <li v-for="(menu, index) in menu" :key="index">
                            <RouterLink class="mt-2" :class="menu.routerName === activeMenu ? 'menu-active' : ''"
                                :to="{ name: menu.routerName }">{{ menu.name }}</RouterLink>
                        </li>
                    </div>

                    <li class="my-4" @click="logout">
                        <a>Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style scoped>
/* .btn {
    border-radius: unset;
} */
</style>