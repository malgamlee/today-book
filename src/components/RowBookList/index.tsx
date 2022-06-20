import styles from './rowBookList.module.scss'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LeftArrowIcon, RightArrowIcon } from 'assets/svgs'
import cx from 'classnames'

interface Props {
  bookList: { no: number; authors: string[]; thumbnail: string; title: string; isbn: string; publisher: string }[]
}
interface Book {
  no: number
  authors: string[]
  thumbnail: string
  title: string
  isbn: string
  publisher: string
}

export const RowBookList = ({ bookList }: Props) => {
  const [page, setPage] = useState(1)
  const [books, setBooks] = useState<Book[]>([])
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (bookList === undefined) return
    if (page === 1) setBooks(bookList.slice(0, 5))
    else setBooks(bookList.slice(5, 10))
  }, [bookList, page])

  const clickLeft = () => {
    setPage(1)
    setIsActive(false)
  }
  const clickRight = () => {
    setPage(2)
    setIsActive(true)
  }

  return (
    <div className={styles.rowBookList}>
      <button type='button' className={cx(styles.leftBtn, { [styles.active]: isActive })}>
        <LeftArrowIcon className={styles.icon} onClick={clickLeft} />
      </button>
      <ul className={styles.bookList}>
        {books.map((item) => (
          <li className={styles.bookItem} key={item.isbn}>
            <Link to={`../detail/${item.publisher} ${item.title}`} className={styles.item}>
              <img className={styles.image} src={item.thumbnail} alt={`${item.title}_img`} />
              <div className={styles.bookWrapper}>
                <div className={styles.number}>{item.no}</div>
                <div className={styles.explain}>
                  <div className={styles.title}>{item.title}</div>
                  <div className={styles.authors}>{item.authors}</div>
                </div>
              </div>
            </Link>
          </li>
        ))}
        <li />
      </ul>
      <button type='button' className={cx(styles.rightBtn, { [styles.active]: !isActive })}>
        <RightArrowIcon className={styles.icon} onClick={clickRight} />
      </button>
    </div>
  )
}
