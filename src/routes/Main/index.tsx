import styles from './main.module.scss'
import { SearchForm } from 'components'
import { useState } from 'react'

const Main = () => {
  const [menuOpen, setMenuOpen] = useState(true)
  return (
    <div className={styles.main}>
      <div className={styles.title}>오늘 읽은 책을 기록해보세요!</div>
      <SearchForm setSearchOpen={setMenuOpen} />
    </div>
  )
}

export default Main
