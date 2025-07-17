import { defineStore } from "pinia";

export const useAdminProductStore = defineStore('admin-product', {
    state: () => ({
        list: [
            {
                name: 'pizza salad',
                imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                quantity: 10,
                remainQuantity: 10,
                about: 'Crisp veggies meet savory pizza flavors.',
                status: 'open',
                price: 8,
                updatedAt: (new Date()).toISOString(),
            },
            {
                name: 'pasta parmesan',
                imageUrl: 'https://images.unsplash.com/photo-1579631542720-3a87824fff86?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                quantity: 10,
                remainQuantity: 10,
                about: 'Soft pasta cooked with butter and aromatic Parmesan cheese.',
                status: 'open',
                price: 13,
                updatedAt: (new Date()).toISOString(),
            },
            {
                name: 'steak meat',
                imageUrl: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                quantity: 10,
                remainQuantity: 10,
                about: 'Ribeye steak, for tender texture and full flavor.',
                status: 'open',
                price: 20,
                updatedAt: (new Date()).toISOString(),
            },
            {
                name: 'vegan salad',
                imageUrl: 'https://images.unsplash.com/photo-1484980972926-edee96e0960d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                quantity: 10,
                remainQuantity: 10,
                about: 'vegan, refreshing taste, and complete protein.',
                status: 'open',
                price: 10,
                updatedAt: (new Date()).toISOString(),
            },
            {
                name: 'steak salmon',
                imageUrl: 'https://images.unsplash.com/photo-1580959375944-abd7e991f971?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                quantity: 10,
                remainQuantity: 10,
                about: 'salmon slices, served with flavorful salad dressing.',
                status: 'open',
                price: 15,
                updatedAt: (new Date()).toISOString(),
            },
            {
                name: 'toast blueberry',
                imageUrl: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=1547&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                quantity: 10,
                remainQuantity: 10,
                about: 'Sweet aroma with fresh fruit.',
                status: 'open',
                price: 8,
                updatedAt: (new Date()).toISOString(),
            },
            {
                name: 'pumpkin soup',
                imageUrl: 'https://images.unsplash.com/photo-1605034997426-399051e3f7ae?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                quantity: 10,
                remainQuantity: 10,
                about: 'Creamy and flavorful with roasted pumpkin and spices.',
                status: 'open',
                price: 6,
                updatedAt: (new Date()).toISOString(),
            },
            {
                name: 'meat ball',
                imageUrl: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                quantity: 10,
                remainQuantity: 10,
                about: 'Juicy meat with rich flavor in every bite.',
                status: 'open',
                price: 8,
                updatedAt: (new Date()).toISOString(),
            },
            {
                name: 'salad roll',
                imageUrl: 'https://images.unsplash.com/photo-1600850056064-a8b380df8395?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                quantity: 10,
                remainQuantity: 10,
                about: 'Fresh vegetables,Refreshing taste and creamy texture.',
                status: 'open',
                price: 8,
                updatedAt: (new Date()).toISOString(),
            },
            {
                name: 'hamburger',
                imageUrl: 'https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                quantity: 10,
                remainQuantity: 10,
                about: 'a classic combo of grilled beef and savory sauces.',
                status: 'open',
                price: 8,
                updatedAt: (new Date()).toISOString(),
            },
        ],
        loaded: false,
        filter: {
            search: '',
            status: '',
            sort: {
                updatedAt: 'desc'
            }
        }
    }), actions: {
        loadProduct() {

            const product = localStorage.getItem('admin-product')
            if (product) {
                this.list = JSON.parse(product)
                this.loaded = true
            }

            if (this.filter.search) {
                this.list = this.list.filter(product => {
                    return product.name.toLowerCase().includes(this.filter.search.toLowerCase());
                });
            }
            
            if (this.filter.status) {
                this.list = this.list.filter(product => product.status === this.filter.status);
            }

            if (this.filter.sort && this.filter.sort.updatedAt) {
                this.list = this.list.sort((a, b) => {
                    const dateA = new Date(a.updatedAt)
                    const dateB = new Date(b.updatedAt)

                    return this.filter.sort.updatedAt === 'asc'
                        ? dateA - dateB
                        : dateB - dateA
                })
            }

        },
        getProduct(index) {
            if (!this.loaded) {
                this.loadProduct()
            }
            return this.list[index]
        },
        addProduct(data) {
            data.remainQuantity = data.quantity
            data.updatedAt = (new Date()).toISOString()
            this.list.unshift(data)
            localStorage.setItem('admin-product', JSON.stringify(this.list))
            this.loadProduct()

        },
        updateProduct(index, data) {
            const fields = ['name', 'imageUrl', 'status'];
            const target = this.list[index];
            fields.forEach(field => {
                target[field] = data[field];
            });
            target.remainQuantity = data.quantity;
            target.updatedAt = new Date().toISOString();

            localStorage.setItem('admin-product', JSON.stringify(this.list));
        },

        removeProduct(index) {
            this.list.splice(index, 1)
            localStorage.setItem('admin-product', JSON.stringify(this.list))
        }
    }
})

