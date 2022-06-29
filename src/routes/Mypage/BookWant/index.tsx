import { BookList, NoDataPage } from 'components'
import Breadcrumb from 'components/Breadcrumb'
import store from 'store'
import styles from '../myPage.module.scss'

const BookWant = () => {
  const likeStore = store.get('likeStore')

  const pageList = [
    ['마이페이지', '../mypage'],
    ['읽고싶어요', '../mypage/bookwant'],
  ]
  return (
    <div className={styles.bookWant}>
      <Breadcrumb pageList={pageList} />
      {likeStore.length > 0 ? (
        <BookList search='' title='' next={false} isLink storeName='likeStore' />
      ) : (
        <NoDataPage type='announcement' noDataInfo='읽고싶어요 하신 작품이 없습니다.' />
      )}
    </div>
  )
}

export default BookWant
