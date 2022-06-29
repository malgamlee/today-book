import styles from './layout.module.scss'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './Navbar'

const Layout = () => {
  const [searchOpen, setSearchOpen] = useState<boolean>(false)

  return (
    <div className={styles.layout}>
      <header>
        <Navbar searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      </header>
      <div className={styles.content}>
        <Outlet />
      </div>
      <footer>여기는 푸터</footer>
    </div>
  )
}

export default Layout
