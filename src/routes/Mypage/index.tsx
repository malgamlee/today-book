import styles from './myPage.module.scss'
import { TopNavBar } from 'components'
import { PersonIcon } from 'assets/svgs'
import { userInfoState } from 'states/userInfo'
import { useRecoilValue } from 'recoil'
import { MouseEvent } from 'react'
import store from 'store'

import Toggle from './Toggle'
import { cartStoreState, likeStoreState } from 'states/storeState'
import { useRecoil } from 'hooks/state'

const User = () => {
  const userInfo = useRecoilValue(userInfoState)
  const [, setLikeStore] = useRecoil(likeStoreState)
  const [, setCartStore] = useRecoil(cartStoreState)

  const clickDeleteBtn = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget.dataset
    if (value === undefined) return
    store.set(value, [])
    if (value === 'cartStore') setCartStore([])
    else if (value === 'likeStore') setLikeStore([])
  }

  return (
    <div className={styles.myPage}>
      <TopNavBar title='마이페이지' />
      <div className={styles.myPageContent}>
        <div className={styles.wrapper}>
          <div className={styles.userPhoto}>
            <PersonIcon />
          </div>
        </div>
        <div className={styles.myPageDatail}>
          <div className={styles.userName}>
            {userInfo.userName} ({userInfo.userId})
          </div>
          <dl>
            <dt>장바구니</dt>
            <dd>
              <button type='button' className={styles.allDelete} data-value='cartStore' onClick={clickDeleteBtn}>
                전체 삭제
              </button>
            </dd>
          </dl>
          <dl>
            <dt>좋아요</dt>
            <dd>
              <button type='button' className={styles.allDelete} data-value='likeStore' onClick={clickDeleteBtn}>
                전체 삭제
              </button>
            </dd>
          </dl>
          <dl>
            <dt>검색기록</dt>
            <dd>
              <button type='button' className={styles.allDelete} data-value='searchStore' onClick={clickDeleteBtn}>
                전체 삭제
              </button>
            </dd>
          </dl>
          <dl>
            <dt>다크모드</dt>
            <dd>
              <Toggle />
            </dd>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default User
