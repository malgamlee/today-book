import { SetStateAction, Dispatch, useState, MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Search from 'layout/Search'
import styles from './navbar.module.scss'
import cx from 'classnames'
import { BookIcon, LightModeIcon, MenuIcon, PersonIcon, SearchIcon } from 'assets/svgs'

interface Props {
  searchOpen: boolean
  setSearchOpen: Dispatch<SetStateAction<boolean>>
}

const Navbar = ({ searchOpen, setSearchOpen }: Props) => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const handleSearchClick = (event: MouseEvent<HTMLButtonElement>) => {
    setSearchOpen(true)
    setMenuOpen(false)
    event.stopPropagation()
  }

  const handleMenuClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget.dataset
    setMenuOpen((prev) => !prev)
    if (value === 'menu') return
    navigate(`../${value}`)
  }
  return (
    <nav>
      <div className={styles.navbar}>
        <Link to='/' className={styles.mainLogo}>
          오늘의책
          <BookIcon className={styles.bookIcon} />
        </Link>
        <div className={styles.buttonWrapper}>
          <button type='button' className={styles.myPage} onClick={handleSearchClick}>
            <SearchIcon />
          </button>
          <Link to='mypage' className={styles.myPage}>
            <PersonIcon />
          </Link>
          <button type='button' className={styles.myPage}>
            <LightModeIcon />
          </button>
          <button type='button' className={styles.menuBtn} onClick={handleMenuClick} data-value='menu'>
            <MenuIcon className={styles.menuIcon} />
          </button>
        </div>
      </div>
      <div className={cx(styles.mobileMenu, { [styles.menuOpen]: menuOpen })}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <button type='button' className={styles.searchBtn} onClick={handleSearchClick}>
              <SearchIcon className={styles.searchIcon} />
              검색
            </button>
          </li>
          <li className={styles.menuItem}>
            <button type='button' className={styles.menu} onClick={handleMenuClick} data-value='mypage'>
              <PersonIcon className={styles.personIcon} />
              마이페이지
            </button>
          </li>
          <li className={styles.menuItem}>
            <button type='button' className={styles.menu} onClick={handleMenuClick} data-value='mypage'>
              <LightModeIcon className={styles.personIcon} />
              다크모드 설정
            </button>
          </li>
        </ul>
      </div>
      <div className={cx(styles.searchList, { [styles.searchOpen]: searchOpen })}>
        <Search searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      </div>
    </nav>
  )
}

export default Navbar
