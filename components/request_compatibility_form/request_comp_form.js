import { useState } from 'react'
import styles from '../../styles/Review.module.css'
import { arrrowDown } from '../SVGs/SVGs'
import * as ga from '../../components/lib/gtag'

const RequestCompatibilityFrom = ({ article, brand }) => {
  const [vin, setVin] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const sendRequest = async e => {
    e.preventDefault()

    try {
      setLoading(true)
      setResult(null)

      const request = await fetch(
        'https://api.bayrakparts.com/api/info/leave_check_request',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            article: article,
            brand: brand,
            name: name,
            phone: phone,
            vin: vin,
          }),
        }
      )
      const res = await request.json()

      if (res === 'request created') {
        ga.event({
          action: 'generate_lead',
        })

        setResult('Success')
        setVin('')
        setName('')
        setPhone('')
      } else {
        setResult('Error')
      }
    } catch (error) {
      setResult('Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.request_form_container} onSubmit={sendRequest}>
      <div className={styles.cont_for_title_and_scroll}>
        <h2 className={styles.request_title}>
          <b>Безкоштовно перевіримо</b> чи підійде {brand} {article} до Вашого
          авто:
        </h2>
        {arrrowDown}
      </div>
      <label htmlFor="vin" className={styles.vin_label}>
        Вінкод автомобіля:
      </label>
      <input
        className={styles.vin_input}
        id="vin"
        value={vin}
        onChange={e => setVin(e.target.value)}
        required
        minLength={17}
      />
      <span className={styles.vin_explanation}>
        Вінкод знаходиться у свідоцтві про реєстрацію або у додатку "ДІЯ"
      </span>
      <label htmlFor="name" className={styles.vin_label}>
        Ваші контакти:
      </label>
      <div className={styles.row_for_input_name_and_phone}>
        <input
          placeholder="Ім'я"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          minLength={3}
        />
        <input
          placeholder="Телефон"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
          minLength={10}
        />
      </div>
      <div className={styles.btn_submit_container}>
        <button type="submit" className={styles.send_request_btn}>
          Надіслати запит
        </button>
      </div>
      {result === 'Success' ? (
        <div className={styles.success_result}>
          Запит успішно створений. Ми вже працюємо над ним!
        </div>
      ) : result === 'Error' ? (
        <div className={styles.error_result}>
          Упс, помилка. Перезавантажте сторінку та спробуйте ще раз.
        </div>
      ) : null}
      {loading ? (
        <div className={styles.checking_process}>Надсилаємо...</div>
      ) : null}
    </form>
  )
}

export default RequestCompatibilityFrom
