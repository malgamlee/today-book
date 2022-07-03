import store from 'store'
import { RatingStructure } from 'types/searchStructure'
import styles from './makeCard.module.scss'
import noImage from 'assets/images/noImage.png'
import { useParams } from 'react-router-dom'

const MakeCard = () => {
  const { paramValue } = useParams()

  const ratingData = store.get('ratingStore')
  const selectBook = ratingData.filter((item: RatingStructure) => item.isbn === paramValue)
  return (
    <div className={styles.makeCard}>
      <div className={styles.cardSection}>
        <div className={styles.card}>
          {selectBook.length > 0 && selectBook[0].thumbnail !== '' ? (
            <img className={styles.bookImg} src={selectBook[0].thumbnail} alt={`${selectBook[0].title}_img`} />
          ) : (
            <img className={styles.bookImg} src={noImage} alt='no img' />
          )}
          <p>{selectBook[0].title}</p>
          <p>{selectBook[0].authors}</p>
          <p>{selectBook[0].star}</p>
          <div className={styles.phrase}>구절</div>
          <div className={styles.comment}>코멘트</div>
        </div>
      </div>
      <div className={styles.makeSection}>여기는 꾸미기</div>
    </div>
  )
}

export default MakeCard
