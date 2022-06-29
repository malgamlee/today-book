import styles from './notFound.module.scss'

const NotFound = () => {
  return (
    <div className={styles.notfound}>
      <div className={styles.notfoundLogo}>
        <p className={styles.number}>404</p>
        <p>Not Found</p>
      </div>
      <p className={styles.explain}>
        ❌ 잘못된 경로입니다! ❌
        <br />
        상단의 📚오늘의책📚 로고를 클릭해서 메인 페이지로 돌아가세요 😇
      </p>
    </div>
  )
}

export default NotFound
