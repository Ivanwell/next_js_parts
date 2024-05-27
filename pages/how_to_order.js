import Head from 'next/head'
import styles from '../styles/How_to_order.module.css'
import SearchByArticle from '@/components/search_by_article/search_by_article'
import { useRouter } from 'next/router'
import { useState } from 'react'

const HowToOrder = () => {
  console.log('how to order')
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
      `https://api.telegram.org/bot6173056848:AAE0eviFsiQtx0CWxEJyBizEdl_zhaJ0P1w/sendMessage?chat_id=@edetalRequests&text=Запит на підбір BayrakParts з запиту! ${
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
    <>
      <Head>
        <title>Як знайти та замовити запчастини? || BayrakParts</title>
        <meta
          name="description"
          content="Як замовити запчастини? Запчатини Hyundai/KIA , Toyota/Lexus, Nissan, Mazda, Honda, Subaru, BMW, Volkswagen. У нас Ви можете купити запчастини до ходової частини, двигуна, кузову, трансмісії, комплекти для ТО, комплекти ГРМ, водяні помпи, масла, фільтра, амортизатори, сайлентблоки. В наявності більше 50000 запчастин. Відправляємо в день замовлення. "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.greenwall}></div>
        <div className={styles.main_page}>
          <h1>Як знайти та замовити запчастину?</h1>
          <div className={styles.describing}>
            Головне у пошуку автозапчастин - це номер запчастини (артикул). Якщо
            у Вас є номер - вітаємо, половина роботи пророблена. Наступний крок
            - здійснити пошук по номеру.
          </div>
          <SearchByArticle />
          <div className={styles.describing}>
            Не знаєте артикулу? Не біда) Можете здійснити пошук по марці та
            моделі авто або залишити запит. Ми підберемо та підкажемо якого
            виробника краще обрати.
          </div>
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

        <div className={styles.greenwall}></div>
      </main>
    </>
  )
}

export default HowToOrder
