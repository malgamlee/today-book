import { BookList, NoDataPage } from 'components'
import Breadcrumb from 'components/Breadcrumb'
import store from 'store'
import styles from '../myPage.module.scss'

const BookReading = () => {
  const readingStore = store.get('readingStore')

  const pageList = [
    ['마이페이지', '../mypage'],
    ['읽고있어요', '../mypage/bookreading'],
  ]
  return (
    <div className={styles.bookReading}>
      <Breadcrumb pageList={pageList} />
      {readingStore.length > 0 ? (
        <BookList search='' title='' next={false} isLink storeName='readingStore' />
      ) : (
        <NoDataPage type='announcement' noDataInfo='읽는 중인 작품이 없습니다.' />
      )}
    </div>
  )
}

export default BookReading
