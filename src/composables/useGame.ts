import { ref } from 'vue'

export const useGame = () => {

  const gameDifficulty = ref<number | null>(null)
  const gameType = ref<number | null>(null)
  return {
    gameDifficulty,
    gameType
  }
}
