import styles from './bookItem.module.scss'
import { RatingStructure, SearchStructure } from 'types/searchStructure'
import { Link } from 'react-router-dom'
import noImage from 'assets/images/noImage.png'
import store from 'store'
import { useRecoil } from 'hooks/state'
import { bookCardValue } from 'states/inputSearchValue'
import { MouseEvent } from 'react'

interface Props {
  itemList: Array<SearchStructure>
  storeName: string
  title: string
  isLink: boolean
}

const BookItem = ({ itemList, storeName, title, isLink }: Props) => {
  let storeData = []
  const [, setBookIsbn] = useRecoil(bookCardValue)

  const handleBookClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { isbn } = e.currentTarget.dataset
    setBookIsbn(String(isbn))
  }

  const filterEscape = (value: string) => String(value).replaceAll('/', '%2F')

  if (storeName !== '') storeData = store.get(storeName)
  const bookItems =
    itemList.length > 0 &&
    itemList
      .filter((item: SearchStructure) => item.title !== title)
      .map((item: SearchStructure) => (
        <li key={item.isbn} className={styles.item}>
          {isLink ? (
            <Link to={`../detail/${item.publisher} ${filterEscape(item.title)}`}>
              {item.thumbnail === '' ? (
                <img className={styles.bookImg} src={noImage} alt={item.thumbnail} />
              ) : (
                <img className={styles.bookImg} src={item.thumbnail} alt={`${item.title}_img`} />
              )}
              <div className={styles.bookTitle}>{item.title}</div>
            </Link>
          ) : (
            <div>
              {item.thumbnail === '' ? (
                <img className={styles.bookImg} src={noImage} alt={item.thumbnail} />
              ) : (
                <img className={styles.bookImg} src={item.thumbnail} alt={`${item.title}_img`} />
              )}
              <div className={styles.bookTitle}>{item.title}</div>
            </div>
          )}
        </li>
      ))

  const storeItems = storeData.map((item: RatingStructure) => (
    <li key={item.isbn} className={styles.item}>
      {isLink ? (
        <Link to={`../detail/${item.publisher} ${filterEscape(item.title)}`}>
          {item.thumbnail === '' ? (
            <img className={styles.bookImg} src={noImage} alt={item.thumbnail} />
          ) : (
            <img className={styles.bookImg} src={item.thumbnail} alt={`${item.title}_img`} />
          )}
          <div className={styles.bookTitle}>
            <p>{item.title}</p>
            {storeName === 'ratingStore' ? <p className={styles.rating}>평가함 ★{item.star}</p> : ''}
          </div>
        </Link>
      ) : (
        <button type='button' onClick={handleBookClick} data-isbn={item.isbn}>
          {item.thumbnail === '' ? (
            <img className={styles.bookImg} src={noImage} alt={item.thumbnail} />
          ) : (
            <img className={styles.bookImg} src={item.thumbnail} alt={`${item.title}_img`} />
          )}
          <div className={styles.bookTitle}>
            <p>{item.title}</p>
            {storeName === 'ratingStore' ? <p className={styles.rating}>평가함 ★{item.star}</p> : ''}
          </div>
        </button>
      )}
    </li>
  ))
  return <ul className={styles.bookList}>{storeName === '' ? bookItems : storeItems}</ul>
}

export default BookItem
