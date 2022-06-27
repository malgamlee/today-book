import styles from './myPage.module.scss'
import { useNavigate } from 'react-router-dom'
import store from 'store'

const NewMyPage = () => {
  const navigate = useNavigate()
  const ratingData = store.get('ratingStore')
  const readingData = store.get('readingStore')
  const likeData = store.get('likeStore')

  // navigate(`searchresult/${input}`)

  return (
    <div className={styles.myPage}>
      마이페이지
      <div className={styles.buttonWrapper}>
        <button type='button' className={styles.button}>
          책 평가 {ratingData.length}
        </button>
        <button type='button' className={styles.button}>
          읽고싶어요 {readingData.length}
        </button>
        <button type='button' className={styles.button}>
          읽고있어요 {likeData.length}
        </button>
      </div>
    </div>
  )
}

export default NewMyPage
