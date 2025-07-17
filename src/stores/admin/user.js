import { defineStore } from 'pinia'


export const useAdminUserStore = defineStore('admin-user', {
    state: () => ({
        list: [{
            fullname: 'Mike',
            role: 'admin',
            status: 'inactive',
            updatedAt: new Date().toISOString(),
        }, {
            fullname: 'Meen',
            role: 'admin',
            status: 'active',
            updatedAt: new Date().toISOString(),
        },
        {
            fullname: 'Oppal',
            role: 'moderator',
            status: 'active',
            updatedAt: new Date().toISOString(),
        }
        ],
    }),
    actions: {
        loadUser() {
            const user = localStorage.getItem('admin-user')
            if (user) {
                this.list = JSON.parse(user)
            }
        },
        getUser(index) {
            this.loadUser()
            return this.list[index]
        },
        updateUser(index, data) {
            const fields = ['fullname', 'role', 'status']
            for (let form of fields) {
                this.list[index][form] = data[form]
            }
            this.list[index].updatedAt = (new Date).toISOString()
            localStorage.setItem('admin-user', JSON.stringify(this.list));
        },
        removeUser(index) {
            this.list.splice(index, 1)
        }
    }
})