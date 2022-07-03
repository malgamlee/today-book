import { bestSeller } from 'data/bestSeller'
import { useNavigate } from 'react-router-dom'
import styles from './main.module.scss'
import { RowBookList } from 'components/RowBookList'
import { BookIcon } from 'assets/svgs'

const NewMain = () => {
  const navigate = useNavigate()
  const handleEventClick = () => {
    navigate('bookcard')
  }
  return (
    <div className={styles.main}>
      <div className={styles.banner}>
        <div className={styles.left}>
          <div className={styles.title}>
            <p>어제&nbsp;</p> 읽은 책
          </div>
          <div className={styles.title}>
            <p>오늘&nbsp;</p> 읽은 책
          </div>
          <div className={styles.title}>
            <p>내가&nbsp;</p> 읽은 책
          </div>
          <div className={styles.under}>모두와 공유해보세요.</div>
          <button className={styles.goBtn} type='button' onClick={handleEventClick}>
            참여하기
          </button>
        </div>
        <div className={styles.right}>
          <BookIcon className={styles.icon} />
        </div>
      </div>
      <div className={styles.section}>
        베스트셀러
        <RowBookList bookList={bestSeller} />
      </div>
    </div>
  )
}

export default NewMain
