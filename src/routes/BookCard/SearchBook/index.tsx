import { SearchIcon } from 'assets/svgs'
import { BookList } from 'components'
import { debounce } from 'lodash'
import { ChangeEvent, FormEvent, useMemo, useState } from 'react'
import styles from './searchBook.module.scss'

const SearchBook = () => {
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setInput(value)
    debounceSearch(value)
  }

  const debounceSearch = useMemo(
    () =>
      debounce((value) => {
        setSearch(value)
      }, 1000),
    [setSearch]
  )

  return (
    <div className={styles.searchBook}>
      <form className={styles.searchInput} onSubmit={handleSubmit}>
        <input type='text' placeholder='검색어를 입력하세요.' onChange={handleChange} value={input} />
        <SearchIcon className={styles.icon} />
      </form>
      <BookList search={search} title='' next isLink={false} storeName='' />
    </div>
  )
}

export default SearchBook
