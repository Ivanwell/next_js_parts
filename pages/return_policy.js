import Head from 'next/head'
import styles from '../styles/How_to_order.module.css'

const PaymentReturns = () => {
  return (
    <>
      <Head>
        <title>Повернення || BayrakParts</title>
        <meta
          name="description"
          content="Доставка, оплата та повернення. Запчатини Hyundai/KIA , Toyota/Lexus, Nissan, Mazda, Honda, Subaru, BMW, Volkswagen. У нас Ви можете купити запчастини до ходової частини, двигуна, кузову, трансмісії, комплекти для ТО, комплекти ГРМ, водяні помпи, масла, фільтра, амортизатори, сайлентблоки. В наявності більше 50000 запчастин. Відправляємо в день замовлення. "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.greenwall}></div>
        <div className={styles.main_page}>
          <h1>Повернення</h1>
          <div className={styles.describing}>
            На усі товари діє можливість повернення протягом 14 днів з моменту
            замовлення.
            <br />
            <br />
            Винятками є :
            <br />- Товари електрогрупи (датчики, паливні насоси...) <br />-
            Товари під замовлення з закордону
            <br />- Товари на яких є сліди монтажу
          </div>
        </div>
        <div className={styles.greenwall}></div>
      </main>
    </>
  )
}

export default PaymentReturns
