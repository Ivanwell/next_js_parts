import styles from '../../styles/Newmainoage.module.css'
import { starReview } from '../SVGs/SVGs'
import { useState } from 'react'

const Review = details => {
  const [opened, setOpened] = useState(false)
  const arr = new Array(+details.details.stars).fill('1')
  return (
    <>
      {!opened ? (
        <div
          className={styles.review_cont}
          onClick={e => setOpened(prev => !prev)}
        >
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
      ) : (
        <div
          className={styles.review_cont_full}
          onClick={e => setOpened(prev => !prev)}
        >
          <div className={styles.text_review_full}>
            {details.details.message}
          </div>
        </div>
      )}
    </>
  )
}

export default Review
