import { Dispatch, useEffect, useRef, BaseSyntheticEvent } from 'react'
import styles from './search.module.scss'
import { SearchForm } from 'components'

interface Props {
  searchOpen: boolean
  setSearchOpen: Dispatch<React.SetStateAction<boolean>>
}

const Search = ({ searchOpen, setSearchOpen }: Props) => {
  const handleSearchClick = () => {
    setSearchOpen(false)
  }

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

  return (
    <div className={styles.search} ref={clickRef}>
      <SearchForm setSearchOpen={setSearchOpen} />
    </div>
  )
}

export default Search
