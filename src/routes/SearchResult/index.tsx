import { BookList } from 'components'
import { useParams } from 'react-router-dom'
import styles from './searchResult.module.scss'

const SearchResult = () => {
  const { paramValue } = useParams()

  if (paramValue === undefined) return <div>error</div>

  return (
    <div className={styles.searchResult}>
      <div className={styles.searchParam}>&apos;{paramValue}&apos; 검색결과</div>
      <BookList search={paramValue} title='' next />
    </div>
  )
}

export default SearchResult
