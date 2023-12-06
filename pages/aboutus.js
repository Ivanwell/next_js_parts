import Head from 'next/head'
import styles from '../styles/Aboutus.module.css'

const AboutUs = () => {
  return (
    <>
      <Head>
        <title>Про нас || BayrakParts</title>
        <meta
          name="description"
          content="Про BayrakParts. Запчатини Hyundai/KIA , Toyota/Lexus, Nissan, Mazda, Honda, Subaru, BMW, Volkswagen. У нас Ви можете купити запчастини до ходової частини, двигуна, кузову, трансмісії, комплекти для ТО, комплекти ГРМ, водяні помпи, масла, фільтра, амортизатори, сайлентблоки. В наявності більше 50000 запчастин. Відправляємо в день замовлення. "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.page_content}>
          <h1>Про нас</h1>
          <h3 className={styles.about__content}>
            <br />
            Ми онлайн-магазин автозапчастин. Знаходимось у м.Львів. <br />{' '}
            <br />
            Якщо Ви з іншого міста нашої країни - не проблема, відправимо товар
            новою або укрпоштою. <br /> <br /> Якщо ж Ви зі Львова - можливий
            самовивіз за попередньою домовленістю або доставка по місту.
            <br /> <br />
            Для нас усі покупці - це наші друзі. Тому ми стараємось надати Вам
            найкращий сервіс, щоб Ви знову і знову повертались до нас!
            <br /> <br />
          </h3>
        </div>
      </main>
    </>
  )
}

export default AboutUs
