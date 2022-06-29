import { SetStateAction, Dispatch } from 'react'
import { Link } from 'react-router-dom'
import Search from 'layout/Search'
import styles from './navbar.module.scss'
import cx from 'classnames'
import { BookIcon, LightModeIcon, PersonIcon, SearchIcon } from 'assets/svgs'

interface Props {
  searchOpen: boolean
  setSearchOpen: Dispatch<SetStateAction<boolean>>
}

const Navbar = ({ searchOpen, setSearchOpen }: Props) => {
  const handleSearchClick = () => {
    setSearchOpen(true)
  }
  return (
    <nav>
      <div className={styles.navbar}>
        <div className={styles.top}>
          <Link to='/' className={styles.mainLogo}>
            오늘의책
            <BookIcon className={styles.bookIcon} />
          </Link>
          <ul className={styles.bottom}>
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
          <div className={styles.buttonWrapper}>
            <Link to='mypage' className={styles.myPage}>
              <PersonIcon />
            </Link>
            <button type='button' className={styles.myPage}>
              <LightModeIcon />
            </button>
          </div>
        </div>
      </div>
      <div className={cx(styles.searchList, { [styles.isOpen]: searchOpen })}>
        <Search searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      </div>
    </nav>
  )
}

export default Navbar
