import { useNavigate } from 'react-router-dom'
import styles from './bookCard.module.scss'

const BookCard = () => {
  const navigate = useNavigate()
  const handleEventClick = () => {
    navigate('searchbook')
  }
  return (
    <div className={styles.event}>
      <div className={styles.banner}>
        <div className={styles.content}>
          <div className={styles.contentLeft}>
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
          </div>
          <div className={styles.contentRight}>여긴 이미지</div>
        </div>
        <div>내가 읽고 싶은 책, 내가 읽었던 책을 담은 나만의 책 카드를 만들어보세요!</div>
        <button className={styles.goBtn} type='button' onClick={handleEventClick}>
          시작하기
        </button>
      </div>
    </div>
  )
}

export default BookCard
