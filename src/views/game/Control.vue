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
  hasCheating,
} = useMath()

const seconds = computed<number>(() => parseInt(route.params.type as string))
const minutes = computed<number>(() => parseInt(route.params.type as string)/60)
const difficulty = computed<number>(() => parseInt(route.params.difficulty as string))

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
      <ProgressBar :value="Math.round(timeLeft/seconds * 100)" class="!h-[8px] mb-4 transition"><span></span></ProgressBar>
      <div class="font-bold text-3xl">
        <span class="inline-block" :class="{'w-10': difficulty < 2, 'w-32': difficulty > 1, }">{{ currentQuiz.num1 }}</span>
        <span v-if="currentSymbol" class="text-red-500"> [{{currentSymbol}}] </span>
        <span v-else> [<span class="invisible">></span>] </span>
        <span class="inline-block" :class="{'w-10': difficulty < 2, 'w-32': difficulty > 1}">{{ currentQuiz.num2 }}</span>
      </div>
      <div class="space-x-2 mt-4">
        <Button size="large" icon="pi pi-angle-left" @click="onRequest('<')" />
        <Button size="large" severity="contrast" icon="pi pi-equals" @click="onRequest('=')" />
        <Button size="large" icon="pi pi-angle-right" @click="onRequest('>')" />
      </div>
      <Button class="mt-4" variant="outlined" @click="nextQuestion()"><i class="pi pi-forward"/></Button>
    </div>
    <div v-else class="place-content-center">
      <template v-if="hasCheating">
        <p class="text-2xl text-red-500 uppercase">You are using cheating!</p>
      </template>
      <template v-else>
        <p class="text-2xl">You have <span class="font-bold text-primary">{{ corrects }}</span>/{{ total }} in <span class="underline">{{ minutes }} minutes</span></p>
        <p class="text-2xl">Ratio <span class="font-bold" :class="Math.round(corrects/total*100) >= 50 ? 'text-primary' : 'text-red-500'">{{ total ? Math.round(corrects/total*100) : 0 }}%</span></p>
        <div class="space-x-2 mt-4">
          <Button as="router-link" label="Home" icon="pi pi-home" to="/" />
          <Button as="router-link" label="Again" icon="pi pi-replay" variant="text" to="/game" />
        </div>
      </template>
    </div>
  </div>
</template>
