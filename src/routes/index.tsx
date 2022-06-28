import { Routes, Route } from 'react-router-dom'
import styles from './routes.module.scss'
import Layout from 'layout'
import SearchResult from './SearchResult'
import store from 'store'
import { themeState } from 'states/system'
import { useRecoil } from 'hooks/state'
import { useEffect } from 'react'
import NewMain from './Main'
import BookCard from './BookCard'
import Recommend from './Recommend'
import Detail from './Detail'
import MyPage from './MyPage'
import SearchBook from './BookCard/SearchBook'
import BookRating from './MyPage/BookRating'
import BookWant from './MyPage/BookWant'
import BookReading from './MyPage/BookReading'

const App = () => {
  const [theme] = useRecoil(themeState)
  if (!store.get('searchStore')) {
    store.set('searchStore', [])
  }
  if (!store.get('likeStore')) {
    store.set('likeStore', [])
  }
  if (!store.get('readingStore')) {
    store.set('readingStore', [])
  }
  if (!store.get('ratingStore')) {
    store.set('ratingStore', [])
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
            <Route path='bookcard' element={<BookCard />} />
            <Route path='bookcard/searchbook' element={<SearchBook />} />
            <Route path='recommend' element={<Recommend />} />
            <Route path='detail/:paramValue' element={<Detail />} />
            <Route path='searchresult/:paramValue' element={<SearchResult />} />
            <Route path='mypage' element={<MyPage />} />
            <Route path='mypage/bookrating' element={<BookRating />} />
            <Route path='mypage/bookwant' element={<BookWant />} />
            <Route path='mypage/bookreading' element={<BookReading />} />
          </Route>
          <Route path='*' element={<div>Not Found</div>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
