<script setup>
import { RouterLink } from 'vue-router';
import { useAdminOrderStore } from '@/stores/admin/order';
import AdminLayout from '@/layouts/AdminLayout.vue';
import Table from '@/components/Table.vue';
import { onRenderTracked } from 'vue';


const adminOrderStore = useAdminOrderStore()
</script>
<template>
    <AdminLayout>
        <div class="max-w-screen-xl mx-auto">
            <div class="h-fit flex justify-between items-center">
                <div class="font-bold text-3xl">Order List</div>
            </div>
            <Table :headers="['Custumer Name', 'Total Price', 'Status', 'Updated At', '']">
                <tr v-for="(order, index) in adminOrderStore.list">
                    <td class="w-44">{{ order.customerName }}</td>
                    <td class="w-28">{{ order.totalPrice }}</td>
                    <td class="w-44">{{ order.status }}</td>
                    <td>{{ order.updatedAt }}</td>
                    <td>
                        <RouterLink :to="{ name: 'admin-orders-detail', params: { id: index } }" class="btn w-28">
                            See Details
                        </RouterLink>
                    </td>

                </tr>
            </Table>
        </div>
    </AdminLayout>

</template>