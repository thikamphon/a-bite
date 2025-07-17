<script setup>
import { ref, reactive, onMounted } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { useAdminUserStore } from '@/stores/admin/user';
import { useEventStore } from '@/stores/event';
import AdminLayout from '@/layouts/AdminLayout.vue';

const eventStore = useEventStore()
const adminUserStore = useAdminUserStore()
const route = useRoute()
const router = useRouter()

const userIndex = ref(-1)
const userData = reactive({
    fullname: '',
    role: '',
    status: ''
})
const formData = [
    { name: 'Name', field: 'fullname', type: 'text' },
    { name: 'Role', field: 'role', type: 'select', dropdown: ['admin', 'moderator', 'user'] },
    { name: 'Status', field: 'status', type: 'select', dropdown: ['active', 'inactive'] }
]
onMounted(() => {
    if (route.params.id) {
        userIndex.value = parseInt(route.params.id)
        const selectedUser = adminUserStore.getUser(userIndex.value)
        console.log(selectedUser);
        
        // formData.forEach(form => {
        //     userData[form.field] = selectedUser[form.field];
        // });
        for (let form of formData) {
            userData[form.field] = selectedUser[form.field];
        }
        // userData.fullname = selectedUser.fullname
        // userData.role = selectedUser.role
        // userData.status = selectedUser.status
        console.log(userData, selectedUser); // ตรวจสอบว่า undefined หรือไม่

    }
})

const updateUser = () => {
    adminUserStore.updateUser(userIndex.value, userData)
    router.push({ name: 'admin-users-list' })
    eventStore.popupMessage('success', 'Your update is successful!')

}
</script>
<template>
    <AdminLayout>
        <div class="justify-between">
            <div class="h-fit flex justify-between items-center">
                <div class="font-bold text-3xl">Edit User</div>
            </div>
            <div class="divider"></div>
            <div>
                <div class="grid grid-cols-1 gap-2">
                    <div v-for="form in formData" class="form-control w-full">
                        <div class="grid grid-cols-[40px,auto] gap-4" v-if="form.type !== 'select'">
                            <label class="label font-semibold">
                                <span>{{ form.name }}</span>
                            </label>
                            <label class="w-full text-black label input input-bordered">
                                <input v-model="userData[form.field]" type="text" :placeholder="form.name" />
                            </label>
                        </div>
                        <div class="grid grid-cols-[40px,auto] gap-4" v-else>
                            <label class="label font-semibold my-2">
                                <span>{{ form.name }}</span>
                            </label>
                            <select v-model="userData[form.field]" class="select select-bordered w-full">
                                <option v-for="item in form.dropdown" :value="item">
                                    {{ item }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex gap-2 justify-start my-4">
                <RouterLink :to="{ name: 'admin-users-list' }" class="btn">Back </RouterLink>
                <button class="btn btn-neutral" @click="updateUser">Edit</button>
            </div>
        </div>
    </AdminLayout>

</template>