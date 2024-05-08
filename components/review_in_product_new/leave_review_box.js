import { useState } from 'react'
import styles from '../../styles/Review.module.css'
import { notFilledStar } from '../SVGs/SVGs'

const LeaveReviewBox = ({ article, brand }) => {
  const [openLeaveReview, setOpenLeaveReview] = useState(false)
  const [star, setStar] = useState(null)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [noStarSeted, setNoStarSeted] = useState(false)

  const uploadReview = async e => {
    e.preventDefault()
    try {
      setNoStarSeted(false)
      if (!star) {
        setNoStarSeted(true)
      } else {
        setLoading(true)
        let token = await fetch(
          'https://api.bayrakparts.com/api/info/add_review_to_product',
          {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              review: {
                name: name,
                stars: star,
                message: message,
              },
              article: article,
              brand: brand,
            }),
          }
        )
        const res = await token.json()
        if (res === 'success') {
          setSuccess(true)
          setName('')
          setMessage('')
        } else {
          setSuccess('error')
        }
      }
    } catch (error) {
      setSuccess('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className={styles.leave_review_container}>
        <button
          className={styles.leave_review_btn}
          onClick={() => setOpenLeaveReview(prev => !prev)}
        >
          Створити відгук
        </button>
        {openLeaveReview ? (
          <form className={styles.review_box_container} onSubmit={uploadReview}>
            <div className={styles.row_for_name_and_input}>
              <label>Ваше ім'я:</label>
              <input
                required
                value={name}
                minLength={3}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className={styles.row_for_name_and_input}>
              <label className={noStarSeted ? styles.red : styles.ordinary}>
                Ваше оцінка:
              </label>
              <div className={styles.stars_container}>
                <div
                  className={star ? styles.not_filled_star : styles.grey_star}
                  onClick={() => setStar(1)}
                >
                  {notFilledStar}
                </div>
                <div
                  className={
                    star <= 5 && star >= 2
                      ? styles.not_filled_star
                      : styles.grey_star
                  }
                  onClick={() => setStar(2)}
                >
                  {notFilledStar}
                </div>
                <div
                  className={
                    star <= 5 && star >= 3
                      ? styles.not_filled_star
                      : styles.grey_star
                  }
                  onClick={() => setStar(3)}
                >
                  {notFilledStar}
                </div>
                <div
                  className={
                    star <= 5 && star >= 4
                      ? styles.not_filled_star
                      : styles.grey_star
                  }
                  onClick={() => setStar(4)}
                >
                  {notFilledStar}
                </div>
                <div
                  className={
                    star === 5 ? styles.not_filled_star : styles.grey_star
                  }
                  onClick={() => setStar(5)}
                >
                  {notFilledStar}
                </div>
              </div>
            </div>
            <div className={styles.row_for_name_and_input}>
              <label className={styles.text_area_title}>Ваш відгук:</label>
              <textarea
                required
                value={message}
                minLength={4}
                onChange={e => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div className={styles.btn_container}>
              <button type="submit" className={styles.leave_review_btn_form}>
                Надіслати
              </button>
              <button
                className={styles.cancel_btn}
                onClick={() => setOpenLeaveReview(prev => !prev)}
              >
                Скасувати
              </button>
            </div>
            {success === true ? (
              <div className={styles.success_result}>
                Відгук успішно доданий
              </div>
            ) : success === 'error' ? (
              <div className={styles.error_result}>
                Упс, помилка. Перезавантажте сторінку та спробуйте ще раз.
              </div>
            ) : null}
            {loading ? (
              <div className={styles.checking_process}>Надсилаємо</div>
            ) : null}
          </form>
        ) : null}
      </div>
    </>
  )
}

export default LeaveReviewBox
