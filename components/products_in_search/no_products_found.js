import { useState } from 'react'
import styles from '../../styles/Product_list.module.css'
import { attentionIcon } from '../SVGs/SVGs'
import * as ga from '../../components/lib/gtag'

const No_products_found = () => {
  const [vin, setVin] = useState('')
  const [part, setPart] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(false)

  const sendRequest = async e => {
    e.preventDefault()
    try {
      setLoading(true)
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
        setPart('')
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
    <div className={styles.no_result_cont}>
      <div className={styles.no_result_box}>
        <div className={styles.attention_cont}>{attentionIcon}</div>
        <form className={styles.form_container} onSubmit={sendRequest}>
          <h3>
            Системі не вдалось знайти потрібну запчастину... але ми знайдемо
          </h3>
          <div className={styles.row_for_inputs}>
            <div className={styles.input_and_label}>
              <label>Вінкод</label>
              <input
                value={vin}
                required
                minLength={17}
                onChange={e => setVin(e.target.value)}
              />
            </div>
            <div className={styles.input_and_label}>
              <label>Запчастина</label>
              <input
                value={part}
                required
                minLength={4}
                onChange={e => setPart(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.row_for_inputs}>
            <div className={styles.input_and_label}>
              <label>Ваше ім'я</label>
              <input
                value={name}
                required
                minLength={3}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className={styles.input_and_label}>
              <label>Телефон</label>
              <input
                value={phone}
                required
                minLength={10}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.button_container}>
            <button type="submit" className={styles.request_btn}>
              Надіслати
            </button>
          </div>
          {loading ? (
            <div className={styles.checking_process}>Надсилаємо...</div>
          ) : null}
          {result === 'Success' ? (
            <div className={styles.success_result}>
              Запит успішно створений. Ми вже працюємо над ним!
            </div>
          ) : result === 'Error' ? (
            <div className={styles.failed_result}>
              Упс, помилка. Перезавантажте сторінку та спробуйте ще раз.
            </div>
          ) : null}
        </form>
      </div>
    </div>
  )
}

export default No_products_found
