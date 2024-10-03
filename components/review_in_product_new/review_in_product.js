import styles from '../../styles/Review.module.css'
import {
  starNew,
  notFilledStar,
  reply,
  colorReply,
  arrrowDown,
  reviewChat,
} from '../SVGs/SVGs'
import { useState } from 'react'
import LeaveReviewBox from './leave_review_box'

const CommentForm = ({ _id, setOpenedCommentSection, addComment }) => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const addingComment = async e => {
    e.preventDefault()
    try {
      setLoading(true)
      let token = await fetch(
        'https://api.bayrakparts.com/api/info/add_comment_to_review',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            comment: {
              name: name,
              message: message,
            },
            _id: _id,
          }),
        }
      )
      const res = await token.json()
      if (res === 'comment added successfully') {
        setSuccess(true)
        setName('')
        setMessage('')
        const date = new Date()
        const year = date.getFullYear()
        let month = date.getMonth() + 1
        if (month < 10) {
          month = `0${month}`
        }
        let day = date.getDate()
        if (day < 10) {
          day = `0${day}`
        }
        const finalDate = `${day}.${month}.${year}`
        addComment({
          person: name,
          message: message,
          date: finalDate,
        })
        setOpenedCommentSection(false)
      } else {
        setSuccess('error')
      }
    } catch (error) {
      setSuccess('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.review_box_container} onSubmit={addingComment}>
      <div className={styles.row_for_name_and_input}>
        <span>Ваше ім'я:</span>
        <input
          minLength={3}
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className={styles.row_for_name_and_input}>
        <span className={styles.text_area_title}>Ваш коментар:</span>
        <textarea
          required
          minLength={4}
          value={message}
          onChange={e => setMessage(e.target.value)}
        ></textarea>
      </div>
      <div className={styles.btn_container}>
        <button className={styles.leave_review_btn_form} type="sumbit">
          Надіслати
        </button>
        <button
          className={styles.cancel_btn}
          onClick={() => setOpenedCommentSection(false)}
        >
          Скасувати
        </button>
      </div>
      {success ? (
        <div className={styles.success_result}>Коментар додано!</div>
      ) : success === 'error' ? (
        <div className={styles.error_result}>
          Упсб помилка. Спробуйте ще раз.
        </div>
      ) : null}
      {loading ? (
        <div className={styles.checking_process}>Надсилаємо...</div>
      ) : null}
    </form>
  )
}

const Comment = ({ comment }) => {
  return (
    <div className={styles.one_comment_cont}>
      <div className={styles.cont_for_date_and_person}>
        {reply} <span className={styles.itacil}>від</span>
        <span className={styles.person_title}>{comment.person}</span>
        <span className={styles.comment_date}>{comment.date}</span>
      </div>
      <div className={styles.reply_to_review}>{comment.message}</div>
    </div>
  )
}

const OneReview = ({ review }) => {
  const [openedCommentSection, setOpenedCommentSection] = useState(false)
  const [comments, setComments] = useState(review.comments)

  const addComment = comment => {
    setComments(prev => [...prev, comment])
  }

  const starsNumber = +review.stars
  const leftStars = 5 - starsNumber

  const filledStars = new Array(starsNumber).fill(starNew)

  let notFilledStars = []

  if (leftStars > 0) {
    notFilledStars = new Array(leftStars).fill(notFilledStar)
  }

  return (
    <div className={styles.one_review_cont}>
      <div className={styles.row_for_person_date_and_stars}>
        <span className={styles.person_name}>{review.person}</span>
        <div className={styles.star_and_date}>
          <span className={styles.review_date}>{review.date}</span>
          <div className={styles.stars_cont}>
            <>
              {filledStars.map((star, i) => (
                <div key={`fullStar${i}`}>{star}</div>
              ))}
            </>
            <>
              {notFilledStars.map((star, i) => (
                <div key={`emptyStar${i}`} className={styles.not_filled_star}>
                  {star}
                </div>
              ))}
            </>
          </div>
        </div>
      </div>
      <div className={styles.review_message}>{review.message}</div>
      <div className={styles.comments_container}>
        {comments.length > 0 ? (
          <>
            {comments.map(comment => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </>
        ) : null}
        <div
          className={styles.cont_to_reply_btn}
          onClick={() => setOpenedCommentSection(prev => !prev)}
        >
          {colorReply} Відповісти
        </div>
        {openedCommentSection ? (
          <CommentForm
            _id={review._id}
            setOpenedCommentSection={setOpenedCommentSection}
            addComment={addComment}
          />
        ) : null}
      </div>
    </div>
  )
}

const ReviewProductNew = ({ article, brand, reviewsArr }) => {
  const [currentReviews, setCurrentReviews] = useState(reviewsArr)

  const addReviewToCurrent = createdReview => {
    setCurrentReviews(prev => [...prev, createdReview])
  }
  return (
    <>
      <span className={styles.detail_title}>
        Відгуки:{arrrowDown}{' '}
        <div className={styles.title_review}>
          {reviewChat}{' '}
          <div className={styles.review_number}>{reviewsArr.length}</div>
          {reviewsArr.length === 2 ||
          reviewsArr.length === 3 ||
          reviewsArr.length === 4
            ? 'відгуки'
            : reviewsArr.length === 1
            ? 'відгук'
            : 'відгуків'}
        </div>
      </span>
      {currentReviews.length > 0 ? (
        <div className={styles.reviews_container}>
          {currentReviews.map(review => (
            <OneReview key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <span className={styles.no_reviews}>
          Ще немає вігуків. Станьте першими!
        </span>
      )}
      <LeaveReviewBox
        article={article}
        brand={brand}
        addReviewToCurrent={addReviewToCurrent}
      />
    </>
  )
}

export default ReviewProductNew
