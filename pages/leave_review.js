import styles from '../styles/Contacts.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { starReview } from '@/components/SVGs/SVGs'
import * as ga from '../components/lib/gtag'

const LeaveReview = () => {
  const [name, setName] = useState(null)
  const [stars, setStars] = useState(0)
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(false)

  const uploadReview = async e => {
    e.preventDefault()
    let token = await fetch('https://update.bayrakparts.com/add_review', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        review: {
          name: name,
          stars: stars,
          message: message,
        },
      }),
    })
    const res = await token.json()
    if (res === 'success') {
      setSuccess(true)
      setName('')
      setMessage('')
    }
  }

  return (
    <div className={styles.whole_cont}>
      <div className={styles.smaller_cont}>
        <div className={styles.search_result_cont}>
          <h2>
            Завжди раді Вашим відгукам. Адже завдяки ним ми стаємо кращими :)
          </h2>
          <form
            className={styles.request_form_cont}
            onSubmit={e => uploadReview(e)}
          >
            <div className={styles.description_request}>
              1. Ваше ім'я та прізвище
            </div>
            <div className={styles.row_for_name_numberphone}>
              <input
                className={styles.input_name_phone}
                placeholder="Ім'я та прізвище *"
                required
                minLength={4}
                onChange={e => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className={styles.description_request}>
              2. Ваші враження, зауваження і пропозиції
            </div>
            <input
              className={styles.input_vin}
              placeholder="Відгук *"
              required
              type="text"
              onChange={e => setMessage(e.target.value)}
              value={message}
            />
            <div className={styles.description_request}>
              3. Оцініть нашу роботу по шкалі від 1 до 5
            </div>
            <div class={styles.container}>
              <div class={styles.container__items}>
                <input
                  type="radio"
                  name="stars"
                  id="st5"
                  onClick={e => setStars(5)}
                />
                <label for="st5">
                  <div class={styles.star_stroke}>
                    <div class={styles.star_fill}></div>
                  </div>
                </label>
                <input
                  type="radio"
                  name="stars"
                  id="st4"
                  onClick={e => setStars(4)}
                />
                <label for="st4">
                  <div class={styles.star_stroke}>
                    <div class={styles.star_fill}></div>
                  </div>
                </label>
                <input
                  type="radio"
                  name="stars"
                  id="st3"
                  onClick={e => setStars(3)}
                />
                <label for="st3">
                  <div class={styles.star_stroke}>
                    <div class={styles.star_fill}></div>
                  </div>
                </label>
                <input
                  type="radio"
                  name="stars"
                  id="st2"
                  onClick={e => setStars(2)}
                />
                <label for="st2">
                  <div class={styles.star_stroke}>
                    <div class={styles.star_fill}></div>
                  </div>
                </label>
                <input
                  type="radio"
                  name="stars"
                  id="st1"
                  onClick={e => setStars(1)}
                />
                <label for="st1">
                  <div class={styles.star_stroke}>
                    <div class={styles.star_fill}></div>
                  </div>
                </label>
              </div>
            </div>

            <button className={styles.submit_button} type="submit">
              Надіслати відгук
            </button>
          </form>
          {success ? (
            <div className={styles.success_created_review}>
              Дякуємо! Відгук успішно створений
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default LeaveReview
