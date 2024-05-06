import styles from '../styles/Contacts.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { starReview } from '@/components/SVGs/SVGs'
import * as ga from '../components/lib/gtag'
import Head from 'next/head'

const LeaveReview = () => {
  const [name, setName] = useState(null)
  const [stars, setStars] = useState(0)
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(false)

  const uploadReview = async e => {
    e.preventDefault()
    let token = await fetch(
      // 'https://update.bayrakparts.com/add_review',
      'https://api.bayrakparts.com/api/info/add_review',
      {
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
      }
    )
    const res = await token.json()
    if (res === 'success') {
      setSuccess(true)
      setName('')
      setMessage('')
    }
  }

  return (
    <div className={styles.whole_cont}>
      <Head>
        <title>Залиште нам відгук - BAYRAKPARTS</title>
        <meta
          name="description"
          content="Завжди раді Вашим відгукам. Завдяки ним ми стаємо кращими."
        />
        <meta property="og:type" content="website"></meta>
        <meta
          property="og:title"
          content="Завжди раді Вашим відгукам. Завдяки ним ми стаємо кращими."
        ></meta>
        <meta
          property="og:description"
          content="Завжди раді Вашим відгукам. Завдяки ним ми стаємо кращими."
        ></meta>
        <meta
          property="og:url"
          content={`https://bayrakparts.com/leave_review`}
        ></meta>
      </Head>
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
            <div className={styles.container}>
              <div className={styles.container__items}>
                <input
                  type="radio"
                  name="stars"
                  id="st5"
                  onClick={e => setStars(5)}
                />
                <label for="st5">
                  <div className={styles.star_stroke}>
                    <div className={styles.star_fill}></div>
                  </div>
                </label>
                <input
                  type="radio"
                  name="stars"
                  id="st4"
                  onClick={e => setStars(4)}
                />
                <label for="st4">
                  <div className={styles.star_stroke}>
                    <div className={styles.star_fill}></div>
                  </div>
                </label>
                <input
                  type="radio"
                  name="stars"
                  id="st3"
                  onClick={e => setStars(3)}
                />
                <label for="st3">
                  <div className={styles.star_stroke}>
                    <div className={styles.star_fill}></div>
                  </div>
                </label>
                <input
                  type="radio"
                  name="stars"
                  id="st2"
                  onClick={e => setStars(2)}
                />
                <label for="st2">
                  <div className={styles.star_stroke}>
                    <div className={styles.star_fill}></div>
                  </div>
                </label>
                <input
                  type="radio"
                  name="stars"
                  id="st1"
                  onClick={e => setStars(1)}
                />
                <label for="st1">
                  <div className={styles.star_stroke}>
                    <div className={styles.star_fill}></div>
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
