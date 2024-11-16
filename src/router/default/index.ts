const defaultRouter = [
  {
    path: '',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: 'game',
    name: 'Game',
    children: [
      {
        path: '',
        component: () => import('@/views/game/index.vue'),
      },
      {
        path: ':difficulty/:type',
        name: 'GameControl',
        component: () => import('@/views/game/Control.vue'),
      }
    ]
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
