import { atom } from 'recoil'

interface UserStructure {
  userId: string
  userName: string
}

const INIT_USER = {
  userId: 'malgamlee',
  userName: '말감',
}

export const userInfoState = atom<UserStructure>({
  key: 'userInfoState',
  default: INIT_USER,
})
