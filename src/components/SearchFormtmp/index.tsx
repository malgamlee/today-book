import styles from './searchFormtmp.module.scss'
import { SearchIcon, RemoveIcon } from 'assets/svgs'
import { ChangeEvent, Dispatch, SetStateAction, useMemo, FormEvent } from 'react'
import { debounce } from 'lodash'
import store from 'store'

import cx from 'classnames'

import { inputValue, searchValue } from 'states/inputSearchValue'
import { useRecoil } from 'hooks/state'
import { useNavigate } from 'react-router-dom'

interface Props {
  isPopup: boolean
  setIsSearchListShow: Dispatch<SetStateAction<boolean>>
}

const SearchFormtmp = ({ isPopup, setIsSearchListShow }: Props) => {
  const navigate = useNavigate()
  const [input, setInput] = useRecoil(inputValue)
  const [, setSearch] = useRecoil(searchValue)
  const debounceSearch = useMemo(
    () =>
      debounce((value) => {
        setSearch(value)
      }, 1000),
    [setSearch]
  )
  const handleInputClick = () => {
    if (isPopup) return
    setIsSearchListShow((prev) => !prev)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setInput(value)
    debounceSearch(value)
  }

  const handleCancelClick = () => {
    setIsSearchListShow((prev) => !prev)
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

  const handleRemoveInputClick = () => {
    setInput('')
    setSearch('')
  }

  return (
    <div className={styles.searchForm}>
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <SearchIcon className={styles.icon} />
          <input className={styles.input} onClick={handleInputClick} onChange={handleChange} value={input} />
          {isPopup && (
            <button type='button' onClick={handleRemoveInputClick} className={styles.removeBtn}>
              <RemoveIcon className={styles.removeIcon} />
            </button>
          )}
        </form>
        <button
          className={cx(styles.cancelBtn, { [styles.isExist]: isPopup })}
          type='button'
          onClick={handleCancelClick}
        >
          취소
        </button>
      </div>
    </div>
  )
}

export default SearchFormtmp
