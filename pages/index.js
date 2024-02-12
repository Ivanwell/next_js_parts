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
  plusCircule,
  minus,
} from '@/components/SVGs/SVGs'
import { useDispatch } from 'react-redux'
import {
  setDataForForm,
  setLoadingData,
  setBrand,
  setModel,
  setCategory,
  setPart,
  changeLinkPath,
  setGlobalBrand,
  setGlobalModel,
  setBmBrands,
  setBmModels,
  setBmEngines,
  setGlobalEngine,
  setEngine,
} from '@/global_state/features/cardata_redux'
import { useSelector } from 'react-redux'
import { useUserAgent } from 'next-useragent'

const NewMainPage = ({ userAgent, query }) => {
  let ua

  if (userAgent.uaString) {
    ua = useUserAgent(userAgent.uaString)
  } else {
    ua = useUserAgent(window.navigator.userAgent)
  }

  const router = useRouter()
  const [errorForm, setErrorForm] = useState(false)
  const [opened, setOpened] = useState({
    first: false,
    second: false,
    third: false,
    forth: false,
    fifth: false,
    sixth: false,
  })
  const [brandDirect, setBrandDirect] = useState(null)
  const [modelDirect, setModelDirect] = useState(null)
  const [engineDirect, setEngineDirect] = useState(null)

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

  const bmBrands = useSelector(
    state => state.dataSelectscartReducer.value.bmBrands
  )

  const bmModels = useSelector(
    state => state.dataSelectscartReducer.value.bmModels
  )

  const bmEngines = useSelector(
    state => state.dataSelectscartReducer.value.bmEngines
  )

  const engine = useSelector(state => state.dataSelectscartReducer.value.engine)

  const globalEngine = useSelector(
    state => state.dataSelectscartReducer.value.engine
  )

  const globalBrand = useSelector(
    state => state.dataSelectscartReducer.value.globalBrand
  )
  const globalModel = useSelector(
    state => state.dataSelectscartReducer.value.globalModel
  )
  const fullPath = useSelector(
    state => state.dataSelectscartReducer.value.fullPath
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
    if (fullPath) {
      dispatch(changeLinkPath(null))
    }

    if (router.query.brand && router.query.model && router.query.engine) {
      dispatch(setGlobalBrand(router.query.brand))
      dispatch(setGlobalModel(router.query.model))
      dispatch(setGlobalEngine(router.query.engine))
      setBrandDirect(router.query.brand)
      setModelDirect(router.query.model)
      setEngineDirect(router.query.engine)
    } else if (router.query.brand && router.query.model) {
      setBrandDirect(router.query.brand)
      setModelDirect(router.query.model)
      setEngineDirect(null)
      dispatch(setGlobalBrand(null))
      dispatch(setGlobalEngine(null))
      dispatch(setGlobalModel(null))
    } else if (router.query.brand) {
      setBrandDirect(router.query.brand)
      setModelDirect(null)
      setEngineDirect(null)
      dispatch(setGlobalBrand(null))
      dispatch(setGlobalEngine(null))
      dispatch(setGlobalModel(null))
    }

    if (!bmBrands) {
      const abortController = new AbortController()
      const { signal } = abortController
      const apiCall = async () => {
        try {
          dispatch(setLoadingData(true))
          const res = await fetch(
            `https://backend.bayrakparts.com/getAllCarBrands`,
            {
              method: 'GET',
              signal: signal,
            }
          )

          const body = await res.json()
          dispatch(setBmBrands(body))
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

  useEffect(() => {
    if (brandDirect) {
      setEngineDirect(null)
      if (!router.query.model) {
        setModelDirect(null)
      }
      dispatch(setBmModels(null))
      const abortController = new AbortController()
      const { signal } = abortController
      const apiCall = async () => {
        try {
          dispatch(setLoadingData(true))
          const res = await fetch(
            `https://backend.bayrakparts.com/getAllCarModelsByBrand/${brandDirect}`,
            {
              method: 'GET',
              signal: signal,
            }
          )

          const body = await res.json()
          dispatch(setBmModels(body))
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
  }, [brandDirect])

  useEffect(() => {
    if (modelDirect && brandDirect) {
      setEngineDirect(null)
      dispatch(setBmEngines(null))
      const abortController = new AbortController()
      const { signal } = abortController
      const apiCall = async () => {
        try {
          dispatch(setLoadingData(true))
          const res = await fetch(
            `https://backend.bayrakparts.com/getAllEnginesByModel/${brandDirect}?model=${modelDirect}`,
            {
              method: 'GET',
              signal: signal,
            }
          )

          const body = await res.json()
          dispatch(setBmEngines(body))
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
  }, [modelDirect])

  const submitSearch = e => {
    e.preventDefault()
    dispatch(setGlobalBrand(brandDirect))
    dispatch(setGlobalModel(modelDirect))
    dispatch(setGlobalEngine(engineDirect))
  }

  const arrow = '<'
  const arrowRew = '>'

  let titleMeta = 'BayrakParts || Запчастини з гарантією'
  if (router.query.brand && router.query.model && router.query.engine) {
    titleMeta = `Запчастини до ${router.query.brand} ${router.query.model} ${router.query.engine}`
  }
  return (
    <div className={styles.main_container}>
      <Head>
        <title>{titleMeta}</title>
        <meta
          name="description"
          content="Купити запчастини дешево з гарантією Львів, Київ, Тернопіль, Ужгород, Луцьк, Рівне, Житомир Hyundai/KIA, Хюндай , Toyota/Lexus, Тойота/Лексус, Nissan, Ніссан, Mazda, Мазда, Honda, Хонда, Subaru, Субару, BMW, БМВ,  Volkswagen, Фольксваген. Купити запчастини до ходової частини, двигуна, кузову, трансмісія, комплекти для ТО, комплект ГРМ, водяна помпа, масло, фільтр, амортизатор, сайлентблок. В наявності більше 50000 запчастин. Відправляємо в день замовлення."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f37c2e"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {globalBrand && globalModel && engine ? null : (
        <div className={styles.container_for_search_and_promo}>
          <form className={styles.search_form} onSubmit={e => submitSearch(e)}>
            <div className={styles.container_search_form}>
              <div className={styles.select_car_title}>
                {search}Виберіть Ваше авто для пошуку запчастин
              </div>
              {/* <div className={styles.select_container}>
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
            </div> */}
              <div className={styles.select_container}>
                <span className={styles.number}>1</span>
                <select
                  value={brandDirect}
                  onChange={e => setBrandDirect(e.target.value)}
                >
                  {!loadingFromData ? (
                    <option selected>
                      {brandDirect ? `${brandDirect}` : 'Оберіть марку'}
                    </option>
                  ) : (
                    <option selected>Завантаження...</option>
                  )}
                  {bmBrands
                    ? bmBrands.map(brand => (
                        <option value={brand.name}> {brand.name}</option>
                      ))
                    : null}
                </select>
              </div>
              {/* <div className={styles.select_container}>
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
            </div> */}
              <div className={styles.select_container}>
                <span className={styles.number}>2</span>
                <select
                  value={modelDirect}
                  onChange={e => setModelDirect(e.target.value)}
                >
                  {!loadingFromData ? (
                    <option selected>
                      {modelDirect ? `${modelDirect}` : 'Оберіть модель'}
                    </option>
                  ) : (
                    <option selected>Завантаження...</option>
                  )}
                  {brandDirect && bmModels
                    ? bmModels.map(model1 => (
                        <option value={model1.name}>{model1.name}</option>
                      ))
                    : null}
                </select>
              </div>
              <div className={styles.select_container}>
                <span className={styles.number}>3</span>
                <select
                  value={engineDirect}
                  onChange={e => setEngineDirect(e.target.value)}
                >
                  {!loadingFromData ? (
                    <option selected>
                      {engineDirect ? `${engineDirect}` : 'Оберіть двигун'}
                    </option>
                  ) : (
                    <option selected>Завантаження...</option>
                  )}
                  {modelDirect && brandDirect && bmEngines
                    ? bmEngines.map(engine => (
                        <option value={engine.name}>{engine.name}</option>
                      ))
                    : null}
                </select>
              </div>

              {/* <div className={styles.select_container}>
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
            </div> */}
              <button className={styles.search_button} type="submit">
                Вибрати авто
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
            <div className={styles.arrow_cont}>{arrow}</div>
            <div className={styles.imag_contaier}>
              <img
                loading="lazy"
                src="https://backend.bayrakparts.com/images/media/baner_new.jpg"
              />
            </div>
            <div className={styles.arrow_cont}>{arrowRew}</div>
          </div>
        </div>
      )}
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
                href="/categories/elektryka"
                className={styles.category_link}
              >
                {accecories}Електрика
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
        <h2 className={styles.why_we}>Питання - відповідь</h2>
        <div className={styles.new_container_for_question}>
          <div className={styles.cont_for_col_questions}>
            <div
              className={styles.cont_for_question}
              onClick={() =>
                setOpened(prev => ({ ...prev, first: !prev.first }))
              }
            >
              До яких марок авто у Вас є запчастини?{' '}
              {opened.first ? minus : plusCircule}
            </div>
            {opened.first ? (
              <div className={styles.answer_cont}>
                Ми продаємо запчастини до таких марок: Hyundai, Kia, Toyota,
                Lexus, Mazda, Nissan, Opel, Volkswagen, Ford, BMW, Honda,
                General Motors
              </div>
            ) : null}
            <div
              className={styles.cont_for_question}
              onClick={() =>
                setOpened(prev => ({ ...prev, second: !prev.second }))
              }
            >
              Чи можна купити у Вас масло та фільтри?
              {opened.second ? minus : plusCircule}
            </div>
            {opened.second ? (
              <div className={styles.answer_cont}>
                Так звичайно, у нас представлений великий вибір мастил різних
                в'язкостей та допусків, а також комплекти фільтрів на будь-яке
                авто.
              </div>
            ) : null}
            <div
              className={styles.cont_for_question}
              onClick={() =>
                setOpened(prev => ({ ...prev, third: !prev.third }))
              }
            >
              В мене список запчастин від майстра, можете допомогти?{' '}
              {opened.third ? minus : plusCircule}
            </div>
            {opened.third ? (
              <div className={styles.answer_cont}>
                З радістю! Відправте нам список та вінкод Вашого авто, ми
                підберемо потрібні запчастини та запропонуємо Вам різні
                варіанти.
              </div>
            ) : null}
          </div>
          <div className={styles.cont_for_col_questions}>
            <div
              className={styles.cont_for_question}
              onClick={() =>
                setOpened(prev => ({ ...prev, forth: !prev.forth }))
              }
            >
              А що якщо запчастина не підійде, у Вас є повернення?{' '}
              {opened.forth ? minus : plusCircule}
            </div>
            {opened.forth ? (
              <div className={styles.answer_cont}>
                Звичайно! Єдине прохання щоб на запчастині не було слідів
                монтажу. Якщо помилка в підборі з нашого боку - додаткові
                витрати по доставці ми беремо на себе.
              </div>
            ) : null}
            <div
              className={styles.cont_for_question}
              onClick={() =>
                setOpened(prev => ({ ...prev, fifth: !prev.fifth }))
              }
            >
              Які терміни доставки? {opened.fifth ? minus : plusCircule}
            </div>
            {opened.fifth ? (
              <div className={styles.answer_cont}>
                Якщо запчастина на нашому складі - відправимо в день замовлення.{' '}
                <br /> Якщо на віддаленому складі - відправимо на наступний
                день.
                <br /> Якщо запчастина з-за кордону - від 14 до 45 днів
                (залежить від країни)
              </div>
            ) : null}
            <div
              className={styles.cont_for_question}
              onClick={() =>
                setOpened(prev => ({ ...prev, sixth: !prev.sixth }))
              }
            >
              Чи даєте гарантію на запчастини?{' '}
              {opened.sixth ? minus : plusCircule}
            </div>
            {opened.sixth ? (
              <div className={styles.answer_cont}>
                Так, гарантія надається на усі запчастини. Гарантія дійсна 10000
                км або 3 місяці. При умові, що є акт виконаних робіт по
                встановленню запчастини на СТО.
              </div>
            ) : null}
          </div>
        </div>
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

export const getServerSideProps = async ({ req, query }) => {
  const userAgent = req.headers['user-agent']
  console.log(query)

  if (query.brand && query.model) {
    return {
      props: {
        userAgent: userAgent,
        query: query,
      },
    }
  } else {
    return {
      props: {
        userAgent: userAgent,
        query: {
          brand: null,
          model: null,
        },
      },
    }
  }
}

export default NewMainPage
