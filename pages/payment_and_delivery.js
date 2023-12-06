import Head from 'next/head'
import styles from '../styles/How_to_order.module.css'
import SearchByArticle from '@/components/search_by_article/search_by_article'
import Proposal_to_request_from_main from '@/components/proposal_to_make_request/proposal_to_request'

const PaymentReturns = () => {
  return (
    <>
      <Head>
        <title>Доставка та оплата || BayrakParts</title>
        <meta
          name="description"
          content="Доставка та оплата. Запчатини Hyundai/KIA , Toyota/Lexus, Nissan, Mazda, Honda, Subaru, BMW, Volkswagen. У нас Ви можете купити запчастини до ходової частини, двигуна, кузову, трансмісії, комплекти для ТО, комплекти ГРМ, водяні помпи, масла, фільтра, амортизатори, сайлентблоки. В наявності більше 50000 запчастин. Відправляємо в день замовлення. "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.main_page}>
          <div className={styles.cont_for_two_descr}>
            <div className={styles.describing}>
              <h2>Доставка</h2>
              <div className={styles.descr_cont}>
                - Відправляємо Новою та Укр поштою
                <br />
                - Товар в наявності - відправимо протягом 1-2 днів
                <br />- Товар під замовлення - термін доставки до 30 днів
              </div>
            </div>
            <div className={styles.describing}>
              <h2>Оплата</h2>
              <div className={styles.descr_cont}>
                - Післяплата у відділенні Нової пошти
                <br />- На безготівковий рахунок
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default PaymentReturns
