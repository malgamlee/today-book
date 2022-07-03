import { BookList, NoDataPage } from 'components'
import Breadcrumb from 'components/Breadcrumb'
import store from 'store'
import styles from '../myPage.module.scss'

const BookRating = () => {
  const ratingStore = store.get('ratingStore')
  const pageList = [
    ['마이페이지', '../mypage'],
    ['평가한 작품들', '../mypage/bookrating'],
  ]

  return (
    <div className={styles.bookRating}>
      <Breadcrumb pageList={pageList} />
      {ratingStore.length > 0 ? (
        <BookList search='' title='' next={false} isLink storeName='ratingStore' />
      ) : (
        <NoDataPage type='announcement' noDataInfo='평가한 작품이 없습니다.' />
      )}
    </div>
  )
}

export default BookRating
