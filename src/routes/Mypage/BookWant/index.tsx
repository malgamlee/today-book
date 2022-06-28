import { BookList } from 'components'
import Breadcrumb from 'components/Breadcrumb'
import styles from '../myPage.module.scss'

const BookWant = () => {
  const pageList = [
    ['마이페이지', '../mypage'],
    ['읽고싶어요', '../mypage/bookwant'],
  ]
  return (
    <div className={styles.bookWant}>
      <Breadcrumb pageList={pageList} />
      <BookList search='' title='' next={false} isLink storeName='likeStore' />
    </div>
  )
}

export default BookWant
