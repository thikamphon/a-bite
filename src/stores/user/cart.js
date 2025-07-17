import { defineStore } from "pinia";
// import axios from "axios";


export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        // checkout: {}
    }),
    getters: {
        summaryQuatity(state) {
            // (acc,item)=> ไม่ใส่ปีกาเท่ากับต้องการ return
            return state.items.reduce((acc, item) => acc + item.quantity, 0)
        },
        summaryPrice(state) {
            // หลักการของ reduce
            // acc => คือค่าที่แล้ว
            // item => ค่าที่จะเพิ่ม
            return state.items.reduce((acc, item) => {
                return acc + (item.price * item.quantity)
            }, 0)
            // ⇑ ค่าเริ่มต้นคือ 0
        },
    },
    actions: {
        // 
        loadCart() {
            const cartItem = localStorage.getItem('cart-data')
            if (cartItem) {
                this.items = JSON.parse(cartItem)
            }
        },
        // เพิ่มสินค้าในปุ่มหน้าโฮม
        addToCart(productData) {
            // หา product ว่ามีอยู่ใน array ด้วย index มั้ย ถ้าเจอให้ item.name = product.name
            // ถ้าไม่เจอจะได้ index -1
            // เพราะงั้นจะเป็นการบวก quantity +1 แล้ว push เข้า cart ปกติ
            // แต่ถ้าเจอ กำหนดให้ currentItem ที index เพิ่มสินค้าไปที่ index นั้น
            const findProdctIndex = this.items.findIndex(item => {
                return item.name === productData.name
            })
            const currentItem = this.items[findProdctIndex]
            if (findProdctIndex < 0) {
                // console.log(findProdctIndex);//0/1
                productData.quantity = 1
                this.items.push(productData)
            }
            // index >= 0
            else {
                this.updateQuantity(findProdctIndex, currentItem.quantity + 1)
            }
            localStorage.setItem('cart-data', JSON.stringify(this.items))
        },
        // เปลี่ยนจำนวนสินค้าในตะกร้า 
        // ถ้าเป็นรายการเดียวกันก็จะไม่เพิ่มออเด้อเป็นออเด้อใหม่จะนำไปบวกกับอันเดิม
        updateQuantity(index, quantity) {
            this.items[index].quantity = quantity
            localStorage.setItem('cart-data', JSON.stringify(this.items))

        },
        // ลบไอเทมในรายการ cart ก่อนเช็คเอ้าท์
        removeItemInCart(index) {
            this.items.splice(index, 1)
            localStorage.setItem('cart-data', JSON.stringify(this.items))

        },
        checkOut(userData) {
            const orderData = {
                // เอาทั้งหมด
                ...userData,
                totalPrice: this.summaryPrice,
                paymentMethod: 'Credit Card',
                createdDate: (new Date()).toLocaleString(),
                orderNumber: `AA${Math.floor((Math.random() * 90000) + 10000)}`,
                products: this.items,
            }
            localStorage.setItem('order-data', JSON.stringify(orderData))
        },
        loadCheckOut() {
            const orderData = localStorage.getItem('order-data')
            if (orderData) {
                this.checkOut = JSON.parse(orderData)
            }
        },
    }
})