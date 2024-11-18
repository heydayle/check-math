<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useMath } from '@/composables/useMath'
import { computed, onMounted, ref } from 'vue'

const route = useRoute()

const {
  isQuizActive,
  userRequest,
  startQuiz,
  currentQuiz,
  duration,
  checkAnswer,
  currentSymbol,
  timeLeft,
  currentDifficulty,
  nextQuestion,
} = useMath()

const minutes = computed<number>(() => parseInt(route.params.type as string)/60)
const corrects = computed<number>(() => {
  return userRequest.value.filter((e => e.correct)).length
})
const total = computed(() => userRequest.value.length)
onMounted(() => {
  duration.value = parseInt(route.params.type as string)/60
  currentDifficulty.value = parseInt(route.params.difficulty as string)
  startQuiz()
})

const onRequest = (symbol: string) => {
  currentSymbol.value = symbol
  setTimeout(() => checkAnswer(currentQuiz.value, symbol), 100)
}
</script>
<template>
  <div class="h-full text-center m-auto grid grid-cols-1 gap-y-2">
    <div v-if="isQuizActive" class="place-content-center">
      <div> {{ timeLeft }}s</div>
      <div class="font-bold text-3xl">
        <span>{{ currentQuiz.num1 }}</span>
        <span v-if="currentSymbol" class="text-red-500"> [{{currentSymbol}}] </span>
        <span v-else> [<span class="invisible">></span>] </span>
        <span>{{ currentQuiz.num2 }}</span>
      </div>
      <div class="space-x-2 mt-4">
        <Button size="large" label="<" @click="onRequest('<')" />
        <Button size="large" severity="contrast" label="=" @click="onRequest('=')" />
        <Button size="large" label=">" @click="onRequest('>')" />
      </div>
      <Button class="mt-4" variant="outlined" @click="nextQuestion()">Next</Button>
    </div>
    <div v-else class="place-content-center">
      <p class="text-2xl">You have <span class="font-bold text-primary">{{ corrects }}</span> correct answers of {{ total }} in {{ minutes }} minutes</p>
      <Button as="router-link" label="Again" icon="pi pi-replay" variant="text" to="/game" />
    </div>
  </div>
</template>
