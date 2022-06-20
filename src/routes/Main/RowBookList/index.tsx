import styles from './rowBookList.module.scss'
import { Link } from 'react-router-dom'

interface Props {
  bookList: { no: number; authors: string[]; thumbnail: string; title: string; isbn: string; publisher: string }[]
}

export const RowBookList = ({ bookList }: Props) => {
  return (
    <ul className={styles.bookList}>
      {bookList.map((item, idx) => (
        <li className={styles.bookItem} key={item.no}>
          <Link to={`bookdetail/${item.publisher} ${item.title}`} className={styles.item}>
            <img className={styles.image} src={item.thumbnail} alt={`${item.title}_img`} />
            <div className={styles.bookWrapper}>
              <div className={styles.number}>{idx + 1}</div>
              <div className={styles.explain}>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.authors}>{item.authors}</div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
