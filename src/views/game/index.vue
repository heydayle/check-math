<script setup lang="ts">
import { GameDifficulties, GameTypes } from '@/constants/game'
import { useGame } from '@/composables/useGame'
import type { IGameDifficulty, IGameType } from '@/types/gameTypes'
import { useRouter } from 'vue-router'

const router = useRouter()

const { gameDifficulty, gameType } = useGame()

const onSetDifficulty = (e: IGameDifficulty): void => {
  gameDifficulty.value = e.value
}
const onSetGameType = (e: IGameType): void => {
  gameType.value = e.value
  if (gameDifficulty.value) {
    router.push({
      name: 'GameControl',
      params: { difficulty: gameDifficulty.value, type: gameType.value },
    })
  }
}
</script>

<template>
  <div class="h-full">
    <div class="h-full sm:w-1/3 m-auto ">
      <div class="h-full grid grid-cols-1 gap-y-2 place-content-center">
        <template v-if="!gameDifficulty">
          <Button
            v-for="(item, index) in GameDifficulties"
            :key="index"
            outlined
            :severity="item.severity"
            @click="onSetDifficulty(item)"
          >
            {{ item.label }}
          </Button>
        </template>
        <template v-else>
          <Button
            v-for="(item, index) in GameTypes"
            :key="index"
            outlined
            :severity="item.severity"
            @click="onSetGameType(item)"
          >
            {{ item.label }}
          </Button>
        </template>
      </div>
    </div>
  </div>
</template>
