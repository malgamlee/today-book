import ModalPortal from '.'
import styles from './modal.module.scss'
import cx from 'classnames'
import { useRecoil } from 'hooks/state'
import { bookCardValue } from 'states/inputSearchValue'
import store from 'store'
import { RatingStructure } from 'types/searchStructure'
import noImage from 'assets/images/noImage.png'
import { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: string
  setOnModal: (state: boolean) => void
  onModal: boolean
  multiple: boolean
}

const ModalFrame = ({ children, setOnModal, onModal, multiple }: Props) => {
  const navigate = useNavigate()
  const [bookIsbn, setBookIsbn] = useRecoil(bookCardValue)
  const ratingData = store.get('ratingStore')
  const selectBook = ratingData.filter((item: RatingStructure) => item.isbn === bookIsbn)

  const handleClick = (e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLDivElement>) => {
    const { type } = e.currentTarget.dataset
    setOnModal(false)
    if (type === 'next') {
      navigate(`../bookcard/makecard/${bookIsbn}`)
    }
    if (type !== '') {
      setBookIsbn('')
    }
  }

  return (
    <ModalPortal>
      <div className={cx(styles.modalframe, { [styles.showModal]: onModal })} role='presentation' onClick={handleClick}>
        <div className={styles.modalBox}>
          {multiple ? (
            <div className={styles.content}>
              {selectBook.length > 0 && selectBook[0].thumbnail !== '' ? (
                <img className={styles.bookImg} src={selectBook[0].thumbnail} alt={`${selectBook[0].title}_img`} />
              ) : (
                <img className={styles.bookImg} src={noImage} alt='no img' />
              )}
              <div className={styles.modalcontents}>
                <p>{children}</p>
                <div className={styles.buttonWapper}>
                  <button
                    className={cx(styles.button, styles.cancel)}
                    type='button'
                    onClick={handleClick}
                    data-type='cancel'
                  >
                    닫기
                  </button>
                  <button
                    className={cx(styles.button, styles.next)}
                    type='button'
                    onClick={handleClick}
                    data-type='next'
                  >
                    확인
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.content}>
              {children}
              <button className='close' type='button' onClick={handleClick}>
                X
              </button>
            </div>
          )}
        </div>
      </div>
    </ModalPortal>
  )
}

export default ModalFrame
