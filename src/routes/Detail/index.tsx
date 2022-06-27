import { BookmarkIcon, EyeIcon, PlusIcon, StarIcon } from 'assets/svgs'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { getSearchListApi } from 'services/bookSearchApi'
import styles from './detail.module.scss'
import cx from 'classnames'
import { BookList } from 'components'
import { useState, MouseEvent, useEffect } from 'react'
import { useRecoil } from 'hooks/state'
import { readingStoreState, likeStoreState, ratingStoreState } from 'states/storeState'
import { RatingStructure, SearchStructure } from 'types/searchStructure'
import store from 'store'

const Detail = () => {
  const { paramValue } = useParams()
  const [isInReading, setIsInReading] = useState(false)
  const [isInLike, setIsInLike] = useState(false)
  const [readingStore, setreadingStore] = useRecoil(readingStoreState)
  const [likeStore, setLikeStore] = useRecoil(likeStoreState)
  const [ratingStore, setRatingStore] = useRecoil(ratingStoreState)

  const [isHovering, setIsHovering] = useState(0)
  const [ratingStar, setRatingStar] = useState(0)

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
    const checkIsIn = value === 'readingStore' ? isInReading : isInLike
    const setCheckIsIn = value === 'readingStore' ? setIsInReading : setIsInLike

    if (!checkIsIn) {
      if (storeData.length > 0) {
        const tempData = storeData.filter((item: SearchStructure) => item.isbn !== data.documents[0].isbn)
        store.set(value, [...tempData, data.documents[0]])
      } else {
        store.set(value, [data.documents[0]])
      }
      setCheckIsIn(true)
      if (value === 'readingStore' && isInLike) {
        addRemoveBook('likeStore')
      } else if (value === 'likeStore' && isInReading) {
        addRemoveBook('readingStore')
      }
    } else {
      store.set(
        value,
        storeData.filter((item: SearchStructure) => item.isbn !== data.documents[0].isbn)
      )
      setCheckIsIn(false)
    }
    if (value === 'readingStore') setreadingStore(store.get(value))
    else setLikeStore(store.get(value))
  }

  useEffect(() => {
    if (data === undefined) return
    const checkLike = likeStore.filter((item: { isbn: string }) => item.isbn === data.documents[0].isbn)
    if (checkLike.length > 0) setIsInLike(true)
    else setIsInLike(false)
  }, [data, likeStore])

  useEffect(() => {
    if (data === undefined) return
    const checkCart = readingStore.filter((item) => item.isbn === data.documents[0].isbn)
    if (checkCart.length > 0) setIsInReading(true)
    else setIsInReading(false)
  }, [readingStore, data])

  useEffect(() => {
    if (data === undefined) return
    const ratingData = store.get('ratingStore')
    const checkRating = ratingData.filter((item: RatingStructure) => item.isbn === data.documents[0].isbn)
    if (checkRating.length > 0) setRatingStar(checkRating[0].star)
    else setRatingStar(0)
  }, [data])

  const handleMouseOver = (e: MouseEvent<SVGSVGElement>) => {
    setIsHovering(Number(e.currentTarget.dataset.num))
  }
  const handleMouseOut = () => {
    setIsHovering(0)
  }
  const handleClickStar = (e: MouseEvent<SVGSVGElement>) => {
    const { num } = e.currentTarget.dataset
    let ratingData = store.get('ratingStore')
    const ratingObj = data.documents[0]
    let star = 0

    if (ratingStar === 0) {
      setRatingStar(Number(num))
      star = Number(num)
      if (isInLike) {
        addRemoveBook('likeStore')
      } else if (isInReading) {
        addRemoveBook('readingStore')
      }
    } else if (ratingStar !== Number(num)) {
      setRatingStar(Number(num))
      star = Number(num)
    } else {
      setRatingStar(0)
      star = 0
    }

    if (star > 0) {
      ratingObj.star = Number(num)
      ratingData = ratingData.filter((item: RatingStructure) => item.isbn !== data.documents[0].isbn)
      store.set('ratingStore', [...ratingData, ratingObj])
    } else {
      store.set(
        'ratingStore',
        ratingData.filter((item: RatingStructure) => item.isbn !== data.documents[0].isbn)
      )
    }
    setRatingStore(ratingStore)
  }

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
              <div className={styles.buttons}>
                <div className={styles.starWrapper}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <StarIcon
                      className={cx(
                        styles.star,
                        { [styles.ratingStar]: ratingStar > num - 1 && !isHovering },
                        { [styles.isHovering]: isHovering > num - 1 }
                      )}
                      data-num={num}
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                      onClick={handleClickStar}
                      key={num}
                    />
                  ))}
                </div>
                <div className={styles.buttonWrapper}>
                  <button
                    type='button'
                    data-value='likeStore'
                    onClick={handleClickBtn}
                    className={cx(styles.smallBtn, { [styles.isInLike]: isInLike })}
                  >
                    {isInLike ? <BookmarkIcon className={styles.icon} /> : <PlusIcon className={styles.icon} />}
                    <p>읽고싶어요</p>
                  </button>
                  <button
                    type='button'
                    data-value='readingStore'
                    onClick={handleClickBtn}
                    className={cx(styles.smallBtn, { [styles.isInLike]: isInReading })}
                  >
                    <EyeIcon className={styles.icon} />
                    <p>읽고있어요</p>
                  </button>
                </div>
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
          <BookList search={data.documents[0].authors} title={data.documents[0].title} next={false} isLink />
        </div>
      )}
    </div>
  )
}

export default Detail
