import { defineStore } from 'pinia'
import { useAdminProductStore } from '../admin/product'
export const useProductStore = defineStore('product', {
    state: () => ({
        list: [],
        loaded: false,
    }),
    actions: {
        loadProduct() {
            const product = localStorage.getItem('admin-product')
            if (product) {
                this.list = JSON.parse(product)
                this.loaded = true
            } else {
                const adminProductStore = useAdminProductStore()
                this.list = adminProductStore.list
            }
        },
        filterProduct(searchText) {
            // filter in list that have aphabet in product name
            return this.list.filter(product => product.name.includes(searchText))
        }
    }
})
