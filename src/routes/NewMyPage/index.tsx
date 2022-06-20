import styles from './myPage.module.scss'
import { useRecoilValue } from 'recoil'
import { likeStoreState } from 'states/storeState'
import { Link } from 'react-router-dom'

const NewMyPage = () => {
  const likeStoreData = useRecoilValue(likeStoreState)
  console.log(likeStoreData)

  return <div>폴딩</div>
}

export default NewMyPage
