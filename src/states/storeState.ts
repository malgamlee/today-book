import { atom } from 'recoil'
import store from 'store'
import { SearchStructure } from 'types/searchStructure'

const cartStoreData = store.get('cartStore')

export const cartStoreState = atom<Array<SearchStructure>>({
  key: 'cartStoreState',
  default: cartStoreData || [],
})

const likeStoreData = store.get('likeStore')

export const likeStoreState = atom<Array<SearchStructure>>({
  key: 'likeStoreState',
  default: likeStoreData || [],
})
