<script setup>
import { defineProps } from 'vue'

defineProps({
    currentPage: Number,
    maxPage: Number,
    changePage: Function
})
</script>
<template>
    <div class="join my-4 flex w-full justify-center">
        <button v-if="currentPage - 1 > 0" @click="changePage(currentPage - 1)" class="join-item btn">«</button>
        <button class="join-item btn">Page {{ currentPage }} / {{ maxPage }}</button>
        <button v-if="currentPage + 1 <= maxPage" @click="changePage(currentPage + 1)" class="join-item btn">»</button>
    </div>
</template>