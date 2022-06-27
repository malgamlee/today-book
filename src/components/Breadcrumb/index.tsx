import { Link } from 'react-router-dom'
import styles from './breadcrumb.module.scss'

interface Props {
  pageList: Array<string>
}

const Breadcrumb = ({ pageList }: Props) => {
  return (
    <ul className='breadcrumb'>
      {pageList.map((item) => (
        <li key={item}>
          <Link to='/'>Home</Link>
        </li>
      ))}
    </ul>
  )
}

export default Breadcrumb
