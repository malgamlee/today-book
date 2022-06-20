import { Route, Routes } from 'react-router-dom'
import styles from './event.module.scss'

const Event = () => {
  return (
    <div className={styles.event}>
      <div className={styles.banner}>
        <div className={styles.content}>
          <div className={styles.contentLeft}>
            <div className={styles.title}>읽 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;은 책,</div>
            <div className={styles.title}>읽고 싶은 책</div>
            <div className={styles.under}>모두와 공유해보세요.</div>
          </div>
          <div className={styles.contentRight}>여긴 이미지</div>
        </div>
        <div>내가 읽고 싶은 책, 내가 읽었던 책을 담은 나만의 책 카드를 만들어보세요!</div>
        <button className={styles.goBtn} type='button'>
          시작하기
        </button>
      </div>
      {/* <Routes>
        <Route element={<Layout />}>
          <Route index element={<NewMain />} />
          <Route path='event' element={<Event />} />
        </Route>
      </Routes> */}
    </div>
  )
}

export default Event
