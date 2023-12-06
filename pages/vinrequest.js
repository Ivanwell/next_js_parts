import Head from 'next/head'
import styles from '../styles/Vinrequest.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import * as ga from '../components/lib/gtag'

const Contacts = () => {
  const [vin, setVin] = useState('')
  const [phone, setPhone] = useState('')
  const [part, setPart] = useState('')

  const router = useRouter()
  const { asPath } = useRouter()

  const submitFormInMain = e => {
    e.preventDefault()
    fetch(
      `https://api.telegram.org/bot6173056848:AAE0eviFsiQtx0CWxEJyBizEdl_zhaJ0P1w/sendMessage?chat_id=@edetalRequests&text=BayrakParts VIN-запит ${
        vin + ' ' + part + ' ' + phone
      }`
    )
    router.push('/thankyou')
    ga.event({
      action: 'generate_lead',
    })
    setVin(''), setPhone(''), setPart('')
    window.scrollTo(0, 0)
  }

  return (
    <>
      <Head>
        <title>VIN - запит || BayrakParts</title>
        <meta
          name="description"
          content="Знайти запчастини по вінкоду. Запчатини Hyundai/KIA , Toyota/Lexus, Nissan, Mazda, Honda, Subaru, BMW, Volkswagen. У нас Ви можете купити запчастини до ходової частини, двигуна, кузову, трансмісії, комплекти для ТО, комплекти ГРМ, водяні помпи, масла, фільтра, амортизатори, сайлентблоки. В наявності більше 50000 запчастин. Відправляємо в день замовлення. "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.greenwall}></div>
        <div className={styles.main_page}>
          <h1>Запит по вінкоду</h1>
          <h2 className={styles.description_of_request}>
            Швидкий спосіб дізнатись ціну запчастини. Просто вкажіть що шукаєте
            та вінкод автомобіля.
          </h2>
          <form
            className={styles.form_request}
            onSubmit={e => submitFormInMain(e)}
          >
            <div className={styles.labe_and_input}>
              <label>Назва запчастини</label>
              <input
                className={styles.input_fieled_direct}
                placeholder="наприклад водяна помпа"
                required
                minLength="5"
                onChange={e => setPart(e.target.value)}
              />
            </div>
            <div className={styles.labe_and_input}>
              <label>Вінкод авто</label>
              <input
                className={styles.input_fieled_direct}
                placeholder="- - - - - - - - - - - - - - - - -"
                required
                minLength="17"
                onChange={e => setVin(e.target.value)}
              />
            </div>
            <div className={styles.labe_and_input}>
              <label>Телефон</label>
              <input
                className={styles.input_fieled_direct}
                placeholder="+380 -- --- ---"
                required
                minLength="10"
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            <button
              className={styles.submit_btn_direct}
              type="submit"
              onClick={() => {
                onsubmit
              }}
            >
              Надіслати запит
            </button>
          </form>
          <h2 className={styles.result_of_request}>
            Через 20 хвилин Ви отримаєте ціну та терміни доставки потрібної
            запчастини
          </h2>
        </div>
        <div className={styles.greenwall}></div>
      </main>
    </>
  )
}

export default Contacts
