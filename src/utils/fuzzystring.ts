import { escapeRegExp } from 'lodash'
import { SearchStructure } from 'types/searchStructure'

interface ObjType {
  [ch: string]: number
}

const ch2pattern = (ch: string) => {
  if (/[ㄱ-ㅎ]/.test(ch)) {
    const con2syl: ObjType = {
      ㄱ: '가'.charCodeAt(0),
      ㄲ: '까'.charCodeAt(0),
      ㄴ: '나'.charCodeAt(0),
      ㄷ: '다'.charCodeAt(0),
      ㄸ: '따'.charCodeAt(0),
      ㄹ: '라'.charCodeAt(0),
      ㅁ: '마'.charCodeAt(0),
      ㅂ: '바'.charCodeAt(0),
      ㅃ: '빠'.charCodeAt(0),
      ㅅ: '사'.charCodeAt(0),
    }
    const begin = con2syl[ch] || (ch.charCodeAt(0) - 12613) * 588 + con2syl['ㅅ']
    const end = begin + 587
    return `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`
  }
  return escapeRegExp(ch)
}

const FuzzyString = (inputValue: string) => {
  const pattern = inputValue.split('').map(ch2pattern).join('.*?')
  return new RegExp(pattern, 'i')
}

export const fuzzyFilter = (dataList: SearchStructure[], searchValue: string): SearchStructure[] => {
  const regex = FuzzyString(searchValue)
  const resultData = dataList.filter((row) => {
    return regex.test(row.title)
  })
  return resultData
}
