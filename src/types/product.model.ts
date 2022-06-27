import type { GENDER } from '@/constants'
import type { SPORT } from '@/constants'
import type { COLOR } from '@/constants'

export interface Product {
  article: string
  value: number
  sexe: keyof typeof GENDER
  sport: keyof typeof SPORT
  photo: string
  colors: (keyof typeof COLOR)[]
}
