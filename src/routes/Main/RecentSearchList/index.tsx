import styles from './recentSearchList.module.scss'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import store from 'store'

const RecentSearchList = () => {
  const searchStore = store.get('searchStore')
  const recentSearchList = searchStore.map((item: string, idx: number) => {
    const key = `${idx}_${item}`
    return (
      <li key={key} className={cx(styles.recentItem)}>
        <Link to={`searchresult/${item}`} className={cx(styles.recentItemTitle)}>
          {item}
        </Link>
      </li>
    )
  })
  return (
    <div className={styles.recentSearchList}>
      <p>최근 검색어 목록</p>
      {searchStore.length > 0 ? (
        <ul className={styles.recentSearch}>{recentSearchList}</ul>
      ) : (
        <div className={styles.noRecentSearch}>최근 저장된 검색어가 없습니다.</div>
      )}
    </div>
  )
}

export default RecentSearchList
