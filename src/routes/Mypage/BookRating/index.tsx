import { BookList } from 'components'
import Breadcrumb from 'components/Breadcrumb'
import styles from '../myPage.module.scss'

const BookRating = () => {
  const pageList = [
    ['마이페이지', '../mypage'],
    ['평가한 작품들', '../mypage/bookrating'],
  ]

  return (
    <div className={styles.bookRating}>
      <Breadcrumb pageList={pageList} />
      <BookList search='' title='' next={false} isLink storeName='ratingStore' />
    </div>
  )
}

export default BookRating
