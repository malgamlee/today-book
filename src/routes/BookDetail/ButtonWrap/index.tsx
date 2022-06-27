import { HeartIcon, CartIcon } from 'assets/svgs'
import styles from './buttonWrap.module.scss'
import cx from 'classnames'
import { MouseEventHandler } from 'react'

interface Props {
  handleClickBtn: MouseEventHandler<HTMLButtonElement>
  isInLike: boolean
  isInCart: boolean
  price: number
  salePrice: number
}

const ButtonWrap = ({ handleClickBtn, isInLike, isInCart, price, salePrice }: Props) => {
  return (
    <div className={styles.buttonWrapper}>
      <div className={cx(styles.price, { [styles.soldout]: salePrice < 0 })}>
        {salePrice === -1 ? `${price.toLocaleString('ko-KR')} 원` : `${salePrice.toLocaleString('ko-KR')} 원`}
      </div>
      <div className={styles.buttons}>
        <button
          type='button'
          onClick={handleClickBtn}
          data-value='likeStore'
          className={cx(styles.smallBtn, { [styles.isInLike]: isInLike })}
        >
          <HeartIcon className={styles.icon} />
        </button>
        <button
          type='button'
          onClick={handleClickBtn}
          data-value='readingStore'
          className={cx(styles.smallBtn, { [styles.isInCart]: isInCart })}
        >
          <CartIcon className={styles.icon} />
        </button>
        <button
          type='button'
          className={cx(styles.bigBtn, { [styles.soldout]: salePrice < 0 })}
          onClick={handleClickBtn}
          data-value='buyStore'
        >
          {salePrice === -1 ? '품절' : '구매하기'}
        </button>
      </div>
    </div>
  )
}

export default ButtonWrap
