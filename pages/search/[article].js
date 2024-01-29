import { useRouter } from 'next/router'
import Head from 'next/head'
import {
  search,
  heart,
  box2,
  preorder,
  newbasket,
  arrowLeft,
  arrowup,
  arrowDown,
} from '@/components/SVGs/SVGs'
import { useState } from 'react'
import { useEffect } from 'react'
import Link from 'next/link'
import styles from '../../styles/NewSearch.module.css'
import { adddToCart } from '@/global_state/features/cart_redux'
import { useUserAgent } from 'next-useragent'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  setDataForForm,
  setLoadingData,
  setBrand,
  setModel,
  setCategory,
  setPart,
} from '@/global_state/features/cardata_redux'

const NoSearchResult = ({ title }) => {
  return (
    <div className={styles.nosearch_container}>
      <div className={styles.no_search_result}>
        <div className={styles.img_container}>
          <img src="https://www.bayrakparts.com/media/pngegg.png" />
        </div>
        <div className={styles.no_res_description}>
          <span>Упс... система не знайшла {title}</span>
          <span>
            Проте Ви можете залишити заявку і ми пошукаємо запчастину вручну
          </span>
          <Link href="/leave_request">Залишити заявку</Link>
        </div>
      </div>
    </div>
  )
}

const SearchedItem = ({ product }) => {
  const [numberPerItem, setNumberPerItem] = useState(1)

  const dispatch = useDispatch()

  let img =
    'https://cdn.bm.parts/photos/320x320' +
    product.default_image.slice(5).replace(/[&\/\\]/g, '/')

  const item = {
    title: product.name,
    price: Math.ceil(product.price * 1.15),
    img: img,
    article: product.article,
    brandName: product.brand,
    lvivStock: product.in_stocks[0].quantity,
    otherStock: product.in_others.quantity,
  }

  const adddingToCard = item => {
    const newItem = { ...item, quantity: numberPerItem }
    dispatch(adddToCart(newItem))
  }

  const link = `/search/item/${item.article.replace(/[&\/\\]/g, '')}?brand=${
    item.brandName
  }`

  const addNumberPerItem = number => {
    if (numberPerItem + number === 0) {
      return
    } else setNumberPerItem(prev => prev + number)
  }

  const title = `${item.brandName} ${item.article.replace(/[&\/\\ ]/g, '')} ${
    item.title
  }`

  return (
    <div className={styles.searched_item}>
      <div className={styles.img_cont}>
        <div className={styles.brand_up_photo}>{item.brandName}</div>
        <img src={img} />
      </div>
      <div className={styles.main_info_product}>
        <Link className={styles.top_name_item} href={link}>
          {title}
        </Link>
        <div className={styles.artilce}>Артикул: {item.article}</div>
        <div className={styles.title_prod_info}>Інформація про продукт:</div>
        <div className={styles.prod_info}>
          <span>Номер запчастини:</span>
          <span>{item.article}</span>
        </div>
        <div className={styles.prod_info}>
          <span>Виробник:</span>
          <span>{item.brandName}</span>
        </div>
        <div className={styles.prod_info}>
          <span>Наша ціна:</span>
          <span>{item.price} UAH</span>
        </div>
        <div className={styles.prod_info}>
          <span>Стан:</span>
          <span>Новий</span>
        </div>
      </div>
      <div className={styles.purchaise_info}>
        <div className={styles.add_to_wish_list}>
          {heart} Додати до відстеження
        </div>
        <div className={styles.price_container}>
          {item.lvivStock === '1' ||
          (item.lvivStock === '-' && item.otherStock === '1') ? (
            <div className={styles.old_price_and_disc_cont}>
              <div className={styles.old_price}>
                {Math.ceil(item.price * 1.25)} UAH
              </div>
              <div className={styles.disc_container}>-20%</div>
            </div>
          ) : null}
          <div className={styles.real_price}>{item.price},00 UAH</div>
          <span className={styles.deliver_cost}> + Вартість доставки</span>
        </div>
        {item.lvivStock === '-' && item.otherStock === '-' ? (
          <div className={styles.aviability_cont_out}>
            {preorder} Під замовлення
          </div>
        ) : (
          <div className={styles.aviability_cont}>{box2} В наявності</div>
        )}
        {item.lvivStock === '1' ||
        (item.lvivStock === '-' && item.otherStock === '1') ? (
          <div className={styles.last_item_cont}>
            <img src="https://bayrakparts.com/media/hot-icon.svg" />
            Остання шт на складі
          </div>
        ) : (
          <div className={styles.how_many_available}>
            {+item.lvivStock > 0 ? item.lvivStock : item.otherStock} шт доступно
          </div>
        )}
        <div className={styles.add_min_btn_cont}>
          <button onClick={() => addNumberPerItem(-1)}>-</button>
          <div>{numberPerItem}</div>
          <button onClick={() => addNumberPerItem(1)}>+</button>
        </div>
        {item.lvivStock === '-' && item.otherStock === '-' ? (
          <button className={styles.ckeck_aviability}>
            Уточнити наявність
          </button>
        ) : (
          <button
            className={styles.byu_btn_search}
            onClick={() => adddingToCard(item)}
          >
            {newbasket}Купити
          </button>
        )}
      </div>
    </div>
  )
}

const SearchedItemMobile = ({ product }) => {
  const [numberPerItem, setNumberPerItem] = useState(1)
  const dispatch = useDispatch()
  const router = useRouter()

  const goToItem = item_article => {
    router.push(`/search/item/${item_article}`)
  }

  let img =
    'https://cdn.bm.parts/photos/320x320' +
    product.default_image.slice(5).replace(/[&\/\\]/g, '/')

  const item = {
    title: product.name,
    price: Math.ceil(product.price * 1.15),
    img: img,
    article: product.article,
    brandName: product.brand,
    lvivStock: product.in_stocks[0].quantity,
    otherStock: product.in_others.quantity,
  }

  const adddingToCard = item => {
    const newItem = { ...item, quantity: numberPerItem }
    dispatch(adddToCart(newItem))
  }

  const link = `/search/item/${item.article.replace(/[&\/\\]/g, '')}?brand=${
    item.brandName
  }`

  const addNumberPerItem = number => {
    if (numberPerItem + number === 0) {
      return
    } else setNumberPerItem(prev => prev + number)
  }

  const title = `${item.brandName} ${item.article.replace(/[&\/\\ ]/g, '')} ${
    item.title
  }`

  return (
    <div className={styles.separate_item_cont}>
      <div className={styles.top_item}>
        {item.brandName}
        <div className={styles.add_wishlist}>{heart} відстежувати</div>
      </div>
      <div className={styles.main_container_info_mobile}>
        <div className={styles.cont_for_img_and_info}>
          <div
            className={styles.main_img_container}
            onClick={() => goToItem(item.article)}
          >
            <img src={img} />
          </div>
          <Link className={styles.main_info} href={link}>
            {title}{' '}
            {item.lvivStock === '-' && item.otherStock === '-' ? (
              <div className={styles.aviability_cont_out}>
                {preorder} Під замовлення
              </div>
            ) : (
              <div className={styles.aviability_cont}>{box2} В наявності</div>
            )}
            {item.lvivStock === '1' ||
            (item.lvivStock === '-' && item.otherStock === '1') ? (
              <div className={styles.last_item_cont}>
                <img src="https://bayrakparts.com/media/hot-icon.svg" />
                Остання шт на складі
              </div>
            ) : (
              <div className={styles.how_many_available}>
                {+item.lvivStock > 0 ? item.lvivStock : item.otherStock} шт
                доступно
              </div>
            )}
            <div className={styles.price_container}>
              {item.lvivStock === '1' ||
              (item.lvivStock === '-' && item.otherStock === '1') ? (
                <div className={styles.old_price_and_disc_cont}>
                  <div className={styles.old_price}>
                    {Math.ceil(item.price * 1.25)} UAH
                  </div>
                  <div className={styles.disc_container}>-20%</div>
                </div>
              ) : null}
              <div className={styles.real_price}>{item.price},00 UAH</div>
              <span className={styles.deliver_cost}> + Вартість доставки</span>
            </div>
          </Link>
        </div>
        <div className={styles.buttons_cont}>
          <button
            className={styles.detail_button}
            onClick={() => goToItem(item.article)}
          >
            Деталі
          </button>
          <div className={styles.add_remove_btns_container}>
            {numberPerItem}
            <div className={styles.add_remove_btns}>
              <button onClick={() => addNumberPerItem(1)}>{arrowup}</button>
              <button onClick={() => addNumberPerItem(-1)}>{arrowDown}</button>
            </div>
          </div>
          <button
            className={styles.byu_btn_mobile}
            onClick={() => adddingToCard(item)}
          >
            {newbasket}
          </button>
        </div>
      </div>
    </div>
  )
}

const NewSearch = ({ productData, userAgent }) => {
  let ua
  if (userAgent.uaString) {
    ua = useUserAgent(userAgent.uaString)
  } else {
    ua = useUserAgent(window.navigator.userAgent)
  }

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

  const [errorForm, setErrorForm] = useState(false)
  const router = useRouter()
  const title = router.query.article
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
  return (
    <div className={styles.whole_search_container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Head>
      <div className={styles.search_container}>
        {!ua.isMobile ? (
          <div className={styles.search_model_cont}>
            <form
              className={styles.search_form}
              onSubmit={e => submitingSearch(e)}
            >
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
                      ? formNewData.brands.map(brand => (
                          <option>{brand}</option>
                        ))
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
                          .find(
                            castogory => castogory.catigory === choosenCategory
                          )
                          .Models.map(part => (
                            <option value={part}>{part}</option>
                          ))
                      : null}
                  </select>
                </div>
                <button type="submit" className={styles.search_button}>
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
          </div>
        ) : null}
        {!ua.isMobile ? (
          <div className={styles.search_result_cont}>
            <h1>{title}</h1>
            {productData.length > 0 ? (
              <div className={styles.search_results}>
                {productData.map(product => (
                  <SearchedItem product={product} />
                ))}
              </div>
            ) : (
              <NoSearchResult title={title} />
            )}
          </div>
        ) : null}
        {ua.isMobile ? (
          <div className={styles.search_result_cont_mobile}>
            <div className={styles.go_back_cont}>{arrowLeft}</div>
            <div className={styles.search_results_mobile}>
              <h1>{title}</h1>
              {productData.length > 0 ? (
                productData.map(product => (
                  <SearchedItemMobile product={product} />
                ))
              ) : (
                <NoSearchResult title={title} />
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ req, params }) => {
  const data = {
    article1: params.article,
  }
  const userAgent = req.headers['user-agent']

  const res = await fetch(
    `http://api.bonapart.pro/bmparts?article1=${encodeURIComponent(
      data.article1
    )}`,
    {
      method: 'GET',
    }
  )

  const body = await res.json()
  const array = Object.values(body.products)

  return {
    props: {
      productData: array,
      userAgent,
    },
  }
}

export default NewSearch
