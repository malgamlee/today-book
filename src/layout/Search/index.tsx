import { ChangeEvent, FormEvent, MouseEvent, useMemo, Dispatch, useEffect, useRef, BaseSyntheticEvent } from 'react'
import { CloseIcon, LeftArrowIcon, SearchIcon } from 'assets/svgs'
import styles from './search.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { debounce } from 'lodash'
import { useRecoil } from 'hooks/state'
import { inputValue, searchListOpen, searchValue } from 'states/inputSearchValue'
import { useQuery } from 'react-query'
import { getSearchListApi } from 'services/bookSearchApi'
import { SearchStructure } from 'types/searchStructure'
import store from 'store'
import cx from 'classnames'

interface Props {
  searchOpen: boolean
  setSearchOpen: Dispatch<React.SetStateAction<boolean>>
}

const Search = ({ searchOpen, setSearchOpen }: Props) => {
  const navigate = useNavigate()
  const [input, setInput] = useRecoil(inputValue)
  const [search, setSearch] = useRecoil(searchValue)
  const [isOpen, setIsOpen] = useRecoil(searchListOpen)

  const searchStore = store.get('searchStore')

  const debounceSearch = useMemo(
    () =>
      debounce((value) => {
        setSearch(value)
      }, 1000),
    [setSearch]
  )
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setInput(value)
    debounceSearch(value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchOpen(false)
    navigate(`searchresult/${input}`)
    setInput('')
    let searchStoreArray = store.get('searchStore')
    const tmpArray = searchStoreArray.filter((item: string) => item !== input)
    searchStoreArray = [...tmpArray, input]
    store.set('searchStore', searchStoreArray)
  }

  const { data } = useQuery(
    ['getSearchListApi', search, input],
    () => getSearchListApi(search, 1).then((res) => res.data),
    {
      enabled: !!search,
    }
  )

  const handleInputClick = () => {
    setInput('')
    setSearch('')
  }

  const handleClickInput = () => {
    setIsOpen('true')
  }

  const handleSearchClick = () => {
    setSearchOpen(false)
  }

  const deleteRecentSearch = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget.dataset
    if (value === undefined) return
    store.set('searchStore', [])
  }

  const convertAuthor = (authors: Array<string>) => {
    if (!authors) return ''
    if (authors.length === 1) return authors[0]
    const tmpAuthors = authors.join(' ').split(' ')
    if (tmpAuthors.includes(input)) {
      return `${input} 외 ${tmpAuthors.length - 1}명`
    }
    return `${tmpAuthors[0]} 외 ${tmpAuthors.length - 1}명`
  }

  const inputSearchList = data?.documents.map((item: SearchStructure) => (
    <li className={styles.searchItem} key={item.isbn}>
      <Link onClick={handleInputClick} to={`detail/${item.publisher} ${item.title}`} className={styles.searchItemLink}>
        <span className={styles.bookTitle}>{item.title}</span>
        <span className={styles.bookAuthors}>{convertAuthor(item.authors)}</span>
      </Link>
    </li>
  ))

  const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const handleClick = (event: BaseSyntheticEvent | globalThis.MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback()
        }
      }

      document.addEventListener('click', handleClick)

      return () => {
        document.removeEventListener('click', handleClick)
      }
    }, [callback, ref])

    return ref
  }

  const clickRef = useOutsideClick(handleSearchClick)

  const recentSearchList = (
    <ul>
      {searchStore.map((item: string, idx: number) => {
        const key = `${idx}_${item}`
        return (
          <li key={key} className={cx(styles.searchItem)}>
            <Link to={`searchresult/${item}`} className={cx(styles.searchItemLink)}>
              {item}
              <button className={styles.deleteItem} type='button'>
                <CloseIcon className={styles.icon} />
              </button>
            </Link>
          </li>
        )
      })}
    </ul>
  )

  return (
    <div className={styles.search} ref={clickRef}>
      <div className={styles.searchWrapper}>
        <form className={styles.searchInput} onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='검색어를 입력하세요.'
            onChange={handleChange}
            value={input}
            onClick={handleClickInput}
          />
          <SearchIcon className={styles.icon} />
        </form>
        <div
          className={cx(styles.searchList, {
            [styles.isOpen]: isOpen === 'true',
          })}
        >
          {input ? (
            <ul>{inputSearchList}</ul>
          ) : (
            <div className={styles.recentSearch}>
              <div className={styles.recentWrapper}>
                <p>최근 검색 목록</p>
                <button type='button' className={styles.deleteBtn} onClick={deleteRecentSearch} data-value='all'>
                  검색 기록 삭제
                </button>
              </div>
              {recentSearchList}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search
