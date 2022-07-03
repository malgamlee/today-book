import { axios } from 'hooks/worker'

export const getSearchListApi = (searchString: string | undefined, pageNum: number) =>
  axios.get('https://dapi.kakao.com/v3/search/book', {
    headers: {
      Authorization: `KakaoAK ${process.env.REACT_APP_SEARCH_KEY as string}`,
    },
    params: {
      query: searchString,
      page: pageNum,
      size: 10,
    },
  })
