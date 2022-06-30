import { BookList } from 'components'
import ModalFrame from 'components/ModalPortal/ModalFrame'
import { useRecoil } from 'hooks/state'
import { MouseEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { bookCardValue } from 'states/inputSearchValue'
import styles from './selectBook.module.scss'

const SelectBook = () => {
  const navigate = useNavigate()
  const [onModal, setOnModal] = useState(false)

  const [bookIsbn] = useRecoil(bookCardValue)

  const handleClickBtn = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget.dataset
    if (value === 'mypage') {
      navigate(`../mypage`)
    }
  }

  useEffect(() => {
    if (bookIsbn === '') return
    setOnModal(true)
  }, [bookIsbn])

  return (
    <div className={styles.selectBook}>
      <div className={styles.top}>
        평가한 작품들로 독서 카드를 만들 수 있어요!
        <div className={styles.buttonWrapper}>
          <button type='button' className={styles.btn} onClick={handleClickBtn} data-value='search'>
            책 검색하기
          </button>
          <button type='button' className={styles.btn} onClick={handleClickBtn} data-value='mypage'>
            마이페이지
          </button>
        </div>
      </div>
      <div>제작중입니다</div>
      {/* <ModalFrame setOnModal={setOnModal} onModal={onModal} multiple>
        선택한 작품으로 독서 카드를 제작하시겠습니까?
      </ModalFrame>
      <BookList search='' title='' next={false} isLink={false} storeName='ratingStore' /> */}
    </div>
  )
}

export default SelectBook
