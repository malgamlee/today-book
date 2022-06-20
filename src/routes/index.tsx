import { Routes, Route } from 'react-router-dom'
import styles from './routes.module.scss'
import Main from './Main'
import Layout from 'layout'
import BookDetail from './BookDetail'
import Cart from './Cart'
import User from './Mypage'
import WishList from './WishList'
import SearchResult from './SearchResult'
import store from 'store'
import { themeState } from 'states/system'
import { useRecoil } from 'hooks/state'
import { useEffect } from 'react'
import NewMain from './NewMain'
import Event from './Event'
import Recommend from './Recommend'
import Detail from './Detail'
import NewMyPage from './NewMyPage'

const App = () => {
  const [theme] = useRecoil(themeState)
  if (!store.get('searchStore')) {
    store.set('searchStore', [])
  }
  if (!store.get('likeStore')) {
    store.set('likeStore', [])
  }
  if (!store.get('cartStore')) {
    store.set('cartStore', [])
  }

  useEffect(() => {
    document.documentElement.setAttribute('color-theme', theme)
  }, [theme])

  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<NewMain />} />
            <Route path='event' element={<Event />} />
            <Route path='recommend' element={<Recommend />} />
            <Route path='detail/:paramValue' element={<Detail />} />
            <Route path='searchresult/:paramValue' element={<SearchResult />} />
            <Route path='myPage' element={<NewMyPage />} />

            {/* <Route path='search/:paramValue' element={<Search />} /> */}
            {/* <Route path='cart' element={<Cart />} />
            <Route path='user' element={<User />} />
            <Route path='wishList' element={<WishList />} />
            <Route path='bookdetail/:paramValue' element={<BookDetail />} />
            <Route path='searchresult/:paramValue' element={<SearchResult />} /> */}
          </Route>
          <Route path='*' element={<div>Not Found</div>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
