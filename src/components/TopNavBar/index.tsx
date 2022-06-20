import { LeftIcon } from 'assets/svgs'
import { useNavigate } from 'react-router-dom'
import styles from './topNavBar.module.scss'

interface Props {
  title: string
}

const TopNavBar = ({ title }: Props) => {
  const navigate = useNavigate()

  const onBackClick = () => {
    navigate('/')
  }
  return (
    <div className={styles.cartContent}>
      <div className={styles.title}>
        <button type='button' onClick={onBackClick} className={styles.backBtn}>
          <LeftIcon className={styles.icon} />
        </button>
        <p>{title}</p>
      </div>
    </div>
  )
}

export default TopNavBar
