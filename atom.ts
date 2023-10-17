import { atom } from 'jotai'
import responsePDF from '@/types/responsePDF'

export const data = atom<responsePDF | null>(null)
