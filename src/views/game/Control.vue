<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useMath } from '@/composables/useMath'
import { computed, onMounted, ref, watch } from 'vue'
import Summary from '@/components/game/Summary.vue'
import { DifficultiesByValue } from '@/constants/game'
import { useWindowSize } from '@vueuse/core'

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
  score,
} = useMath()
const { width } = useWindowSize()
const seconds = computed<number>(() => parseInt(route.params.type as string))
const minutes = computed<number>(() => parseInt(route.params.type as string) / 60)
const difficulty = computed<number>(() => parseInt(route.params.difficulty as string))
const canvasRef = ref<HTMLCanvasElement | null>(null)

const corrects = computed<number>(() => {
  return userRequest.value.filter((e) => e.correct).length
})
const total = computed(() => userRequest.value.length)
const difficultName = computed(() => DifficultiesByValue[difficulty.value - 1])
const summary = computed(() => {
  return [
    { key: 'Answers', value: total.value },
    { key: 'Correct', value: corrects.value },
    { key: 'Difficulty', value: difficultName.value },
    { key: 'Time', value: seconds.value < 60 ? `${seconds.value}s` : `${minutes.value}m` },
    { key: 'Score', value: score.value },
  ]
})
onMounted(() => {
  duration.value = parseInt(route.params.type as string) / 60
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
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      // Reset canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = difficulty.value > 2 ? `24px Arial` : `36px Arial`
      ctx.fillStyle = 'white'

      const isMobile = width.value < 500 && difficulty.value > 1

      if (isMobile) {
        // Xuống dòng: Vẽ mỗi biểu thức trên dòng riêng
        ctx.textAlign = 'center';
        ctx.fillText(
          currentQuiz.value.expression1.expression.toString(),
          canvas.width / 2 / dpr, // Canh giữa
          canvas.height / 3 / dpr // Vẽ trên 1/3 chiều cao canvas
        );
        ctx.fillText(
          currentQuiz.value.expression2.expression.toString(),
          canvas.width / 2 / dpr, // Canh giữa
          (canvas.height / 3) * 2 / dpr // Vẽ ở 2/3 chiều cao canvas
        );
      } else {
        // Vẽ thông thường: hai biểu thức trên cùng một dòng
        ctx.textAlign = 'center';
        ctx.fillText(
          currentQuiz.value.expression1.expression.toString(),
          canvas.width / 4 / dpr,
          canvas.height / 2 / dpr
        );
        ctx.fillText(
          currentQuiz.value.expression2.expression.toString(),
          ((canvas.width / 4) * 3) / dpr,
          canvas.height / 2 / dpr
        );
      }
    }
  }
}

watch([currentQuiz, difficulty], drawNumbers)
</script>
<template>
  <div class="h-full text-center m-auto grid grid-cols-1 gap-y-2">
    <div v-if="isQuizActive" class="place-content-center">
      <ProgressBar
        :value="Math.round((timeLeft / seconds) * 100)"
        class="!h-[8px] w-80 m-auto mb-4 transition"
        ><span></span
      ></ProgressBar>
      <div class="relative font-bold text-3xl m-auto" :class="difficulty > 1 ? 'w-full': 'w-80'">
        <canvas ref="canvasRef" class="w-full -mb-20 h-[190px] xs:h-[50px] bg-transparent"></canvas>
        <div class="absolute bottom-[90px] xs:bottom-5 left-1/2 -translate-x-1/2 z-10">
          <div v-if="currentSymbol" class="text-primary">{{ currentSymbol }}</div>
          <div v-else class="text-white"><span class="invisible">></span></div>
        </div>
        <div class="absolute bottom-12 w-full h-28 bg-[#121212] -z-10 rounded-lg" />
      </div>
      <div class="space-x-2 mt-10">
        <Button size="large" icon="pi pi-angle-left" @click="onRequest('<')" />
        <Button size="large" severity="contrast" icon="pi pi-equals" @click="onRequest('=')" />
        <Button size="large" icon="pi pi-angle-right" @click="onRequest('>')" />
      </div>
      <div class="fixed bottom-10 left-1/2 -translate-x-1/2">
        <Button
          as="router-link"
          size="small"
          variant="outlined"
          icon="pi pi-home"
          to="/"
          class="mr-2"
        />
        <Button
          class="mt-4"
          size="small"
          variant="outlined"
          icon="pi pi-forward"
          @click="nextQuestion()"
        />
      </div>
    </div>
    <div v-else class="place-content-center">
      <template v-if="hasCheating">
        <p class="text-2xl text-red-500 uppercase">You are using cheating!</p>
      </template>
      <template v-else>
        <Summary :summary="summary" />
        <div class="space-x-2 mt-20 pt-20">
          <Button as="router-link" icon="pi pi-home" to="/" />
          <Button as="router-link" icon="pi pi-replay" variant="text" to="/game" />
        </div>
      </template>
    </div>
  </div>
</template>
