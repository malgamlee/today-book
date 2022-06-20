import styles from './noDataPage.module.scss'
import { HeartIcon, CartIcon, AnnouncementIcon } from 'assets/svgs'

interface Props {
  type: string
  noDataInfo: string
}

const NoDataPage = ({ type, noDataInfo }: Props) => {
  const iconMatch = {
    announcement: <AnnouncementIcon className={styles.emptyImage} />,
    like: <HeartIcon className={styles.emptyImage} />,
    cart: <CartIcon className={styles.emptyImage} />,
  }[type]

  return (
    <div className={styles.noDataPage}>
      <div className={styles.nobookList}>
        <div>{iconMatch}</div>
        {noDataInfo}
      </div>
    </div>
  )
}

export default NoDataPage
