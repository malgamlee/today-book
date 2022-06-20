import styles from './carousel.module.scss'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
  }
  return (
    <div className={styles.carousel}>
      <div>
        <div className={styles.slider}>
          <Slider {...settings}>
            <div className={styles.box1} />
            <div className={styles.box2} />
            <div className={styles.box3} />
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default Carousel
