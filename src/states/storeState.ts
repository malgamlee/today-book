import { atom } from 'recoil'
import store from 'store'
import { SearchStructure, RatingStructure } from 'types/searchStructure'

const readingStoreData = store.get('readingStore')

export const readingStoreState = atom<Array<SearchStructure>>({
  key: 'readingStoreState',
  default: readingStoreData || [],
})

const likeStoreData = store.get('likeStore')

export const likeStoreState = atom<Array<SearchStructure>>({
  key: 'likeStoreState',
  default: likeStoreData || [],
})

const ratingStoreData = store.get('ratingStore')

export const ratingStoreState = atom<Array<RatingStructure>>({
  key: 'ratingStoreState',
  default: ratingStoreData || [],
})
