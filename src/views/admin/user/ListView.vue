<script setup>
import { onMounted } from 'vue'

import { RouterLink, useRouter } from 'vue-router'
import { useAdminUserStore } from '@/stores/admin/user';
import AdminLayout from '@/layouts/AdminLayout.vue';
import iconNote from '@/components/icons/iconNote.vue';
import Table from '@/components/Table.vue';

const adminUserStore = useAdminUserStore()

onMounted(() => {
    adminUserStore.loadUser()
})

const changeStatus = (index) => {
    let selectedUser = adminUserStore.list[index]
    selectedUser.status = selectedUser.status === 'active' ? 'inactive' : 'active'
    // selectedUser.status = 'inactive'
    adminUserStore.updateUser(selectedUser)

}
</script>
<template>
    <AdminLayout>
        <div class="max-w-screen-xl mx-auto">
            <div class="flex justify-between items-center">
                <div class="font-bold text-3xl">User List</div>
            </div>
            <div class="divider"></div>
            <Table :headers="['Name', 'Role', 'Status', 'Updated At', '']">
                <tr v-for="(user, index) in adminUserStore.list">
                    <td class="w-44">{{ user.fullname }}</td>
                    <td class="w-36">{{ user.role }}</td>
                    <td class="w-36">
                        <div class="font-medium badge"
                            :class="user.status === 'active' ? 'badge-success' : 'badge-soft'">
                            {{ user.status }}
                        </div>
                    </td>
                    <td>{{ user.updatedAt }}</td>
                    <div class="flex justify-end gap-2 my-2">
                        <RouterLink :to="{ name: 'admin-users-update', params: { id: index } }" class="btn">
                            <iconNote />
                        </RouterLink>
                        <button class="btn" @click="changeStatus(index)">
                            {{ user.status === 'active' ? 'Disable' : 'Enable' }}
                        </button>
                    </div>
                </tr>
            </Table>
        </div>
    </AdminLayout>

</template>
<style scoped></style>