import styles from '../../styles/NewItem.module.css'
import { good, veryBad, bad, normal, veryGood } from '../SVGs/SVGs'
import { useState } from 'react'
import { reviews } from '../SVGs/SVGs'
import Review from '../review/review'

const ReviewProduct = ({ article, brand, reviewsArr }) => {
  const [openLeaveReview, setOpenLeaveReview] = useState(false)
  const [star, setStar] = useState(null)
  const [name, setName] = useState(null)
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(false)
  const [noStarSeted, setNoStarSeted] = useState(false)

  const uploadReview = async e => {
    e.preventDefault()
    setNoStarSeted(false)
    if (!star) {
      setNoStarSeted(true)
    } else {
      let token = await fetch(
        'https://update.bayrakparts.com/add_review_to_product',
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
        setOpenLeaveReview(false)
      }
    }
  }

  const checkStar = checkedStar => {
    setStar(checkedStar)
    if (noStarSeted) {
      setNoStarSeted(false)
    }
  }
  return (
    <div className={styles.container_item_desctop_and_mobile}>
      <div className={styles.container_for_reviews}>
        <h2 className={styles.cont_for_oem_title}>
          {reviews}Відгуки про товар
        </h2>
        {reviewsArr.length === 0 || !reviewsArr ? (
          <div className={styles.reviews_desctop}>
            У товару жодного відгуку. Станьте першими!
          </div>
        ) : (
          <div className={styles.reviews_box}>
            {reviewsArr.map(review => (
              <Review details={review} />
            ))}
          </div>
        )}
        {openLeaveReview ? (
          <form
            className={styles.request_form_cont_review}
            onSubmit={uploadReview}
          >
            <div className={styles.description_request_review}>
              1. Ваше ім'я
            </div>
            <div className={styles.row_for_name_numberphone}>
              <input
                className={styles.input_name_phone_review}
                placeholder="Ім'я *"
                required
                value={name}
                minLength={4}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className={styles.description_request_review}>
              2. Ваші враження від запчастини
            </div>
            <textarea
              className={styles.input_vin_text_area}
              placeholder="Враження, зауваження та побажання"
              required
              minLength={4}
              onChange={e => setMessage(e.target.value)}
              value={message}
            />
            <div
              className={
                !noStarSeted
                  ? styles.description_request_review
                  : styles.description_request_red
              }
            >
              3. Оцінка по шкалі від 1 до 5
            </div>
            <div className={styles.smiles_cont}>
              <div
                className={star === 1 ? styles.checked_star : styles.veryGood}
                onClick={e => checkStar(1)}
              >
                {veryBad}
              </div>
              <div
                className={star === 2 ? styles.checked_star : styles.veryGood}
                onClick={e => checkStar(2)}
              >
                {bad}
              </div>
              <div
                className={star === 3 ? styles.checked_star : styles.veryGood}
                onClick={e => checkStar(3)}
              >
                {normal}
              </div>
              <div
                className={star === 4 ? styles.checked_star : styles.veryGood}
                onClick={e => checkStar(4)}
              >
                {good}
              </div>
              <div
                className={star === 5 ? styles.checked_star : styles.veryGood}
                onClick={e => checkStar(5)}
              >
                {veryGood}
              </div>
            </div>
            <button className={styles.submit_button_review} type="submit">
              Залишити відгук
            </button>
          </form>
        ) : (
          <button
            className={styles.leave_request_open_btn}
            onClick={e => setOpenLeaveReview(prev => !prev)}
          >
            Створити відгук
          </button>
        )}
        {success ? (
          <h2 className={styles.status_added_review}>Відгук успішно додано!</h2>
        ) : null}
      </div>
    </div>
  )
}

export default ReviewProduct
