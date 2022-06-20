import styles from './myPage.module.scss'
import { useRecoilValue } from 'recoil'
import { likeStoreState } from 'states/storeState'
import { Link } from 'react-router-dom'
import { RowBookList } from 'components/RowBookList'

const NewMyPage = () => {
  const likeStoreData = useRecoilValue(likeStoreState)
  console.log(likeStoreData)

  return (
    <div>
      <div className={styles.partTitle}>
        저자의 다른 도서
        <Link to='../wishList'>+ 더보기</Link>
      </div>
      {/* <RowBookList bookList={likeStoreData} /> */}
    </div>
  )
}

export default NewMyPage
