import styles from './bookItem.module.scss'
import { RatingStructure, SearchStructure } from 'types/searchStructure'
import { Link } from 'react-router-dom'
import noImage from 'assets/images/noImage.png'
import store from 'store'

interface Props {
  itemList: Array<SearchStructure>
  storeName: string
  title: string
  isLink: boolean
}

const BookItem = ({ itemList, storeName, title, isLink }: Props) => {
  let storeData = []

  if (storeName !== '') storeData = store.get(storeName)
  const bookItems =
    itemList.length > 0 &&
    itemList
      .filter((item: SearchStructure) => item.title !== title)
      .map((item: SearchStructure) => (
        <li key={item.isbn} className={styles.item}>
          {isLink ? (
            <Link to={`../detail/${item.publisher} ${item.title}`}>
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
      <Link to={`../detail/${item.publisher} ${item.title}`}>
        {item.thumbnail === '' ? (
          <img className={styles.bookImg} src={noImage} alt={item.thumbnail} />
        ) : (
          <img className={styles.bookImg} src={item.thumbnail} alt={`${item.title}_img`} />
        )}
        <div className={styles.bookTitle}>
          <p>{item.title}</p>
          {storeName === 'ratingStore' ? <p>평가함 ★{item.star}</p> : ''}
        </div>
      </Link>
    </li>
  ))
  return <ul className={styles.bookList}>{storeName === '' ? bookItems : storeItems}</ul>
}

export default BookItem
