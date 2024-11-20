<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useMath } from '@/composables/useMath'
import { computed, onMounted, ref, watch } from 'vue'

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
const canvasRef = ref<HTMLCanvasElement | null>(null)

const corrects = computed<number>(() => {
  return userRequest.value.filter((e => e.correct)).length
})
const total = computed(() => userRequest.value.length)
onMounted(() => {
  duration.value = parseInt(route.params.type as string)/60
  currentDifficulty.value = parseInt(route.params.difficulty as string)
  startQuiz()
  document.startViewTransition(() => drawNumbers())
})

const onRequest = (symbol: string) => {
  currentSymbol.value = symbol
  setTimeout(() => checkAnswer(currentQuiz.value, symbol), 100)
}

const drawNumbers = () => {
  const canvas = canvasRef.value
  if (canvas) {
    const ctx = canvas.getContext('2d')
    if (ctx) {
      // Reset canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = `28px Arial`
      ctx.fillStyle = 'white'

      // Draw num1
      ctx.textAlign = 'center'
      ctx.fillText(
        currentQuiz.value.num1.toString(),
        canvas.width / 4,
        canvas.height
      )

      // Draw num2
      ctx.fillText(
        currentQuiz.value.num2.toString(),
        (canvas.width / 4) * 3,
        canvas.height
      )
    }
  }
}

watch([currentQuiz, difficulty], drawNumbers)
</script>
<template>
  <div class="h-full text-center m-auto grid grid-cols-1 gap-y-2">
    <div v-if="isQuizActive" class="place-content-center">
      <ProgressBar :value="Math.round(timeLeft/seconds * 100)" class="!h-[8px] w-80 m-auto -mb-[190px] transition"><span></span></ProgressBar>
      <div class="relative font-bold text-3xl w-80 m-auto">
        <canvas ref="canvasRef" class="w-full h-[250px] bg-transparent"></canvas>
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2">
          <div v-if="currentSymbol" class="text-primary"> [{{ currentSymbol }}] </div>
          <div v-else> [<span class="invisible">></span>] </div>
        </div>
        <div class="absolute bottom-0 w-full h-10 bg-[#121212] -z-10" />
      </div>
      <div class="space-x-2 mt-8">
        <Button size="large" icon="pi pi-angle-left" @click="onRequest('<')" />
        <Button size="large" severity="contrast" icon="pi pi-equals" @click="onRequest('=')" />
        <Button size="large" icon="pi pi-angle-right" @click="onRequest('>')" />
      </div>
      <div class="mt-8">
        <Button as="router-link" size="small" variant="outlined" label="Home" icon="pi pi-home" to="/" class="mr-2" />
        <Button class="mt-4" variant="outlined" @click="nextQuestion()"><i class="pi pi-forward"/></Button>
      </div>
    </div>
    <div v-else class="place-content-center">
      <template v-if="hasCheating">
        <p class="text-2xl text-red-500 uppercase">You are using cheating!</p>
      </template>
      <template v-else>
        <p class="text-2xl">You have
          <span class="font-bold text-primary">{{ corrects }}</span>/{{ total }} in
          <span class="underline">{{ seconds < 60 ? `${seconds} seconds` : `${minutes} minutes` }} </span>
        </p>
        <p class="text-2xl">Percentage <span class="font-bold" :class="Math.round(corrects/total*100) >= 50 ? 'text-primary' : 'text-red-500'">{{ total ? Math.round(corrects/total*100) : 0 }}%</span></p>
        <div class="space-x-2 mt-4">
          <Button as="router-link" label="Home" icon="pi pi-home" to="/" />
          <Button as="router-link" label="Again" icon="pi pi-replay" variant="text" to="/game" />
        </div>
      </template>
    </div>
  </div>
</template>
