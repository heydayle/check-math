const authRouter = [
  {
    path: '/sign-in',
    name: 'Sign in',
    component: () => import('@/views/auth/SignIn.vue')
  }
]

export default authRouter
