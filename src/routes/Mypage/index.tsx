import styles from './myPage.module.scss'
import { Link } from 'react-router-dom'
import store from 'store'
import Breadcrumb from 'components/Breadcrumb'
import cx from 'classnames'
import { ReadingIcon, StarIcon, WantToReadIcon } from 'assets/svgs'

const MyPage = () => {
  const ratingData = store.get('ratingStore')
  const readingData = store.get('readingStore')
  const likeData = store.get('likeStore')

  const pageList = [['마이페이지', '../mypage']]

  return (
    <div className={styles.myPage}>
      <Breadcrumb pageList={pageList} />
      <div className={styles.buttonWrapper}>
        <Link to='bookrating'>
          <div className={cx(styles.button, styles.rating)}>
            <div className={styles.top}>
              <p>평가</p>
              <p>{ratingData.length}</p>
            </div>
            <StarIcon className={styles.icon} />
          </div>
        </Link>
        <Link to='bookwant'>
          <div className={cx(styles.button, styles.like)}>
            <div className={styles.top}>
              <p>읽고싶어요</p>
              <p>{likeData.length}</p>
            </div>
            <WantToReadIcon className={styles.icon} />
          </div>
        </Link>
        <Link to='bookreading'>
          <div className={cx(styles.button, styles.reading)}>
            <div className={styles.top}>
              <p>읽고있어요</p>
              <p>{readingData.length}</p>
            </div>
            <ReadingIcon className={styles.icon} />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default MyPage
