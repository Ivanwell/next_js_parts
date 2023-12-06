import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Brands_in_main from '@/components/main_brands_cont/main_brands_cont'
import Proposal_to_request_from_main from '@/components/proposal_to_make_request/proposal_to_request'
import OilPart from '@/components/oil_part/oilPart'
import SearchByArticle from '@/components/search_by_article/search_by_article'
import { ShopContext } from '@/components/contex/contex'
import { useContext, useState } from 'react'
import { deleteRed } from '@/components/SVGs/SVGs'
import Router, { useRouter } from 'next/router'
import { car } from '@/components/SVGs/SVGs'

const roboto = Inter({
  weight: '400',
  subsets: ['latin'],
})

export default function Home() {
  const { customerModel, chooseCustomerModel, user, deleteCarFromGarage } =
    useContext(ShopContext)
  const [loading, setLoading] = useState(false)

  const deleteUserCarInGarage = async () => {
    if (user) {
      setLoading(true)
      let updateUser = await fetch(
        `https://api.edetal.store/update_user_car/${user.email}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PATCH',
          body: JSON.stringify({
            carInGarage: { brand: '', model: '' },
          }),
        }
      )
      setLoading(false)
    }
    deleteCarFromGarage()
  }

  const router = useRouter()

  const goToBrandSearch = choosebrand => {
    const brand = choosebrand
    router.push(`/brand/${brand}`)
  }

  const choosenCarText = `Ваше авто : ${customerModel.brand}  ${customerModel.model}`
  return (
    <>
      <Head>
        <title>BayrakParts || Купити автозапчастини </title>
        <meta
          name="description"
          content="Купити запчастини дешево Львів, Київ, Тернопіль, Ужгород, Луцьк, Рівне, Житомир Hyundai/KIA, Хюндай , Toyota/Lexus, Тойота/Лексус, Nissan, Ніссан, Mazda, Мазда, Honda, Хонда, Subaru, Субару, BMW, БМВ,  Volkswagen, Фольксваген. Купити запчастини до ходової частини, двигуна, кузову, трансмісія, комплекти для ТО, комплект ГРМ, водяна помпа, масло, фільтр, амортизатор, сайлентблок. В наявності більше 50000 запчастин. Відправляємо в день замовлення."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#A5CD46"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.main}>
          <div className={styles.green_wall}></div>
          <div className={styles.main_page}>
            <h1>Автозапчастини для Ваших залізних друзів</h1>
            {customerModel.brand && customerModel.model ? (
              <div className={styles.choosen_car}>
                <div
                  className={styles.delete_choose_car}
                  onClick={() => goToBrandSearch(customerModel.brand)}
                >
                  {!loading ? (
                    <>
                      {car}
                      {choosenCarText}
                    </>
                  ) : (
                    <h4>Видаляємо...</h4>
                  )}
                </div>
                {!loading ? (
                  <button
                    className={styles.delete_choose_car}
                    onClick={() => deleteUserCarInGarage()}
                  >
                    {deleteRed}
                  </button>
                ) : null}
              </div>
            ) : null}
            <Brands_in_main />
            <SearchByArticle />
            <Proposal_to_request_from_main />
            <OilPart />
          </div>
          <div className={styles.green_wall}></div>
        </div>
      </main>
    </>
  )
}
