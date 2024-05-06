import styles from '../../styles/Newmainoage.module.css'
import { starReview } from '../SVGs/SVGs'
import { useState } from 'react'

const CommentCount = ({ count }) => {
  return (
    <>
      {count === 0 ? null : (
        <div className={styles.comment_cont}>
          {count === 1 ? `1 відповідь` : `${count} відповіді`}
        </div>
      )}
    </>
  )
}

const Comment = ({ comments }) => {
  return (
    <>
      {comments.map(comment => (
        <div className={styles.commentar_cont}>
          <div className={styles.commentar}>
            <div className={styles.from_for_coment}>від {comment.person}</div>
            <div className={styles.comment_message}>{comment.message}</div>
            <div className={styles.comment_date}>{comment.date}</div>
          </div>
        </div>
      ))}
    </>
  )
}

const AddCommentForm = ({ setOpenedAddComment, _id }) => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const addingComment = async e => {
    e.preventDefault()
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
    }
  }
  return (
    <>
      {success ? (
        <h2>Коментар успішно доданий!</h2>
      ) : (
        <form className={styles.add_comment_cont} onSubmit={addingComment}>
          <div className={styles.cont_for_label_and_input}>
            <label>Ваше ім'я</label>
            <input
              required
              value={name}
              minLength={4}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className={styles.cont_for_label_and_input}>
            <label>Ваш коментар</label>
            <input
              required
              value={message}
              minLength={5}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
          <div className={styles.cont_for_buttons}>
            <button type="submit" className={styles.add_direct_comment}>
              Додати коментар
            </button>
            <button
              className={styles.add_direct_comment_escape}
              onClick={e => setOpenedAddComment(false)}
            >
              Скасувати
            </button>
          </div>
        </form>
      )}
    </>
  )
}

const Review = details => {
  const [opened, setOpened] = useState(false)
  const [openedAddComment, setOpenedAddComment] = useState(false)
  const arr = new Array(+details.details.stars).fill('1')
  return (
    <>
      <div className={styles.cont_for_full_review_with_comments}>
        <div
          className={styles.review_cont}
          onClick={e => setOpened(prev => !prev)}
        >
          <img
            src="https://api.bonapart.pro/public/bayrakparts/user-3297.svg"
            alt="user"
          />
          {!opened ? (
            <div className={styles.starts_cont}>
              {arr.map((star, i) => (
                <div key={`star${i}`}>{starReview}</div>
              ))}
            </div>
          ) : null}
          {!opened ? (
            <>
              <span>
                <div>{details.details.date}</div> {details.details.person}
              </span>
              <div className={styles.text_review}>
                {details.details.message}
              </div>
            </>
          ) : (
            <div className={styles.text_review_opened}>
              {details.details.message}
            </div>
          )}
          <CommentCount count={details.details.comments.length} />
        </div>
        {opened ? <Comment comments={details.details.comments} /> : null}
        {openedAddComment && opened && !details.details.main ? (
          <AddCommentForm
            setOpenedAddComment={setOpenedAddComment}
            _id={details.details._id}
          />
        ) : !openedAddComment && opened && !details.details.main ? (
          <div className={styles.commentar_cont}>
            <button
              className={styles.add_comment_btn}
              onClick={() => setOpenedAddComment(prev => !prev)}
            >
              Коментувати
            </button>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default Review
