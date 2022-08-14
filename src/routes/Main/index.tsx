import styles from './main.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { BookIcon } from 'assets/svgs'

const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        오늘의 책
        <div className={styles.titleIcon}>
          <BookIcon />
        </div>
      </div>
    </div>
  )
}

export default Main
