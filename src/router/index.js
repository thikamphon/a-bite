import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/user/HomeView.vue'
import CartView from '@/views/user/CartView.vue'
import CheckoutView from '@/views/user/CheckoutView.vue'
import ProfileView from '@/views/user/ProfileView.vue'
import SearchView from '@/views/user/SearchView.vue'
import SuccessView from '@/views/user/SuccessView.vue'
// admin
import AdminLogin from '@/views/admin/LoginView.vue'
import AdminDashboard from '@/views/admin/DashboardView.vue'
import AdminOrderDetailView from '@/views/admin/order/DetailView.vue'
import AdminOrderListView from '@/views/admin/order/ListView.vue'
import AdminUserListView from '@/views/admin/user/ListView.vue'
import AdminUserUpdateView from '@/views/admin/user/UpdateView.vue'
import AdminProductListView from '@/views/admin/product/ListView.vue'
import AdminProductUpdateView from '@/views/admin/product/UpdateView.vue'


// router/index.js
const router = createRouter({
  history: createWebHistory('/a-bite/'), // 👈 fix path ให้ตรงกับ GitHub Pages repo
  routes: [
    { path: '/', name: 'home', component: HomeView, },
    { path: '/cart', name: 'cart', component: CartView, },
    { path: '/profile', name: 'profile', component: ProfileView, },
    { path: '/search', name: 'search', component: SearchView, },
    { path: '/checkout', name: 'checkout', component: CheckoutView, },
    { path: '/success', name: 'success', component: SuccessView, },
    /*----admin----*/
    { path: '/admin/login', name: 'admin-login', component: AdminLogin, },
    { path: '/admin/dashboard', name: 'admin-dashboard', component: AdminDashboard, },

    { path: '/admin/orders/detail/:id', name: 'admin-orders-detail', component: AdminOrderDetailView, },
    { path: '/admin/orders/list', name: 'admin-orders-list', component: AdminOrderListView, },

    { path: '/admin/users/list', name: 'admin-users-list', component: AdminUserListView, },
    { path: '/admin/users/update/:id', name: 'admin-users-update', component: AdminUserUpdateView, },

    { path: '/admin/products/create', name: 'admin-products-create', component: AdminProductUpdateView, },
    { path: '/admin/products/update/:id', name: 'admin-products-update', component: AdminProductUpdateView, },
    { path: '/admin/products', name: 'admin-products-list', component: AdminProductListView, },

  ],
})

export default router
