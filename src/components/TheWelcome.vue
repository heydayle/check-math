<script setup lang="ts">
import axios from 'axios'

interface IAction {
  label: string
  action: () => void
  variant?: 'outlined' | 'text'
  as?: string
  link?: string
}
const ACTIONS: IAction[] = [
  {
    label: 'Start',
    action: () => {},
    link: '/game',
    as: 'router-link',
  },
  {
    label: 'Leaderboard',
    action: () => {},
    link: '/leaderboard',
    variant: 'outlined',
    as: 'router-link',
  },
  {
    label: 'Setting',
    action: () => {},
    link: '/setting',
    variant: 'outlined',
    as: 'router-link',
  },
]
</script>

<template>
  <div class="h-full place-content-center">
    <div class="flex-1 flex flex-col space-y-4 items-center justify-around">
      <Button
        v-for="(item, index) in ACTIONS"
        :key="index"
        :label="item.label"
        :variant="item.variant || undefined"
        :to="item.link"
        :as="item.as"
        class="w-1/2"
      />
    </div>
  </div>
</template>
