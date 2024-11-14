const defaultRouter = [
  {
    path: '',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: 'game',
    name: 'Game',
    component: () => import('@/views/game/index.vue')
  },
  {
    path: 'leaderboard',
    name: 'Leaderboard',
    component: () => import('@/views/leaderboard/index.vue')
  },
  {
    path: 'setting',
    name: 'Settings',
    component: () => import('@/views/settings/index.vue')
  },
]

export default defaultRouter
