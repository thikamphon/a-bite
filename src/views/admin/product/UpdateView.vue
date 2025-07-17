<script setup>
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { ref, onMounted, reactive } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue';
import { useAdminProductStore } from '@/stores/admin/product';
import { useEventStore } from '@/stores/event';
import image from '@/assets/missing-image.png'
const adminProductStore = useAdminProductStore()
const eventStore = useEventStore()

const route = useRoute()
const router = useRouter()

const productIndex = ref(-1)
const mode = ref('Add')

const img = ref(image)
const productData = reactive({
    name: '',
    imageUrl: img.value,
    price: parseInt(0),
    quantity: parseInt(0),
    about: '',
    status: ''
})

onMounted(() => {

    if (route.params.id) {
        productIndex.value = parseInt(route.params.id)
        mode.value = 'Edit'
        const keys = ['name', 'imageUrl', 'price', 'quantity', 'about', 'status'];
        const selectedProduct = adminProductStore.getProduct(productIndex.value)
        for (const key of keys) {
            productData[key] = selectedProduct[key];
        }
    }
})

const formData = [
    { name: "Name", field: "name", type: 'text' },
    { name: "Price", field: "price", type: 'number' },
    { name: "Quantity", field: 'quantity', type: 'number' },
    { name: "About", field: "about", type: 'text' },
    { name: "Image", field: "imageUrl", type: 'upload-img' },
];

const updateProduct = () => {
    if (mode.value === 'Edit') {
        adminProductStore.updateProduct(productIndex.value, productData)
    } else {
        adminProductStore.addProduct(productData)
        console.log(productData);

    }
    eventStore.popupMessage('success', 'Your update is successful!')
    router.push({ name: 'admin-products-list' })
}

const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            productData.imageUrl = e.target.result
            console.log(productData);
        }
        reader.readAsDataURL(file)
    }
    // const file = event.target.files[0]
    // if (file) {
    //     const uploadRef = storageRef(
    //         storage,
    //         `products/${productIndex.value}/${file.name}`
    //     )

    //     const snapShot = uploadBytes(uploadRef, file)
    //     const dowloadUrl = getDownloadURL(snapShot.ref)
    //     productData.value.imageUrl = dowloadUrl
    // }
}
</script>
<template>
    <AdminLayout>
        <div class="max-w-screen-xl mx-auto">
            <div class="flex justify-between items-center">
                <div class="font-bold text-3xl">{{ mode }} Product</div>
            </div>
            <div class="divider"></div>
            <div class="text-xs md:text-[14px] w-full pb-6 bg-base-100">
                <div class="grid grid-cols-1 gap-2">
                    <div v-for="(form, index) in formData" class="form-control" :key="index">
                        <div class="grid grid-cols-[90px,auto] items-start" v-if="form.field !== 'about'">
                            <label class="whitespace-normal label font-semibold">
                                <div class="text-black w-full pr-2">{{ form.name }} </div>
                            </label>
                            <label v-if="form.type !== 'upload-img'" class="w-full label input input-bordered">
                                <input class="w-full" v-model="productData[form.field]" :type="form.type" pattern="\d+"
                                    :placeholder="form.name" />
                            </label>
                            <div v-else class="flex flex-col gap-2">
                                <div class="avatar">
                                    <div class="max-w-72 w-auto min-w-48 rounded">
                                        <img class="flex" :src="productData[form.field]" />
                                    </div>
                                </div>
                                <input type="file" class="file-input" @change="handleFileUpload" />
                                or
                                <input v-model="productData.imageUrl" type="text" placeholder="imageUrl"
                                    class="input input-bordered">
                            </div>
                        </div>
                        <div v-else class="grid grid-cols-[90px,auto]">
                            <label class="label font-semibold my-2 items-start">
                                <span class="text-black pr-2">{{ form.name }} </span>
                            </label>
                            <label class="label textarea textarea-bordered my-2">
                                <textarea class="w-full min-h-10 flex items-center outline-0 border-0"
                                    v-model="productData.about" :placeholder="form.name"></textarea>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <!-- status -->
            <div class="divider"></div>
            <div class="text-xs md:text-normal form-control w-fit">
                <label class="label">
                    <span class="text-black font-semibold my-2">
                        Status
                    </span>
                </label>
                <select class="min-w-[340px] select select-bordered" v-model="productData.status">
                    <option value="" selected>Choose Status</option>
                    <option value="open">Open</option>
                    <option value="close">Close</option>
                </select>
            </div>
            <div class="flex justify-end my-4 gap-2">
                <RouterLink :to="{ name: 'admin-products-list' }" class="btn btn-ghost">Back</RouterLink>
                <button class="btn btn-neutral" @click="updateProduct()">{{ mode }}</button>
            </div>
        </div>
    </AdminLayout>

</template>

<style scoped>
@media (max-width: 600px) {
    label {
        width: 100%;
    }
}

@media (min-width: 600px) {
    label {
        width: 50%;
    }
}
</style>