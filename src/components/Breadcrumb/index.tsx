import { Link } from 'react-router-dom'
import styles from './breadcrumb.module.scss'
import cx from 'classnames'

interface Props {
  pageList: Array<Array<string>>
}

const Breadcrumb = ({ pageList }: Props) => {
  const isLast = (index: number) => {
    return index === pageList.length - 1
  }

  return (
    <ol className={styles.breadcrumb}>
      {pageList.map((item, idx) => {
        const now = isLast(idx)
        return (
          <li key={item[0]}>
            <Link to={item[1]} className={cx(styles.page, { [styles.now]: now })}>
              <p>{item[0]}</p>
              <p>{now ? '' : '>'}</p>
            </Link>
          </li>
        )
      })}
    </ol>
  )
}

export default Breadcrumb
