import Head from 'next/head'
import styles from '../styles/Thankyou.module.css'
import { useRouter } from 'next/router'

const ThankyouOrder = () => {
  const router = useRouter()

  const trackOrder = orderNumber => {
    router.push(`/track_order/${orderNumber}`)
  }

  const orderNumber = router.query.orderNumber
  return (
    <>
      <Head>
        <title>Дякуємо! Ваше замовлення в обробці.</title>
        <meta
          name="description"
          content="BayrakParts. Запчатини Hyundai/KIA , Toyota/Lexus, Nissan, Mazda, Honda, Subaru, BMW, Volkswagen. У нас Ви можете купити запчастини до ходової частини, двигуна, кузову, трансмісії, комплекти для ТО, комплекти ГРМ, водяні помпи, масла, фільтра, амортизатори, сайлентблоки. В наявності більше 50000 запчастин. Відправляємо в день замовлення. "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.page_content}>
          <h1>Спасибі! Номер Вашого замовлення {orderNumber}.</h1>
          <img
            className={styles.img_order}
            src="https://backend.bayrakparts.com/images/media/pngwing.com%20(10).png"
          />
          <h2>Зв'яжемось з Вами найближчим часом</h2>
          <div
            className={styles.link_to_track}
            onClick={() => trackOrder(orderNumber)}
          >
            Відстежити замовлення можна тут
          </div>
        </div>
      </main>
    </>
  )
}

export default ThankyouOrder
