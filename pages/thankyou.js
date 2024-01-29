import Head from 'next/head'
import styles from '../styles/Thankyou.module.css'

const Thankyou = () => {
  return (
    <>
      <Head>
        <title>Дякуємо! Звернення обробляється.</title>
        <meta
          name="description"
          content="BayrakParts. Запчатини Hyundai/KIA , Toyota/Lexus, Nissan, Mazda, Honda, Subaru, BMW, Volkswagen. У нас Ви можете купити запчастини до ходової частини, двигуна, кузову, трансмісії, комплекти для ТО, комплекти ГРМ, водяні помпи, масла, фільтра, амортизатори, сайлентблоки. В наявності більше 50000 запчастин. Відправляємо в день замовлення. "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.greenwall}></div>
        <div className={styles.page_content}>
          <h1>Спасибі за Ваше звернення!</h1>
          <img
            className={styles.img_order}
            src="https://bonapart.pro/media/pngwing.com (9).png"
          />
          <h2>Зв'яжемось з Вами найближчим часом</h2>
        </div>
        <div className={styles.greenwall}></div>
      </main>
    </>
  )
}

export default Thankyou
