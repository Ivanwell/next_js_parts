import Head from 'next/head'
import styles from '../../styles/Categories.module.css'
import Link from 'next/link'

const Item = ({ item }) => {
  const link = `/search/item/${item.id}`
  return (
    <Link className={styles.link_to_item} href={link}>
      <span>{item.title}</span>
      <span>{item.price}</span>
    </Link>
  )
}

const Category = ({ body }) => {
  console.log(body)
  return (
    <>
      <Head>
        <title>Комплекти ГРМ || BayrakParts</title>
        <meta
          name="description"
          content="Комплекти ГРМ у магазині автозапчастин BayrakParts. Запчатини Hyundai/KIA , Toyota/Lexus, Nissan, Mazda, Honda, Subaru, BMW, Volkswagen. У нас Ви можете купити запчастини до ходової частини, двигуна, кузову, трансмісії, комплекти для ТО, комплекти ГРМ, водяні помпи, масла, фільтра, амортизатори, сайлентблоки. В наявності більше 50000 запчастин. Відправляємо в день замовлення. "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main_page}>
        <div className={styles.page_content}>
          <h1>ГРМ</h1>
          {body.map(item => (
            <Item item={item} />
          ))}
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch(
    `https://merchant.bayrakparts.com/get_all_info_mongo_db_GRM`,
    {
      method: 'GET',
    }
  )

  const body = await res.json()

  return {
    props: {
      body,
    },
  }
}

export default Category
