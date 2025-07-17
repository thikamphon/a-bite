<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue';
import { useAdminOrderStore } from '@/stores/admin/order';
import { useAdminProductStore } from '@/stores/admin/product';
import { useAdminUserStore } from '@/stores/admin/user';
import { onMounted } from 'vue';
const adminOrderStore = useAdminOrderStore()
const adminProductStore = useAdminProductStore()
const adminUserStore = useAdminUserStore()
const priceChart = {
    options: {
        chart: {
            id: 'vuechart-example'
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
    },
    series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
    }]
}

const catagoryChart = {
    options: {},
    series: [44, 55, 41, 17, 15]
}
</script>
<template>
    <AdminLayout>
        <div class="max-w-screen-xl mx-auto">
            <div class="flex justify-between items-center">
                <div class="text-3xl font-bold mb-4">Dashboard View</div>
            </div>
            <div class="stats stats-vertical w-[100%] md:stats-horizontal shadow-md mx-auto min-w-[300px] mb-4">
                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block h-8 w-8 stroke-pink-300">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                            </path>
                        </svg>
                    </div>
                    <div class="stat-title">Orders</div>
                    <div class="stat-value">{{ adminOrderStore.list.length }}</div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block h-8 w-8 stroke-pink-300">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <div class="stat-title">Product</div>
                    <div class="stat-value">{{ adminProductStore.list.length }}</div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block h-8 w-8 stroke-pink-300">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <div class="stat-title">New Registers</div>
                    <div class="stat-value">{{ adminUserStore.list.length }}</div>
                    <!-- <div class="stat-desc">↘︎ 90 (14%)</div> -->
                </div>
            </div>

            <div class="flex gap-4 flex-wrap md:flex-nowrap">
                <div
                    class="w-full border min-w-[300px] border-gray-200 rounded-xl sm:p-0 md:p-4 flex items-left flex-col gap-4 shadow-md">
                    <b class="mt-4 ml-4">Sales</b>
                    <apexchart type="bar" :options="priceChart.options" :series="priceChart.series">
                    </apexchart>
                </div>
                <div
                    class="w-full border min-w-[300px] border-gray-200 rounded-xl sm:p-0 md:p-4 flex items-left flex-col gap-4 shadow-md">
                    <b class="mt-4 ml-4">Circulation</b>
                    <apexchart type="donut" :options="catagoryChart.options" :series="catagoryChart.series"></apexchart>
                </div>


            </div>
        </div>

    </AdminLayout>

</template>