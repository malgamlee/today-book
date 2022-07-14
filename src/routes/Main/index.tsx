import { bestSeller } from 'data/bestSeller'
import { useNavigate } from 'react-router-dom'
import styles from './main.module.scss'
import { RowBookList } from 'components/RowBookList'
import { BookIcon } from 'assets/svgs'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Main = () => {
  const navigate = useNavigate()
  const handleEventClick = () => {
    navigate('bookcard')
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
  }

  return (
    <div className={styles.main}>
      <div className={styles.banner}>
        <div className={styles.left}>
          <div className={styles.title}>
            <p>어제&nbsp;</p> 읽은 책
          </div>
          <div className={styles.title}>
            <p>오늘&nbsp;</p> 읽은 책
          </div>
          <div className={styles.title}>
            <p>내가&nbsp;</p> 읽은 책
          </div>
          <div className={styles.under}>모두와 공유해보세요.</div>
          <button className={styles.goBtn} type='button' onClick={handleEventClick}>
            참여하기
          </button>
        </div>
        <div className={styles.right}>
          <BookIcon className={styles.icon} />
        </div>
      </div>
      <div className={styles.section}>
        베스트셀러
        <RowBookList bookList={bestSeller} />
      </div>
      <div className={styles.test}>
        <h2> Responsive </h2>
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>7</h3>
          </div>
          <div>
            <h3>8</h3>
          </div>
        </Slider>
      </div>
    </div>
  )
}

export default Main
