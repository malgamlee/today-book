import { BookList } from 'components'
import Breadcrumb from 'components/Breadcrumb'
import styles from '../myPage.module.scss'

const BookReading = () => {
  const pageList = [
    ['마이페이지', '../mypage'],
    ['읽고있어요', '../mypage/bookreading'],
  ]
  return (
    <div className={styles.bookReading}>
      <Breadcrumb pageList={pageList} />
      <BookList search='' title='' next={false} isLink storeName='readingStore' />
    </div>
  )
}

export default BookReading
