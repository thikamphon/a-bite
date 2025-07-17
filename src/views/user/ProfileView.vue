<script setup>
import UserLayout from '@/layouts/UserLayout.vue';
import { onMounted, ref, reactive } from 'vue';
const profileImageUrl = ref('https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp')
const userData = reactive({
    imageUrl: profileImageUrl,
    name: 'Emily Leslie',
    email: 'test@mail.com'
})
onMounted(() => {

    let profileData = localStorage.getItem('profile-data')
    if (profileData) {
        profileData = JSON.parse(profileData)
        profileImageUrl.value = profileData.imageUrl
        userData.name = profileData.name
        userData.email = profileData.email
    }

})

const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            profileImageUrl.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const updateProfile = () => {
    let profileData = {
        imageUrl: userData.imageUrl,
        name: userData.name,
        email: userData.email
    }
    localStorage.setItem('profile-data', JSON.stringify(profileData))
    window.location.replace('/')
}
</script>
<template>
    <UserLayout>
        <div class="grid indicator w-full min-h-2/3">
            <div class="relative w-11/12 md:w-[500px] mx-auto">
                <span class="indicator-item indicator-bottom indicator-start translate-x-1/2">
                    <button class="avatar relative inline-flex">
                        <div
                            class="bg-black w-16 h-auto rounded-full ring ring-white ring-offset-base-100 ring-offset-2 md:w-24">
                            <img :src="userData.imageUrl" alt="Avatar" />
                        </div>
                        <label
                            class="rounded-full overlay absolute w-full h-full bg-black opacity-0 hover:opacity-50 text-white text-xs transition duration-300 cursor-pointer">
                            <div class="grid place-items-center w-full h-full">Change<br>profile</div>
                            <input type="file" @change="handleFileUpload" ref="fileInput" class="hidden" />
                        </label>
                    </button>
                </span>
                <div style="background-image: url(https://images.unsplash.com/photo-1536664607464-9a9419341c4d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);"
                    class="hero relative grid w-full mx-auto mt-10 h-44 lg:h-48 bg-base-300 rounded-t-lg place-items-center">
                </div>
            </div>
            <div class="w-full h-full">
                <div class="relative w-11/12 md:w-[500px] mx-auto border border-solid shadow-lg mb-10 rounded-b-lg">
                    <div class="py-8 md:py-10 px-4 md:p-10 w-full rounded-b-lg">
                        <div class="text-right -mt-10 pt-4">
                            <div>{{ userData.name }}</div>
                            <div>{{ userData.email }}</div>
                        </div>
                        <div class="divider p-0 m-0"></div>
                        <h1 class="font-bold mt-4 mb-2 underline">Edit info</h1>
                        <div class="grid gap-2">
                            <label class="w-full input input-bordered flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                    class="w-4 h-4 opacity-70">
                                    <path
                                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                    <path
                                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                </svg>
                                <input v-model="userData.email" disabled="text" class="grow" placeholder="Email" />
                            </label>
                            <label class="w-full input input-bordered flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                    class="w-4 h-4 opacity-70">
                                    <path
                                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                </svg>
                                <input v-model="userData.name" type="text" class="grow" placeholder="Username" />
                            </label>
                            <button @click="updateProfile" class="btn btn-info font-bold">EDIT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </UserLayout>

</template>
