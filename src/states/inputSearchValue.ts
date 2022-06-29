import { atom } from 'recoil'

export const inputValue = atom<string>({
  key: 'inputValue',
  default: '',
})

export const searchValue = atom<string>({
  key: 'searchValue',
  default: '',
})

export const searchListOpen = atom<string>({
  key: 'searchListOpen',
  default: 'false',
})

export const bookCardValue = atom<string>({
  key: 'bookCardValue',
  default: '',
})
