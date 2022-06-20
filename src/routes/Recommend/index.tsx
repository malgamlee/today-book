import { RowBookList } from 'components/RowBookList'
import { bestSeller } from 'data/bestSeller'
import { useQuery } from 'react-query'
import { getSearchListApi } from 'services/bookSearchApi'

import styles from './recommend.module.scss'

function GetBookData(paramValue: string) {
  const { data } = useQuery(
    ['getSearchListApi', paramValue],
    () => getSearchListApi(paramValue, 1).then((res) => res.data),
    {
      enabled: !!paramValue,
    }
  )
  return data?.documents
}

const Recommend = () => {
  const getSpaceBook = GetBookData('우주')
  return (
    <div className={styles.recommend}>
      <div className={styles.section1}>
        베스트셀러를 소개합니다!
        <RowBookList bookList={bestSeller} />
      </div>
      <div className={styles.section2}>
        누리호 발사 전, 우주에 대해 알아볼까요?
        <RowBookList bookList={getSpaceBook} />
      </div>
    </div>
  )
}
export default Recommend
