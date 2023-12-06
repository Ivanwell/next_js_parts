import styles from '@/styles/Newmainoage.module.css'
import { search } from '@/components/SVGs/SVGs'
import PopularItem from '@/components/popular_items/popular_item'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '@/components/contex/contex'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { sighn, checkbox1, watch } from '@/components/SVGs/SVGs'

const NewMainPage = ({ productData }) => {
  const router = useRouter()
  const [errorForm, setErrorForm] = useState(false)

  const {
    selectingBrand,
    selectingModel,
    selectingCaregory,
    selectingPart,
    brandSearch,
    model,
    category,
    part,
    loading,
    setLoading,
    fromData,
    setFormData,
  } = useContext(ShopContext)

  const submitingSearch = e => {
    e.preventDefault()
    if (!brandSearch || !model || !category || !part) {
      setErrorForm(true)
    } else {
      setErrorForm(false)
      const article = part + ' ' + brandSearch + ' ' + model
      router.push(`/search/${article}`)
    }
  }

  useEffect(() => {
    if (!fromData) {
      const abortController = new AbortController()
      const { signal } = abortController
      const apiCall = async () => {
        try {
          setLoading(true)
          const res = await fetch(
            `https://api.edetal.store/getSearchCatParts`,
            {
              method: 'GET',
              signal: signal,
            }
          )

          const body = await res.json()
          setFormData(body[0].partsData)
          setLoading(false)
        } catch (error) {
          if (!signal?.aborted) {
            console.error(error)
            setLoading(false)
          }
        }
      }
      apiCall()

      return () => {
        abortController.abort()
      }
    } else {
    }
  }, [])

  return (
    <div className={styles.main_container}>
      <Head>
        <title>BayrakParts || Запчастини з гарантією </title>
        <meta
          name="description"
          content="Купити запчастини дешево з гарантією Львів, Київ, Тернопіль, Ужгород, Луцьк, Рівне, Житомир Hyundai/KIA, Хюндай , Toyota/Lexus, Тойота/Лексус, Nissan, Ніссан, Mazda, Мазда, Honda, Хонда, Subaru, Субару, BMW, БМВ,  Volkswagen, Фольксваген. Купити запчастини до ходової частини, двигуна, кузову, трансмісія, комплекти для ТО, комплект ГРМ, водяна помпа, масло, фільтр, амортизатор, сайлентблок. В наявності більше 50000 запчастин. Відправляємо в день замовлення."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f37c2e"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container_for_search_and_promo}>
        <form className={styles.search_form} onSubmit={e => submitingSearch(e)}>
          <div className={styles.container_search_form}>
            <div className={styles.select_car_title}>
              {search}Виберіть Ваше авто для пошуку запчастин
            </div>
            <div className={styles.select_container}>
              <span className={styles.number}>1</span>
              <select
                value={brandSearch}
                onChange={e => selectingBrand(e.target.value)}
              >
                {!loading ? (
                  <option selected>Оберіть марку</option>
                ) : (
                  <option selected>Завантаження...</option>
                )}
                {fromData
                  ? fromData.brands.map(brand => <option>{brand}</option>)
                  : null}
              </select>
            </div>
            <div className={styles.select_container}>
              <span className={styles.number}>2</span>
              <select
                value={model}
                onChange={e => selectingModel(e.target.value)}
              >
                {!loading ? (
                  <option selected>Оберіть модель</option>
                ) : (
                  <option selected>Завантаження...</option>
                )}
                {brandSearch
                  ? fromData.models
                      .find(product => product.brandName === brandSearch)
                      .Models.map(model1 => (
                        <option value={model1}>{model1}</option>
                      ))
                  : null}
              </select>
            </div>
            <div className={styles.select_container}>
              <span className={styles.number}>3</span>
              <select
                value={category}
                onChange={e => selectingCaregory(e.target.value)}
              >
                {!loading ? (
                  <option selected>Оберіть категорію</option>
                ) : (
                  <option selected>Завантаження...</option>
                )}
                {model
                  ? fromData.categories.map(categori => (
                      <option value={categori}>{categori}</option>
                    ))
                  : null}
              </select>
            </div>
            <div className={styles.select_container}>
              <span className={styles.number}>4</span>
              <select
                onChange={e => selectingPart(e.target.value)}
                value={part}
              >
                {!loading ? (
                  <option selected>Оберіть запчастину</option>
                ) : (
                  <option selected>Завантаження...</option>
                )}
                {category
                  ? fromData.exactParts
                      .find(castogory => castogory.catigory === category)
                      .Models.map(part => <option value={part}>{part}</option>)
                  : null}
              </select>
            </div>
            <button className={styles.search_button} type="submit">
              Пошук
            </button>
          </div>
          {errorForm ? (
            <div className={styles.error_form}>Заповніть усі дані</div>
          ) : null}
          <Link href="/leave_request" className={styles.cannot_find_part}>
            <span className={styles.cannot_find_part_title}>
              Не вдається знайти запчастину? Ми допоможемо!
            </span>
          </Link>
        </form>
        <div className={styles.promo_container}>
          <img src="https://bayrakparts.com/media/%D0%9F%D1%96%D0%B4%D0%B3%D0%BE%D1%82%D1%83%D0%B9%D1%82%D0%B5%20%D1%81%D0%B2%D0%BE%D1%94%20%D0%B0%D0%B2%D1%82%D0%BE%20%D0%B4%D0%BE%20%D0%B7%D0%B8%D0%BC%D0%B8%20%D1%80%D0%B0%D0%B7%D0%BE%D0%BC%20%D0%B7%20%D0%BD%D0%B0%D0%BC%D0%B8%20(2).jpg" />
        </div>
      </div>
      <div className={styles.container_for_brands}>
        <h2 className={styles.why_we}>Чому вигідно працювати з нами?</h2>
        <div className={styles.our_descr}>
          <div className={styles.our_desc1}>
            {sighn}
            Ми відповідаємо за правильний підбір запчастин
          </div>
          <div className={styles.our_desc1}>
            {checkbox1}
            Більше 5 тисяч запчастин до усіх марок
          </div>
          <div className={styles.our_desc1}>
            {watch}
            Швидко відповідаємо (до 20 хвилин)
          </div>
        </div>
        <h2 className={styles.why_we}>Відгуки наших покупців</h2>
        <div className={styles.our_descr}>
          <div className={styles.our_desc2}>
            Галина (власниця KIA Venga)
            <img src="https://static.wixstatic.com/media/1dd549_6f21d4850b964cdf913e61c940b41186~mv2.jpg/v1/fill/w_647,h_367,al_c,lg_1,q_80,enc_auto/1dd549_6f21d4850b964cdf913e61c940b41186~mv2.jpg" />
          </div>
          <div className={styles.our_desc2}>
            Пан Остап (власник KIA Sportage)
            <img src="https://static.wixstatic.com/media/1dd549_c315377f510445efa023b1dcbecd4408~mv2.jpg/v1/fill/w_626,h_357,al_c,lg_1,q_80,enc_auto/1dd549_c315377f510445efa023b1dcbecd4408~mv2.jpg" />
          </div>
          <div className={styles.our_desc2}>
            Наталія (власниця Ford Escape)
            <img src="https://static.wixstatic.com/media/1dd549_0a945f2d0ccd44a39e0decc02a8bb7ae~mv2.jpg/v1/fill/w_647,h_367,al_c,lg_1,q_80,enc_auto/1dd549_0a945f2d0ccd44a39e0decc02a8bb7ae~mv2.jpg" />
          </div>
        </div>
        <h2>ТОП - продажів</h2>
        <div className={styles.container_for_items_row}>
          {productData.slice(0, 15).map(product => (
            <PopularItem productData={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch(`https://api.edetal.store/getStock`, {
    method: 'GET',
  })

  const body = await res.json()

  const inStock = body.filter(element => element.amount > 0)

  return {
    props: {
      productData: inStock,
    },
  }
}

export default NewMainPage
