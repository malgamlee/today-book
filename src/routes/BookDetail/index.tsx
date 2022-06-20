import { MouseEvent, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoil } from 'hooks/state'
import store from 'store'
import styles from './bookDetail.module.scss'

import { getSearchListApi } from 'services/bookSearchApi'
import { SearchStructure } from 'types/searchStructure'
import { cartStoreState, likeStoreState } from 'states/storeState'
import { inputValue, searchValue } from 'states/inputSearchValue'

import { NoDataPage, Loading, TopNavBar, BookList } from 'components'

import ButtonWrap from './ButtonWrap'
import noImage from 'assets/images/noImage.png'

const BookDetail = () => {
  const { paramValue } = useParams()
  const [isInCart, setIsInCart] = useState(false)
  const [isInLike, setIsInLike] = useState(false)
  const [cartStore, setCartStore] = useRecoil(cartStoreState)
  const [likeStore, setLikeStore] = useRecoil(likeStoreState)
  const [, setSearch] = useRecoil(searchValue)
  const [, setInput] = useRecoil(inputValue)
  const navigate = useNavigate()

  useEffect(() => {
    setSearch('')
    setInput('')
  }, [setInput, setSearch])

  const { data, isLoading } = useQuery(
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

  const loading = isLoading ? (
    <Loading />
  ) : (
    <NoDataPage type='announcement' noDataInfo={`검색하신 '${paramValue}'에 대한 정보가 없습니다.`} />
  )

  const clickMoreBooks = () => {
    navigate(`../searchresult/${data.documents[0].authors}`)
  }

  useEffect(() => {
    if (data === undefined) return
    const checkLike = likeStore.filter((item: { isbn: string }) => item.isbn === data.documents[0].isbn)
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
    <div className={styles.bookDetail}>
      <TopNavBar title='상세정보' />
      {data && data.documents.length > 0 ? (
        <div className={styles.detailContent}>
          <div className={styles.bookImage}>
            {data.documents[0].thumbnail === '' ? (
              <img className={styles.bookImg} src={noImage} alt={data.documents[0].thumbnail} />
            ) : (
              <img
                className={styles.bookImg}
                src={data.documents[0].thumbnail}
                alt={`${data.documents[0].title}_img`}
              />
            )}
          </div>
          <div className={styles.bookContents}>
            <div className={styles.bookTitle}>{data.documents[0].title}</div>
            <div className={styles.bookAuthor}>
              {data.documents[0].authors} 저 | {data.documents[0].publisher} 출판 (
              {data.documents[0].datetime.split('T')[0].replaceAll('-', '. ')})
            </div>
            <div className={styles.explain}>
              {data.documents[0].contents} ...<a href={data.documents[0].url}>더보기</a>
            </div>
            <div className={styles.otherTitle}>
              저자의 다른 도서
              <button type='button' onClick={clickMoreBooks}>
                + 더보기
              </button>
            </div>
            <BookList search={data.documents[0].authors} title={data.documents[0].title} next={false} />
          </div>
          <div className={styles.buttonWrap}>
            <ButtonWrap
              handleClickBtn={handleClickBtn}
              isInLike={isInLike}
              isInCart={isInCart}
              salePrice={data.documents[0].sale_price}
              price={data.documents[0].price}
            />
          </div>
        </div>
      ) : (
        <div className={styles.loadingIcon}>{loading}</div>
      )}
    </div>
  )
}

export default BookDetail
