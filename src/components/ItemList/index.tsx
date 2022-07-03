import styles from './itemList.module.scss'
import { MouseEvent } from 'react'
import { useRecoil } from 'hooks/state'
import { readingStoreState, likeStoreState } from 'states/storeState'
import store from 'store'
import { SearchStructure } from 'types/searchStructure'
import { inputValue, searchValue } from 'states/inputSearchValue'
import cx from 'classnames'
import noImage from 'assets/images/noImage.png'
import { Link } from 'react-router-dom'

interface Props {
  item: SearchStructure
  type: string
}

const ItemList = ({ item, type }: Props) => {
  const [readingStoreData, setreadingStoreData] = useRecoil(readingStoreState)
  const [likeStoreData, setLikeStoreData] = useRecoil(likeStoreState)
  const [, setInput] = useRecoil(inputValue)
  const [, setSearch] = useRecoil(searchValue)
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget.dataset
    const { className } = e.currentTarget

    if (className.split('_')[1] === 'deleteBtn') {
      if (type === 'readingStore') {
        store.set(
          type,
          readingStoreData.filter((data: SearchStructure) => data.isbn !== value)
        )
        setreadingStoreData(store.get(type))
      } else {
        store.set(
          'likeStore',
          likeStoreData.filter((data: SearchStructure) => data.isbn !== value)
        )
        setLikeStoreData(store.get(type))
        setInput('')
        setSearch('')
      }
    }
  }

  return (
    <li className={styles.itemWrapper} key={item.isbn}>
      <div className={styles.item}>
        <Link to={`bookdetail/${item.publisher} ${item.title}`} className={cx(styles.recentItemTitle)}>
          {item.thumbnail === '' ? (
            <img className={styles.image} src={noImage} alt={item.thumbnail} />
          ) : (
            <img className={styles.image} src={item.thumbnail} alt={`${item.title}_img`} />
          )}
        </Link>
        <div className={styles.content}>
          <div className={styles.bookWrap}>
            <div className={styles.bookTitle}>{item.title}</div>
            <div className={styles.bookAuthor}>{item.authors}</div>
            <div className={cx(styles.bookPrice, { [styles.isSoldout]: item.sale_price === -1 })}>
              {(item.sale_price === -1 ? item.price : item.sale_price).toLocaleString('ko-KR')}원
            </div>
          </div>
          <div className={styles.buttonWrap}>
            <button type='button' className={styles.deleteBtn} data-value={item.isbn} onClick={handleClick}>
              삭제
            </button>
            <button
              type='button'
              className={cx(styles.buyBtn, { [styles.isSoldout]: item.sale_price === -1 })}
              data-value={item.isbn}
              onClick={handleClick}
            >
              {item.sale_price === -1 ? '품절' : '구매'}
            </button>
          </div>
        </div>
      </div>
      {item.sale_price === -1 && <p className={styles.soldoutMsg}>품절된 상품입니다.</p>}
    </li>
  )
}

export default ItemList
