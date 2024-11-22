import type { IGameDifficulty, IGameType } from '@/types/gameTypes'

export const GameDifficulties: IGameDifficulty[] = [
  {
    label: 'Easy',
    value: 1,
  },
  {
    label: 'Normal',
    value: 2,
    severity: ''
  },
  {
    label: 'Hard',
    value: 3,
    severity: ''
  }
]
export const Difficulties = {
  EASY: 1,
  NORMAL: 2,
  HARD: 3,
}
export const DifficultiesByValue = [
  'Easy',
  'Normal',
  'Hard',
]
export const GameTypes: IGameType[] = [
  {
    label: '1 minute',
    value: 60,
  },
  {
    label: '3 minutes',
    value: 180,
    severity: ''
  },
  {
    label: '5 minutes',
    value: 300,
    severity: ''
  }
]
