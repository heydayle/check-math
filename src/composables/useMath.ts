import { ref } from 'vue'
import { Difficulties } from '@/constants/game'
interface IExpression {
  value: number
  expression: string
}
interface IQuiz {
  expression1: IExpression
  expression2: IExpression
  result: '>' | '<' | '='
  correct: boolean
}
const TEMP_QUIZ: IQuiz = {
  expression1: {
    value: 0,
    expression: '0',
  },
  expression2: {
    value: 1,
    expression: '1',
  },
  correct: false,
  result: '='
}
export const useMath = () => {
  const userRequest = ref<IQuiz[]>([])
  const currentQuiz = ref<IQuiz>(TEMP_QUIZ)
  const currentSymbol = ref<string | null>(null)
  const currentDifficulty = ref<number>(1)
  const isQuizActive = ref(false)
  const score = ref(0)
  const timeLeft = ref(0)
  const duration = ref(0)
  const lastQuestionTimestamp = ref(Date.now())
  const hasCheating = ref(false)
  let timer: number = 0

  const checkCheatSpeed = () => {
    const currentTime = Date.now()
    const timeElapsed = currentTime - lastQuestionTimestamp.value
    if (timeElapsed < 50) {
      return true
    }
    lastQuestionTimestamp.value = currentTime
    return false
  }
  const getRandomNumber = (min: number = 1, max: number = 100) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  const getResultByExpression = (expr1: number, expr2: number): '<' | '>' | '=' => {
    return expr1 > expr2 ? '>' : expr1 < expr2 ? '<' : '='
  }
  const generateExpression = (min: number, max: number, numTerms: number): IExpression => {
    const operators = ['+', '-', '*', '/']
    let expression: string = `${getRandomNumber(min, max)}` // Bắt đầu với số đầu tiên

    for (let i = 1; i < numTerms; i++) {
      const operator = operators[Math.floor(Math.random() * operators.length)] // Toán tử ngẫu nhiên
      const num = getRandomNumber(min, max) // Số ngẫu nhiên tiếp theo
      expression += ` ${operator} ${num}` // Ghép toán tử và số vào biểu thức
    }

    const value: number = eval(expression) // Tính giá trị của biểu thức
    return { expression, value }
  }

  const generateQuiz = (difficulty: number): IQuiz => {
    const min =
      difficulty === Difficulties.EASY ? 1 : difficulty === Difficulties.NORMAL ? 6801 : 969001
    const max =
      difficulty === Difficulties.EASY ? 100 : difficulty === Difficulties.NORMAL ? 6899 : 969999

    const numTerms =
      difficulty === Difficulties.EASY
        ? 2 // Dễ: 2 số
        : difficulty === Difficulties.NORMAL
          ? 2 // Bình thường: 3 số
          : 3 // Khó: 4 số

    const expr1 = generateExpression(min, max, numTerms)
    const expr2 = generateExpression(min, max, numTerms)

    currentSymbol.value = null

    return {
      expression1: expr1,
      expression2: expr2,
      result: getResultByExpression(expr1.value, expr2.value),
      correct: false,
    }
  }
  const calculateScore = () => {
    const totalQuestionsAnswered = userRequest.value.length
    const totalCorrectAnswers = userRequest.value.filter((quiz) => quiz.correct).length
    const totalIncorrectAnswers = totalQuestionsAnswered - totalCorrectAnswers

    const totalTime = duration.value * 60
    const delta = totalQuestionsAnswered / totalTime
    const petal = totalCorrectAnswers / totalTime
    const leafDown = totalIncorrectAnswers * 100
    const ratio = totalCorrectAnswers * 100 - leafDown

    const value = delta * 2 + petal * 10 + ratio
    return value < 1 ? 0 : Number(Math.round(value).toFixed(0))
  }
  const checkAnswer = (quiz: IQuiz, symbol: string) => {
    const { result } = quiz
    const isCheating = checkCheatSpeed()
    if (isCheating) {
      endQuiz()
      hasCheating.value = true
    }
    currentQuiz.value.correct =
      (symbol === result)
    userRequest.value.push(currentQuiz.value)
    currentQuiz.value = generateQuiz(currentDifficulty.value)
  }
  const startTimer = () => {
    timer = setInterval(() => {
      timeLeft.value--
      if (timeLeft.value <= 0) {
        endQuiz()
      }
    }, 1000)
  }
  const endQuiz = () => {
    isQuizActive.value = false
    score.value = calculateScore()
    clearInterval(timer)
  }
  const startQuiz = () => {
    isQuizActive.value = true
    hasCheating.value = false
    timeLeft.value = duration.value * 60
    userRequest.value = []
    currentQuiz.value = generateQuiz(currentDifficulty.value)
    startTimer()
  }
  const nextQuestion = () => {
    currentQuiz.value.correct = false
    userRequest.value.push(currentQuiz.value)
    currentQuiz.value = generateQuiz(currentDifficulty.value)
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
