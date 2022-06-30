import styles from './layout.module.scss'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './Navbar'
import { BookIcon, GithubIcon } from 'assets/svgs'

const Layout = () => {
  const [searchOpen, setSearchOpen] = useState<boolean>(false)
  const handleClickGithub = () => {
    window.open('https://github.com/malgamlee')
  }
  return (
    <div className={styles.layout}>
      <header>
        <Navbar searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      </header>
      <div className={styles.content}>
        <Outlet />
      </div>
      <footer>
        <div className={styles.footerLogo}>
          <BookIcon className={styles.bookIcon} />
          <p>오늘의책</p>
        </div>
        <button type='button' className={styles.githubBtn} onClick={handleClickGithub}>
          <GithubIcon className={styles.gitbhubIcon} />
          <p>malgamlee</p>
        </button>
      </footer>
    </div>
  )
}

export default Layout
