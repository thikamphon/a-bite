<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router';
import AdminLayout from '@/layouts/AdminLayout.vue';
import iconNote from '@/components/icons/iconNote.vue';
import iconDelete from '@/components/icons/iconDelete.vue';
import Table from '@/components/Table.vue';
import Pagination from '@/components/Pagination.vue';
import { storeToRefs } from 'pinia'
import { useAdminProductStore } from '@/stores/admin/product';

const adminProductStore = useAdminProductStore()

const route = useRoute()
const router = useRouter()

const searchText = ref('')

const status = ref('')
const update = ref('')
const currentPage = ref(1)

onMounted(() => {
    adminProductStore.loadProduct()
})
const searchProduct = () => {
    adminProductStore.loadProduct();
    console.log('search');
}
const updateType = [
    { name: 'Descending order', value: 'desc' },
    { name: 'Ascending order', value: 'asc' },
]
const updateFilter = () => {
    adminProductStore.filter.sort.updatedAt = update.value
    adminProductStore.loadProduct()
}

const statusFilter = () => {
    adminProductStore.filter.status = status.value
    adminProductStore.loadProduct()
}
const removeProduct = (index) => {
    adminProductStore.removeProduct(index)
}

</script>
<template>
    <AdminLayout>

        <!-- Product List View -->
        <div class="max-w-screen-xl mx-auto">
            <!-- Header -->
            <div class="h-fit flex justify-between items-center">
                <div class="font-bold text-3xl">Product</div>
                <RouterLink :to="{ name: 'admin-products-create' }" class="btn btn-neutral">Add New</RouterLink>
            </div><!-- Table header -->
            <div class="flex items-end gap-2">
                <div class="form-control flex-1 max-w-72">
                    <span class="label label-text font-semibold">search</span>
                    <input v-model="adminProductStore.filter.search" type="text" placeholder="Search"
                        class="input input-bordered min-h-8 h-8 min-w-24" />
                </div>

                <div class="flex flex-col min-w-20 max-w-44 ">
                    <span class="label label-text font-semibold">updatedAt</span>
                    <select v-model="update" @change="updateFilter()"
                        class="flex max-w-44 min-w-20 select select-bordered min-h-8 h-8">
                        <option v-for="item in updateType" :value="item.value">{{ item.name }}
                        </option>
                    </select>
                </div>

                <div class="flex flex-col min-w-20 max-w-44 ">
                    <span class="label label-text font-semibold">status</span>
                    <select v-model="status" @change="statusFilter()"
                        class="flex max-w-44 min-w-14 select select-bordered min-h-8 h-8">
                        <option value="" selected>select</option>
                        <option v-for="item in ['open', 'close']" :value="item">{{ item }}
                        </option>
                    </select>
                </div>
                <div class="flex">
                    <button @click="searchProduct()" class="btn btn-outline min-h-8 h-8">search</button>
                </div>
            </div>
            <!-- table -->
            <Table :headers="['Name', 'Image', 'Price', 'Quantity', 'Status', 'Updated At', '']">
                <tr v-for="(product, index) in adminProductStore.list">
                    <td>{{ product.name }}</td>
                    <td>
                        <div class="w-12 h-12">
                            <img :src="product.imageUrl" class="rounded-md object-cover w-full h-full">
                        </div>
                    </td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.remainQuantity }}/{{ product.quantity }}</td>
                    <td>
                        <div class="badge" :class="product.status === 'open' ? 'badge-success' : 'badge-error'">
                            {{ product.status }}
                        </div>
                    </td>
                    <td>{{ product.updatedAt }}</td>
                    <td class="flex gap-2 md:gap-4">
                        <RouterLink :to="{ name: 'admin-products-update', params: { id: index } }"
                            class="btn btn-ghost">
                            <iconNote class="opacity-80 fill-gray-950" />
                        </RouterLink>
                        <button @click="removeProduct(index)" class="btn btn-ghost">
                            <iconDelete class="opacity-80 fill-gray-950" />
                        </button>
                    </td>
                </tr>
            </Table>
        </div>
    </AdminLayout>

</template>