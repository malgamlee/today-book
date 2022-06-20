import { CartIcon, HeartIcon } from 'assets/svgs'
import { useQuery } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getSearchListApi } from 'services/bookSearchApi'
import styles from './detail.module.scss'
import cx from 'classnames'
import { BookList } from 'components'
import { useState, MouseEvent, useEffect } from 'react'
import { useRecoil } from 'hooks/state'
import { cartStoreState, likeStoreState } from 'states/storeState'
import { inputValue, searchValue } from 'states/inputSearchValue'
import { SearchStructure } from 'types/searchStructure'
import store from 'store'

const Detail = () => {
  const { paramValue } = useParams()
  const [isInCart, setIsInCart] = useState(false)
  const [isInLike, setIsInLike] = useState(false)
  const [cartStore, setCartStore] = useRecoil(cartStoreState)
  const [likeStore, setLikeStore] = useRecoil(likeStoreState)
  const [, setSearch] = useRecoil(searchValue)
  const [, setInput] = useRecoil(inputValue)
  const navigate = useNavigate()

  const { data } = useQuery(
    ['getSearchListApi', paramValue],
    () => getSearchListApi(paramValue, 1).then((res) => res.data),
    {
      enabled: !!paramValue,
    }
  )

  const handleClickBtn = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget.dataset
    if (value === undefined) return
    addRemoveBook(value)
  }

  const addRemoveBook = (value: string) => {
    const storeData = store.get(value)
    const checkIsIn = value === 'cartStore' ? isInCart : isInLike
    const setCheckIsIn = value === 'cartStore' ? setIsInCart : setIsInLike

    if (!checkIsIn) {
      if (storeData.length > 0) {
        const tempData = storeData.filter((item: SearchStructure) => item.isbn !== data.documents[0].isbn)
        store.set(value, [...tempData, data.documents[0]])
      } else {
        store.set(value, [data.documents[0]])
      }
      setCheckIsIn(true)
    } else {
      store.set(
        value,
        storeData.filter((item: SearchStructure) => item.isbn !== data.documents[0].isbn)
      )
      setCheckIsIn(false)
    }
    if (value === 'cartStore') setCartStore(store.get(value))
    else setLikeStore(store.get(value))
  }

  useEffect(() => {
    if (data === undefined) return
    const checkLike = likeStore.filter((item: { isbn: string }) => item.isbn === data.documents[0].isbn)
    console.log(checkLike)
    if (checkLike.length > 0) setIsInLike(true)
    else setIsInLike(false)
  }, [data, likeStore])

  useEffect(() => {
    if (data === undefined) return
    const checkCart = cartStore.filter((item) => item.isbn === data.documents[0].isbn)
    if (checkCart.length > 0) setIsInCart(true)
    else setIsInCart(false)
  }, [cartStore, data])
  return (
    <div className={styles.detail}>
      {data && (
        <div>
          <div className={styles.book}>
            <img
              key={data.documents[0].isbn}
              className={styles.bookImg}
              src={data.documents[0].thumbnail}
              alt={`${data.documents[0].title}_img`}
            />
            <div className={styles.contents}>
              <div className={styles.bookTitle}>
                <div className={styles.title}>{data.documents[0].title}</div>
                <div className={styles.author}>{data.documents[0].authors} 저</div>
                <div className={styles.author}>
                  {data.documents[0].publisher} 출판 ({data.documents[0].datetime.split('T')[0].replaceAll('-', '. ')})
                </div>
              </div>
              <div className={styles.buttonWrapper}>
                <button
                  type='button'
                  data-value='likeStore'
                  onClick={handleClickBtn}
                  className={cx(styles.smallBtn, { [styles.isInLike]: isInLike })}
                >
                  <HeartIcon className={styles.icon} />
                  <p>좋아요</p>
                </button>
                <button
                  type='button'
                  data-value='cartStore'
                  onClick={handleClickBtn}
                  className={cx(styles.smallBtn, { [styles.isInLike]: isInCart })}
                >
                  <CartIcon className={styles.icon} />
                  <p>장바구니</p>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.partTitle}>작품 소개</div>
          <div className={styles.explain}>
            {data.documents[0].contents} ...<a href={data.documents[0].url}>더보기</a>
          </div>
          <div className={styles.partTitle}>
            저자의 다른 도서
            <Link to={`../searchresult/${data.documents[0].authors}`}>+ 더보기</Link>
          </div>
          <BookList search={data.documents[0].authors} title={data.documents[0].title} next={false} />
        </div>
      )}
    </div>
  )
}

export default Detail
