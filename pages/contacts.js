import Head from 'next/head'
import styles from '../styles/Contacts.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import * as ga from '../components/lib/gtag'
import Link from 'next/link'
import { tel } from '@/components/SVGs/SVGs'

const Contacts = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [part, setPart] = useState('')
  const [numberPhone, setNumberPhone] = useState('')
  const [vin, setVin] = useState('')

  const makeRequest = e => {
    e.preventDefault()
    router.push(`/thankyou`)
    ga.event({
      action: 'generate_lead',
    })
    fetch(
      `https://api.telegram.org/bot6173056848:AAE0eviFsiQtx0CWxEJyBizEdl_zhaJ0P1w/sendMessage?chat_id=@edetalRequests&text=Запит на підбір BayrakParts з контактів! ${
        ' Вінкод : ' +
        vin +
        ', запчастина : ' +
        part +
        ' .Клієнт ' +
        name +
        ' ' +
        numberPhone
      }`
    )
  }
  return (
    <div className={styles.whole_search_container}>
      <Head>
        <title>Наші контакти || BayrakParts</title>
        <meta
          name="description"
          content="Контакти BayrakParts. Запчатини Hyundai/KIA , Toyota/Lexus, Nissan, Mazda, Honda, Subaru, BMW, Volkswagen. У нас Ви можете купити запчастини до ходової частини, двигуна, кузову, трансмісії, комплекти для ТО, комплекти ГРМ, водяні помпи, масла, фільтра, амортизатори, сайлентблоки. В наявності більше 50000 запчастин. Відправляємо в день замовлення. "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.search_container}>
        <div className={styles.search_model_cont}>
          <h1>Зв'яжіться з нами</h1>
          <div className={styles.left_container}>
            <p>
              Для нас важливо надавати найкращий сервіс для Вас. Тому
              індивідуальна підтримка клієнтів відіграє ключову роль у нашій
              роботі. Зателефонуйте або напишіть нам для отримання
              кваліфікованої допомоги.
            </p>
            <p>
              <b>Режим роботи технічного відділу:</b>
              <br />
              ПН-СБ <b>9:00 - 19:00</b>
              <br />
              НЕДІЛЯ <b>ВИХІДНИЙ</b>
            </p>
          </div>
          <div className={styles.left_container}>
            <div>Телефон: +38(093) - 728 - 94 - 85</div>
            <Link
              href="tel:+380937289485"
              className={styles.call_me_btn_contacts}
              onClick={() =>
                ga.event({
                  action: 'generate_lead',
                })
              }
            >
              {tel}Зателефонувати{' '}
            </Link>
            <div>Email: office@bayrakparts.com</div>
          </div>
        </div>
        <div className={styles.search_result_cont}>
          <h2>
            Щоб пришвидшити процес пошуку запчастин, будь ласка заповніть форму
          </h2>
          <form
            className={styles.request_form_cont}
            onSubmit={e => makeRequest(e)}
          >
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

export default Contacts
