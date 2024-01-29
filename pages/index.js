import styles from '@/styles/Newmainoage.module.css'
import { search } from '@/components/SVGs/SVGs'
import { useEffect, useState } from 'react'
import CategoryInMain from '@/components/category_in_main/category_in_main'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import {
  sighn,
  checkbox1,
  watch,
  droplet,
  discbrake,
  fireIgn,
  hodovaa,
  remni,
  accecories,
  electric,
  tiress,
  kuzov,
} from '@/components/SVGs/SVGs'
import { useDispatch } from 'react-redux'
import {
  setDataForForm,
  setLoadingData,
  setBrand,
  setModel,
  setCategory,
  setPart,
} from '@/global_state/features/cardata_redux'
import { useSelector } from 'react-redux'
import { useUserAgent } from 'next-useragent'

const NewMainPage = ({ userAgent }) => {
  let ua

  if (userAgent.uaString) {
    ua = useUserAgent(userAgent.uaString)
  } else {
    ua = useUserAgent(window.navigator.userAgent)
  }

  const router = useRouter()
  const [errorForm, setErrorForm] = useState(false)
  const dispatch = useDispatch()

  const formNewData = useSelector(
    state => state.dataSelectscartReducer.value.dataForSelects
  )
  const choosenBrand = useSelector(
    state => state.dataSelectscartReducer.value.brand
  )
  const choosenModel = useSelector(
    state => state.dataSelectscartReducer.value.model
  )
  const choosenCategory = useSelector(
    state => state.dataSelectscartReducer.value.category
  )
  const choosenPart = useSelector(
    state => state.dataSelectscartReducer.value.part
  )
  const loadingFromData = useSelector(
    state => state.dataSelectscartReducer.value.loading
  )

  const submitingSearch = e => {
    e.preventDefault()
    if (!choosenBrand || !choosenModel || !choosenCategory || !choosenPart) {
      setErrorForm(true)
    } else {
      setErrorForm(false)
      const article = choosenPart + ' ' + choosenBrand + ' ' + choosenModel
      router.push(`/search/${article}`)
    }
  }

  useEffect(() => {
    if (!formNewData) {
      const abortController = new AbortController()
      const { signal } = abortController
      const apiCall = async () => {
        try {
          dispatch(setLoadingData(true))
          const res = await fetch(
            `https://api.bonapart.pro/getSearchCatParts`,
            {
              method: 'GET',
              signal: signal,
            }
          )

          const body = await res.json()
          dispatch(setDataForForm(body[0].partsData))
          dispatch(setLoadingData(false))
        } catch (error) {
          if (!signal?.aborted) {
            console.error(error)
            dispatch(setLoadingData(false))
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
                value={choosenBrand}
                onChange={e => dispatch(setBrand(e.target.value))}
              >
                {!loadingFromData ? (
                  <option selected>Оберіть марку</option>
                ) : (
                  <option selected>Завантаження...</option>
                )}
                {formNewData
                  ? formNewData.brands.map(brand => <option>{brand}</option>)
                  : null}
              </select>
            </div>
            <div className={styles.select_container}>
              <span className={styles.number}>2</span>
              <select
                value={choosenModel}
                onChange={e => dispatch(setModel(e.target.value))}
              >
                {!loadingFromData ? (
                  <option selected>Оберіть модель</option>
                ) : (
                  <option selected>Завантаження...</option>
                )}
                {choosenBrand
                  ? formNewData.models
                      .find(product => product.brandName === choosenBrand)
                      .Models.map(model1 => (
                        <option value={model1}>{model1}</option>
                      ))
                  : null}
              </select>
            </div>
            <div className={styles.select_container}>
              <span className={styles.number}>3</span>
              <select
                value={choosenCategory}
                onChange={e => dispatch(setCategory(e.target.value))}
              >
                {!loadingFromData ? (
                  <option selected>Оберіть категорію</option>
                ) : (
                  <option selected>Завантаження...</option>
                )}
                {choosenModel
                  ? formNewData.categories.map(categori => (
                      <option value={categori}>{categori}</option>
                    ))
                  : null}
              </select>
            </div>
            <div className={styles.select_container}>
              <span className={styles.number}>4</span>
              <select
                onChange={e => dispatch(setPart(e.target.value))}
                value={choosenPart}
              >
                {!loadingFromData ? (
                  <option selected>Оберіть запчастину</option>
                ) : (
                  <option selected>Завантаження...</option>
                )}
                {choosenCategory
                  ? formNewData.exactParts
                      .find(castogory => castogory.catigory === choosenCategory)
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
          <img src="https://bayrakparts.com/media/promo.jpg" />
        </div>
      </div>
      <div className={styles.container_for_brands}>
        <h2>Популярні категорії</h2>
        <CategoryInMain />
        {ua.isMobile ? (
          <>
            <h2>Інші категорії</h2>
            <div className={styles.category_link_cont}>
              <Link
                className={styles.category_link}
                href="/categories/olyva-zmazka--i-tehnichni"
              >
                {droplet}
                Оливи та рідини
              </Link>
              <Link
                href="/categories/galmivna-systema"
                className={styles.category_link}
              >
                {discbrake}Гальмівна система
              </Link>

              <Link
                href="/categories/systema-zapalyuvannya-rozzharyuvannya"
                className={styles.category_link}
              >
                {fireIgn}Запалення/розжарювання
              </Link>

              <Link
                href="/categories/obigriv-kondytsioner"
                className={styles.category_link}
              >
                {hodovaa}Опалення/кондиціонування
              </Link>

              <Link
                href="/categories/rulova-systema"
                className={styles.category_link}
              >
                {remni}Рульова система
              </Link>

              <Link
                href="/categories/kuzov-skladovi"
                className={styles.category_link}
              >
                {accecories}Кузовні елемнти
              </Link>

              <Link
                href="/categories/systema-vypusku-vpusku-povitrya"
                className={styles.category_link}
              >
                {electric}Впуск/випуск
              </Link>

              <Link
                href="/categories/systemy-pidgotovky-podachi-palyva"
                className={styles.category_link}
              >
                {tiress}Подача палива
              </Link>

              <Link
                href="/categories/aksesuary-zasoby-po-doglyadu-dod.tovary"
                className={styles.category_link}
              >
                {kuzov}
                Аксесуари
              </Link>
            </div>
          </>
        ) : null}
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
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ req }) => {
  const userAgent = req.headers['user-agent']

  return {
    props: {
      userAgent: userAgent,
    },
  }
}

export default NewMainPage
