import { ref } from 'vue'
import { Difficulties } from '@/constants/game'
import { useToast } from 'primevue/usetoast'
interface IQuiz {
  num1: number, num2: number, correct: boolean
}
export const useMath = () => {
  const userRequest = ref<IQuiz[]>([])
  const currentQuiz = ref<IQuiz>({ num1: 0, num2: 0, correct: false })
  const currentSymbol = ref<string | null>(null)
  const currentDifficulty = ref<number>(1)
  const isQuizActive = ref(false)
  const score = ref(0)
  const timeLeft = ref(0)
  const duration = ref(0)
  const lastQuestionTimestamp = ref(Date.now());
  const hasCheating = ref(false);
  let timer: number = 0;

  const checkCheatSpeed = () => {
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastQuestionTimestamp.value;
    if (timeElapsed < 50) {
      return true
    }
    lastQuestionTimestamp.value = currentTime;
    return false
  };
  const getRandomNumber = (min: number = 1, max: number = 100) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const generateQuiz = (difficulty: number) => {
    const min = difficulty === Difficulties.EASY
                ? 1
                : difficulty === Difficulties.NORMAL
                  ? 6801
                  : 969001
    const max = difficulty === Difficulties.EASY
                ? 100
                : difficulty === Difficulties.NORMAL
                  ? 6899
                  : 969999
    const num1 = getRandomNumber(min, max)
    const num2 = getRandomNumber(min, max)
    currentSymbol.value = null

    return {
      num1,
      num2,
      correct: false
    };
  }
  const calculateScore = () => {
    const totalQuestionsAnswered = userRequest.value.length
    const totalCorrectAnswers = userRequest.value.filter((quiz) => quiz.correct).length
    const totalIncorrectAnswers = totalQuestionsAnswered - totalCorrectAnswers

    const totalTime = duration.value * 60
    const delta = totalQuestionsAnswered / totalTime
    const petal = totalCorrectAnswers / totalTime
    const leafDown = totalIncorrectAnswers * 100
    const ratio = (totalCorrectAnswers * 100) - leafDown

    const value = (delta * 2) + (petal * 10) + ratio
    return value < 1 ? 0 : Number(Math.round(value).toFixed(0))
  }
  const checkAnswer = (quiz: IQuiz, symbol: string) => {
    const { num1, num2 } = quiz
    const isCheating = checkCheatSpeed()
    if (isCheating) {
      endQuiz()
      hasCheating.value = true
    }
    currentQuiz.value.correct =
      (symbol === '>' && num1 > num2) ||
      (symbol === '<' && num1 < num2) ||
      (symbol === '=' && num1 === num2) as boolean
    userRequest.value.push(currentQuiz.value)
    currentQuiz.value = generateQuiz(currentDifficulty.value);
  }
  const startTimer = () => {
    timer = setInterval(() => {
      timeLeft.value--;
      if (timeLeft.value <= 0) {
        endQuiz();
      }
    }, 1000);
  }
  const endQuiz = () => {
    isQuizActive.value = false;
    score.value = calculateScore();
    clearInterval(timer);
  }
  const startQuiz = () => {
    isQuizActive.value = true;
    hasCheating.value = false;
    timeLeft.value = duration.value * 60;
    userRequest.value = [];
    currentQuiz.value = generateQuiz(currentDifficulty.value);
    startTimer();
  }
  const nextQuestion = () => {
    currentQuiz.value.correct = false
    userRequest.value.push(currentQuiz.value)
    currentQuiz.value = generateQuiz(currentDifficulty.value);
  }
  return {
    userRequest,
    currentQuiz,
    isQuizActive,
    timeLeft,
    duration,
    startQuiz,
    endQuiz,
    startTimer,
    checkAnswer,
    currentSymbol,
    currentDifficulty,
    nextQuestion,
    hasCheating,
    score,
  }
}
