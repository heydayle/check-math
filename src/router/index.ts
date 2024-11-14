import { createRouter, createWebHistory } from 'vue-router'
import authRouter from '@/router/auth'
import defaultRouter from '@/router/default'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import AuthLayout from '@/components/layouts/AuthLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      component: DefaultLayout,
      children: [
        ...defaultRouter
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthLayout,
      children: [
        ...authRouter
      ]
    },

  ],
})

export default router
