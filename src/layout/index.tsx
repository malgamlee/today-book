import styles from './layout.module.scss'
import { Link, Outlet } from 'react-router-dom'
import { BookIcon, LightModeIcon, PersonIcon, SearchIcon } from 'assets/svgs'
import Search from './Search'
import cx from 'classnames'
import { useState } from 'react'

const Layout = () => {
  const [searchOpen, setSearchOpen] = useState(false)

  const handleSearchClick = () => {
    setSearchOpen(true)
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
            <div className={styles.bottom}>
              <ul>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='recommend'>추천도서</Link>
                </li>
                <li>
                  <Link to='bookcard'>독서카드</Link>
                </li>
                <li>
                  <button type='button' className={styles.searchBtn} onClick={handleSearchClick}>
                    <SearchIcon className={styles.searchIcon} />
                    검색
                  </button>
                </li>
              </ul>
            </div>
            <div className={styles.buttonWrapper}>
              <Link to='mypage' className={styles.myPage}>
                <PersonIcon />
              </Link>
              <button type='button' className={styles.myPage}>
                <LightModeIcon />
              </button>
            </div>
          </div>
          <div className={cx(styles.searchList, { [styles.isOpen]: searchOpen })}>
            <Search searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
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
