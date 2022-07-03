import { NoDataPage, Loading } from 'components'
import { uniqBy } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { getSearchListApi } from 'services/bookSearchApi'
import { SearchStructure } from 'types/searchStructure'

import styles from './bookList.module.scss'
import BookItem from './BookItem'

interface Props {
  search: string
  title: string
  next: boolean
  isLink: boolean
  storeName: string
}

const BookList = ({ search, title, next, isLink, storeName }: Props) => {
  const [pageNum, setPageNum] = useState(1)
  const [itemList, setItemList] = useState<Array<SearchStructure>>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [moreData, setMoreData] = useState(false)
  const [dataExist, setDataExist] = useState(true)
  const [input, setInput] = useState('')

  const target = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (search !== input) {
      setInput(search)
      setPageNum(1)
      setItemList([])
    }
  }, [search, input])

  useEffect(() => {
    if (search === '') return
    if (pageNum > 1 && search !== input) return
    if (moreData) return
    getSearchListApi(search, pageNum).then((res) => {
      if (res.data.meta.total_count === 0) {
        setDataExist(false)
        return
      }
      setItemList((prev) => uniqBy([...prev, ...res.data.documents], 'isbn'))
      setMoreData(res.data.meta.is_end)
    })
  }, [input, moreData, pageNum, search])

  useEffect(() => {
    let observer: IntersectionObserver
    const getMoreItem = async () => {
      setIsLoaded(true)
      await new Promise((resolve) => {
        setTimeout(resolve, 2500)
      })
      setPageNum((prev) => prev + 1)
      setIsLoaded(false)
    }
    const handleObserve = async ([entry]: IntersectionObserverEntry[]) => {
      if (search === '') return
      if (!next || pageNum === 0 || moreData) return
      if (moreData) return

      if (entry.isIntersecting) {
        observer.unobserve(entry.target)
        await getMoreItem()
        observer.observe(entry.target)
      }
    }
    if (target?.current) {
      observer = new IntersectionObserver(handleObserve, {
        threshold: 0.7,
      })
      observer.observe(target.current)
    }
    return () => observer && observer.disconnect()
  }, [moreData, next, pageNum, search, target])

  return (
    <div className={styles.bookList}>
      {dataExist ? (
        <div>
          <BookItem itemList={itemList} storeName={storeName} title={title} isLink={isLink} />
          <div ref={target}>
            {search && !moreData && isLoaded && (
              <div className={styles.loadingIcon}>
                <Loading />
              </div>
            )}
          </div>
        </div>
      ) : (
        <NoDataPage type='announcement' noDataInfo={`검색하신 '${search}'에 대한 정보가 없습니다.`} />
      )}
    </div>
  )
}

export default BookList
