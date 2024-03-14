import styles from '../../styles/Newmainoage.module.css'
import { starReview } from '../SVGs/SVGs'

const Review = details => {
  const arr = new Array(+details.details.stars).fill('1')
  return (
    <div className={styles.review_cont}>
      <img src="https://api.bonapart.pro/public/bayrakparts/user-3297.svg" />
      <div className={styles.starts_cont}>
        {arr.map(star => (
          <>{starReview}</>
        ))}
      </div>
      <span>
        <div>{details.details.date}</div> {details.details.person}
      </span>
      <div className={styles.text_review}>{details.details.message}</div>
    </div>
  )
}

export default Review
