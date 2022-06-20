import styles from './layout.module.scss'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { BookIcon, PersonIcon, SearchIcon } from 'assets/svgs'
import { ChangeEvent, FormEvent, MouseEvent, useMemo } from 'react'
import { debounce } from 'lodash'
import { useRecoil } from 'hooks/state'
import { inputValue, searchListOpen, searchValue } from 'states/inputSearchValue'
import { useQuery } from 'react-query'
import { getSearchListApi } from 'services/bookSearchApi'
import { SearchStructure } from 'types/searchStructure'
import cx from 'classnames'
import store from 'store'

const Layout = () => {
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
  const inputSearchList = data?.documents.map((item: SearchStructure) => (
    <li className={styles.searchItem} key={item.isbn}>
      <Link onClick={handleInputClick} to={`detail/${item.publisher} ${item.title}`} className={styles.searchItemLink}>
        <span className={styles.bookTitle}>{item.title}</span>
        <span className={styles.bookAuthors}>{item.authors}</span>
      </Link>
    </li>
  ))

  const recentSearchList =
    searchStore.length > 0 ? (
      <ul>
        {searchStore.map((item: string, idx: number) => {
          const key = `${idx}_${item}`
          return (
            <li key={key} className={cx(styles.searchItem)}>
              <Link to={`searchresult/${item}`} className={cx(styles.searchItemLink)}>
                {item}
              </Link>
            </li>
          )
        })}
      </ul>
    ) : (
      <div className={styles.noRecentSearch}>최근 검색 목록이 없습니다.</div>
    )

  const handleClickInput = () => {
    setIsOpen('true')
  }

  const deleteRecentSearch = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget.dataset
    if (value === undefined) return
    store.set('searchStore', [])
  }

  return (
    <div className={styles.layout}>
      <header>
        <nav>
          <div className={styles.top}>
            <Link to='/' className={styles.mainLogo}>
              오늘의책
              <BookIcon className={styles.bookIcon} />
            </Link>
            <div className={styles.search}>
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
              <div className={cx(styles.searchList, { [styles.isOpen]: isOpen === 'true' })}>
                {input ? (
                  <ul>{inputSearchList}</ul>
                ) : (
                  <div className={styles.recentSearch}>
                    <p>최근 검색 목록</p>
                    {recentSearchList}
                    <div className={styles.buttonWrapper}>
                      <button type='button'>검색 기록 기능 끄기</button>
                      <button type='button' onClick={deleteRecentSearch} data-value='all'>
                        검색 기록 삭제
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.buttonWrapper}>
              <Link to='myPage' className={styles.myPage}>
                <PersonIcon />
              </Link>
              <button type='button'>다크모드</button>
            </div>
          </div>
          <div className={styles.bottom}>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='recommend'>추천도서</Link>
              </li>
              <li>
                <Link to='event'>이벤트</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <div className={styles.content}>
        <Outlet />
      </div>
      <footer>여기는 푸터</footer>
    </div>
  )
}

export default Layout
