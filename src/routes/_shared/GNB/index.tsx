import { CartIcon, PersonIcon, HeartIcon } from 'assets/svgs'
import { useNavigate } from 'react-router-dom'
import styles from './gnb.module.scss'
import { MouseEvent } from 'react'
import store from 'store'

const GNB = () => {
  const navigate = useNavigate()
  const storeData = store.get('readingStore')

  const onLogoClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget.dataset
    if (value === 'logo') navigate('/')
    else if (value === 'cart') navigate('/cart')
    else if (value === 'like') navigate('/wishList')
    else navigate('/user')
  }
  return (
    <nav className={styles.gnb}>
      <button onClick={onLogoClick} type='button' data-value='logo' className={styles.title}>
        RADI BOOKS
      </button>
      <div>
        <button type='button' className={styles.button} onClick={onLogoClick} data-value='cart'>
          <CartIcon className={styles.svg} />
          <div className={styles.countreadingStore}>{storeData.length}</div>
        </button>
        <button type='button' className={styles.button} onClick={onLogoClick} data-value='like'>
          <HeartIcon className={styles.svg} />
        </button>
        <button type='button' className={styles.button} onClick={onLogoClick} data-value='user'>
          <PersonIcon className={styles.svg} />
        </button>
      </div>
    </nav>
  )
}

export default GNB
