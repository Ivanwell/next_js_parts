import styles from '../styles/Contacts.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'
import * as ga from '../components/lib/gtag'

const LeaveRequest = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [part, setPart] = useState('')
  const [numberPhone, setNumberPhone] = useState('')
  const [vin, setVin] = useState('')

  const makeRequest = async e => {
    e.preventDefault()
    router.push(`/thankyou`)
    ga.event({
      action: 'generate_lead',
    })
    const request = await fetch(
      'https://api.bayrakparts.com/api/info/leave_search_request',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          part: part,
          name: name,
          phone: numberPhone,
          vin: vin,
        }),
      }
    )
    const res = await request.json()
  }

  return (
    <div className={styles.whole_cont}>
      <div className={styles.smaller_cont}>
        <div className={styles.search_result_cont}>
          <h2>
            Щоб пришвидшити процес пошуку запчастин, будь ласка заповніть форму
          </h2>
          <form className={styles.request_form_cont} onSubmit={makeRequest}>
            <div className={styles.description_request}>
              1. Ваше ім'я та номер телефону
            </div>
            <div className={styles.row_for_name_numberphone}>
              <input
                className={styles.input_name_phone}
                placeholder="Ім'я *"
                required
                minLength={4}
                onChange={e => setName(e.target.value)}
              />
              <input
                className={styles.input_name_phone}
                placeholder="Телефон *"
                required
                minLength={10}
                onChange={e => setNumberPhone(e.target.value)}
              />
            </div>
            <div className={styles.description_request}>
              2. Вінкод (знаходиться у свідоцтві про реєстрацію або у додатку
              'ДІЯ')
            </div>
            <input
              className={styles.input_vin}
              placeholder="VIN *"
              required
              minLength={17}
              onChange={e => setVin(e.target.value)}
            />
            <div className={styles.description_request}>
              3. Запчастина яку шукаєте
            </div>
            <input
              className={styles.input_part}
              placeholder="Наприклад водяна помпа *"
              required
              minLength={5}
              onChange={e => setPart(e.target.value)}
            />
            <button className={styles.submit_button} type="submit">
              Надіслати запит
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LeaveRequest
