import styles from '../../styles/NewItem.module.css'
import {
  returning,
  heart,
  box,
  newbasket,
  preorder,
  car,
  oeNumbers,
  help,
  arrowLeft,
  flag,
  box2,
  arrowup,
  arrowDown,
  plusCircule,
  minus,
  gear,
  articles,
  question,
  info_circule,
  tools,
} from '@/components/SVGs/SVGs'
import Compatibility from '@/components/compatability/compatabikity'
import Head from 'next/head'
import { useState } from 'react'
import * as ga from '../../components/lib/gtag'
import { useRouter } from 'next/router'
import { adddToCart, showFullImage } from '@/global_state/features/cart_redux'
import {
  changeLinkPath,
  setGlobalBrand,
  setGlobalModel,
  setGlobalEngine,
} from '@/global_state/features/cardata_redux'
import { useDispatch } from 'react-redux'
import Custom404 from '../404'
import { useEffect } from 'react'
import ReviewProduct from '@/components/review_product/review_product'
import Script from 'next/script'
import Link from 'next/link'

const Item = ({ item, cat }) => {
  if (!item) {
    return <Custom404 />
  }

  let mobileImage = item.img

  if (item.img.includes('cdn.bm.parts')) {
    mobileImage = item.img.slice(0, 26) + 's/320x320/' + item.img.slice(26)
  }

  let itemRating = 0

  if (item.reviews.length > 0) {
    const sum = item.reviews.reduce(
      (accumulator, currentValue) => accumulator + +currentValue.stars,
      0
    )
    itemRating = sum / item.reviews.length
  }

  let reviewsArr = []

  if (item.reviews.length > 0) {
    reviewsArr = item.reviews.map(review => {
      return {
        '@type': 'Review',
        author: { '@type': 'Person', givenName: review.person },
        datePublished: review.createdDate,
        reviewBody: review.message,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.stars,
        },
      }
    })
  }

  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if (cat) {
      dispatch(changeLinkPath(cat.fullPath))
    }

    if (router.query.brand && router.query.model && router.query.engine) {
      dispatch(setGlobalBrand(router.query.brand))
      dispatch(setGlobalModel(router.query.model))
      dispatch(setGlobalEngine(router.query.engine))
    }
  }, [])

  const [end, setEnd] = useState(10)
  const [numerPerItem, setNumberPerItem] = useState(1)
  const [name, setName] = useState('')
  const [numberPhone, setNumberPhone] = useState('')
  const [vin, setVin] = useState('')
  const [openedDetailsMobile, setOpenedDetailsMobile] = useState(false)
  const [openedFitsMobile, setOpenedFitsMobile] = useState(false)
  const [openOE, setOpenOE] = useState(false)
  const [openedDetailsCont, setOpenDetailsCont] = useState(false)
  const [loadingInformation, setLoadingInformation] = useState(false)
  const [openedFormCheck, setOpenFormCheck] = useState(false)
  const [searchedCarByVin, setSearchedCarByVin] = useState(null)
  const [checking, setChecking] = useState(false)
  const [minLength, setMinLength] = useState(false)
  const [productDescription, setProductDescription] = useState({
    fits: [],
    details: null,
    oe: [{ brand: item.brandName, number: item.article }],
  })

  let googleTitleArr
  let googleTitle

  if (item.unicTitle) {
    googleTitle = item.unicTitle
  } else {
    googleTitleArr = item.title.split(' ')
    googleTitle = googleTitleArr.slice(0, 5).join(' ') + ` ${item.article}`
  }

  let title = `${item.brandName} ${item.article} - ${item.title}`
  const metaTitle = `⭐${item.brandName} ${item.article}⭐ - ${item.title}`

  function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1)
  }

  const addingToCard = item => {
    const newItem = { ...item, quantity: numerPerItem }
    dispatch(adddToCart(newItem))
  }

  const addNumberPerItem = number => {
    if (numerPerItem + number === 0) {
      return
    } else setNumberPerItem(prev => prev + number)
  }

  const check_compatability = e => {
    e.preventDefault()
    router.push(`/thankyou`)
    ga.event({
      action: 'generate_lead',
    })
    fetch(
      `https://api.telegram.org/bot6173056848:AAE0eviFsiQtx0CWxEJyBizEdl_zhaJ0P1w/sendMessage?chat_id=@edetalRequests&text=Запит на перевірку BayrakParts Stock! ${
        ' Вінкод : ' +
        vin +
        ' Артикул : ' +
        item.article +
        ' Клієнт ' +
        name +
        ' ' +
        numberPhone
      }`
    )
  }

  const loadInformationProduct = async () => {
    setLoadingInformation(true)

    if (productDescription.details) {
      setLoadingInformation(false)
      return
    }

    const data = { article1: item.article }

    const res = await fetch(
      `https://api.bonapart.pro/bmpart?article1=${encodeURIComponent(
        data.article1
      )}`,
      {
        method: 'GET',
      }
    )
    const itemNew = await res.json()

    if (itemNew === 'Помилка' || !itemNew) {
      setLoadingInformation(false)
      setOpenDetailsCont(true)
      return
    }

    const data1 = {
      article1: itemNew.uuid,
    }
    const res1 = await fetch(
      `https://api.bonapart.pro/bmpartinfopart?article1=${encodeURIComponent(
        data1.article1
      )}`,
      {
        method: 'GET',
      }
    )
    const body1 = await res1.json()

    if (body1 && body1.product?.oe.length > 1) {
      setProductDescription(prev => {
        return {
          ...prev,
          fits: body1.product?.cars,
          details: body1.product?.details,
          oe: body1.product?.oe,
        }
      })
      setOpenDetailsCont(true)
    } else if (body1 && body1.product?.oe.length < 1) {
      setProductDescription(prev => {
        return {
          ...prev,
          fits: body1.product?.cars,
          details: body1.product?.details,
        }
      })
      setOpenDetailsCont(true)
    }

    setLoadingInformation(false)
  }

  const loadDetailsMobile = async () => {
    setOpenedDetailsMobile(prev => !prev)
    loadInformationProduct()
  }

  const loadFitsMobile = async () => {
    setOpenedFitsMobile(prev => !prev)
    loadInformationProduct()
  }

  const loadOEMobile = async () => {
    setOpenOE(prev => !prev)
    loadInformationProduct()
  }

  const check_vin = async e => {
    e.preventDefault()
    setChecking(true)
    fetch(
      `https://api.telegram.org/bot6173056848:AAE0eviFsiQtx0CWxEJyBizEdl_zhaJ0P1w/sendMessage?chat_id=@edetalRequests&text=Перевірка BayrakParts BM! ${
        ' Вінкод : ' + vin + ' Артикул : ' + item.article
      }`
    )
    const res = await fetch(
      `https://api.bonapart.pro/get_info_by_vin?vin=${encodeURIComponent(vin)}`,
      {
        method: 'GET',
      }
    )
    const body = await res.json()
    setSearchedCarByVin(body)
    setChecking(false)
  }

  const check_vin_request = async e => {
    e.preventDefault()
    if (numberPhone.length < 10) {
      setMinLength(true)
      return
    }
    fetch(
      `https://api.telegram.org/bot6173056848:AAE0eviFsiQtx0CWxEJyBizEdl_zhaJ0P1w/sendMessage?chat_id=@edetalRequests&text=Запит на перевірку BayrakParts BM! ${
        ' Вінкод : ' +
        vin +
        ' Артикул: ' +
        item.article +
        '. Номер телефону ' +
        numberPhone
      }`
    )
    ga.event({
      action: 'generate_lead',
    })
    router.push(`/thankyou`)
  }

  const metateg1 = `✅Купити ${item.title}. Ціна : ${item.price} грн. ⚡В наявності ${item.lvivStock} шт. Гарантія якості. Напишіть нам та отримайте додаткову знижку.`

  return (
    <div className={styles.main_item}>
      <Head>
        <title>{googleTitle.slice(0, 61) + ` - BAYRAKPARTS`}</title>
        <meta name="description" content={metateg1.slice(0, 159)} />
        <meta property="og:type" content="website"></meta>
        <meta
          property="og:title"
          content={
            metaTitle.slice(0, 65) + `... купити , ціна ${item.price} грн`
          }
        ></meta>
        <meta property="og:description" content={metateg1}></meta>
        <meta
          property="og:url"
          content={`https://bayrakparts.com/product/${item.link}`}
        ></meta>
        <meta property="og:image" content={mobileImage}></meta>
      </Head>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'Product',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingCount: item.reviews.length,
              ratingValue: itemRating,
              description: item.unicTitle,
            },
            image: mobileImage,
            name: item.title,
            category: item.categoryName,
            itemCondition: 'https://schema.org/NewCondition',
            offers: {
              '@type': 'Offer',
              availability:
                item.lvivStock == 0
                  ? 'https://schema.org/OutOfStock'
                  : 'https://schema.org/InStock',
              price: item.price,
              priceCurrency: 'UAH',
            },
            review: reviewsArr,
          }),
        }}
      />
      {router.query.viewport != 'mobile' ? (
        <div className={styles.container_item_desctop}>
          <div className={styles.container_image}>
            <span className={styles.brand_title}>{item.brandName}</span>
            <img
              resource={item.img}
              src={item.img}
              alt={item.title}
              loading="lazy"
              onClick={() => dispatch(showFullImage(item.img))}
            />
          </div>
          <div className={styles.informaton_container}>
            <h1 className={styles.main_item_title} content={item.title}>
              {title}
            </h1>
            <div className={styles.main_item_atcile}>
              Артикул : {item.article}
            </div>
            <div className={styles.main_item_atcile}>Стан : новий</div>
            <button
              className={styles.details_new_btn}
              onClick={() => loadInformationProduct()}
            >
              {gear}{' '}
              {loadingInformation ? 'Завантаження...' : 'Дізнатись деталі'}
            </button>
            {productDescription.details ? (
              <div className={styles.main_item_details}>
                {Object.keys(productDescription?.details).map((key, index) => (
                  <span className={styles.item_detail_row}>
                    <div>{capitalize(key)}</div>
                    <div>
                      {Object.values(productDescription?.details)[index]}
                    </div>
                  </span>
                ))}
              </div>
            ) : null}
            <button
              className={styles.buy_btn_check}
              onClick={() => setOpenFormCheck(prev => !prev)}
            >
              {tools}Чи підійде до мого авто?
            </button>
            {openedFormCheck ? (
              <div className={styles.detail_cont_new}>
                <form
                  className={styles.request_form_cont_new}
                  onSubmit={e => check_vin(e)}
                >
                  <span>Введіть вінкод</span>
                  <input
                    className={styles.input_vin_desctop}
                    placeholder="VIN *"
                    required
                    minLength={17}
                    onChange={e => setVin(e.target.value)}
                  />
                  {!searchedCarByVin ? (
                    <button
                      className={styles.submit_button_desctop}
                      type="submit"
                    >
                      {!checking ? (
                        <>Перевірити</>
                      ) : (
                        <span className={styles.loader}></span>
                      )}
                    </button>
                  ) : null}
                  {searchedCarByVin ? (
                    <div className={styles.searched_car_mobile}>
                      <b>Ваше авто </b>
                      {searchedCarByVin === 'no car' ? (
                        <b>не знайдено</b>
                      ) : (
                        <span>
                          {searchedCarByVin.brand} {searchedCarByVin.model}
                        </span>
                      )}
                      <div className={styles.searched_check_needed_desc}>
                        {info_circule}Потрібна перевірка спеціалістом
                      </div>
                      <div>
                        Залиште номер телефону та ми перевіримо чи запчастина
                        підійде до Вашого авто
                      </div>
                      <input
                        className={styles.input_phone_desctop}
                        placeholder="Телефон *"
                        onChange={e => setNumberPhone(e.target.value)}
                      />
                      {minLength ? (
                        <div className={styles.empty_name_phone}>
                          Неповний номер телефону
                        </div>
                      ) : null}
                      <button
                        className={styles.submit_button_desctop}
                        onClick={e => check_vin_request(e)}
                      >
                        Перевірте будь ласка
                      </button>
                    </div>
                  ) : null}
                </form>
              </div>
            ) : null}
          </div>
          <div className={styles.purchaise_container}>
            <div className={styles.wishlist_and_stock}>
              <div className={styles.svg_and_title_add}>
                {heart} Додати до відстеження
              </div>
              {item.lvivStock == 0 && item.otherStock === '-' ? (
                <div className={styles.svg_and_title}>
                  {preorder} Під замовлення
                </div>
              ) : (
                <div className={styles.svg_and_title}>{box} В наявності</div>
              )}
            </div>
            <div className={styles.price_container_with_disc}>
              {item.lvivStock == 1 ||
              (item.lvivStock === '-' && item.otherStock == 1) ? (
                <div className={styles.old_price_and_disc_cont}>
                  <div className={styles.old_price}>
                    {Math.ceil(item.price * 1.25)} UAH
                  </div>
                  <div className={styles.disc_container}>-20%</div>
                </div>
              ) : null}
              <div className={styles.real_price}>{item.price},00 UAH</div>
              <span className={styles.deliver_cost}>
                Останнє оновлення: {item.lastUpdate}
              </span>
            </div>
            <div className={styles.aviability_cont}>
              {item.lvivStock == 1 ||
              (item.lvivStock == '-' && item.otherStock == 1) ? (
                <div className={styles.last_item_cont}>
                  <img
                    src="https://backend.bayrakparts.com/images/media/hot-icon.svg"
                    alt="fire"
                    loading="lazy"
                  />
                  Остання шт на складі
                </div>
              ) : item.lvivStock == 0 ? null : ( // </div> //   Немає в наявності // <div className={styles.how_many_available}>
                <div className={styles.how_many_available}>
                  {+item.lvivStock > 0 || item.lvivStock === '> 10'
                    ? item.lvivStock
                    : item.otherStock}{' '}
                  шт на складі
                </div>
              )}
            </div>
            <div className={styles.add_remove_items_container}>
              <button
                className={styles.add_remove_btn}
                onClick={() => addNumberPerItem(-1)}
              >
                -
              </button>
              <div className={styles.added_items}>{numerPerItem}</div>
              <button
                className={styles.add_remove_btn}
                onClick={() => addNumberPerItem(1)}
              >
                +
              </button>
            </div>
            {item.lvivStock == 0 ? (
              <button className={styles.buy_btn_dis}>Немає в наявності</button>
            ) : (
              <button
                className={styles.buy_btn}
                onClick={() => addingToCard(item)}
              >
                {newbasket}Купити
              </button>
            )}
            {/* <button
              className={styles.buy_btn_check}
              onClick={() => setOpenFormCheck(prev => !prev)}
            >
              Перевірити
            </button>
            {openedFormCheck ? (
              <div className={styles.detail_cont_new}>
                <form
                  className={styles.request_form_cont_new}
                  onSubmit={e => check_vin(e)}
                >
                  <span>Введіть вінкод</span>
                  <input
                    className={styles.input_vin_desctop}
                    placeholder="VIN *"
                    required
                    minLength={17}
                    onChange={e => setVin(e.target.value)}
                  />
                  {!searchedCarByVin ? (
                    <button
                      className={styles.submit_button_desctop}
                      type="submit"
                    >
                      {!checking ? (
                        <>Перевірити</>
                      ) : (
                        <span className={styles.loader}></span>
                      )}
                    </button>
                  ) : null}
                  {searchedCarByVin ? (
                    <div className={styles.searched_car_mobile}>
                      <b>Ваше авто </b>
                      {searchedCarByVin === 'no car' ? (
                        <b>не знайдено</b>
                      ) : (
                        <span>
                          {searchedCarByVin.brand} {searchedCarByVin.model}
                        </span>
                      )}
                      <div className={styles.searched_check_needed_desc}>
                        {info_circule}Потрібна перевірка спеціалістом
                      </div>
                      <div>
                        Залиште номер телефону та ми перевіримо чи запчастина
                        підійде до Вашого авто
                      </div>
                      <input
                        className={styles.input_phone_desctop}
                        placeholder="Телефон *"
                        onChange={e => setNumberPhone(e.target.value)}
                      />
                      {minLength ? (
                        <div className={styles.empty_name_phone}>
                          Неповний номер телефону
                        </div>
                      ) : null}
                      <button
                        className={styles.submit_button_desctop}
                        onClick={e => check_vin_request(e)}
                      >
                        Перевірте будь ласка
                      </button>
                    </div>
                  ) : null}
                </form>
              </div>
            ) : null} */}
            {}
          </div>
        </div>
      ) : null}
      {openedDetailsCont && router.query.viewport != 'mobile' ? (
        <div className={styles.container_item_desctop}>
          <div className={styles.cont_for_oem_and_compability}>
            <div className={styles.cont_for_oem_title}>
              {oeNumbers} <>Оригінальні номери</>
            </div>
            <div className={styles.cont_for_oem_numbers}>
              {productDescription.oe.slice(0, end).map(brand => (
                <div className={styles.number_and_brand}>
                  <span>{brand.brand?.toUpperCase()}</span>
                  <span>{brand.number?.toUpperCase()}</span>
                </div>
              ))}
              {productDescription.oe.length < 10 ? null : end >=
                productDescription.oe.length ? (
                <div className={styles.more_button} onClick={() => setEnd(10)}>
                  Згорнути
                </div>
              ) : (
                <div
                  className={styles.more_button}
                  onClick={() => setEnd(prev => prev + 10)}
                >
                  Ще...
                </div>
              )}
            </div>
          </div>
          <div className={styles.cont_for_oem_and_compability}>
            <div className={styles.cont_for_oem_title}>
              {car}Підходить до таких авто
            </div>
            {productDescription.fits.length === 0 ? (
              <div className={styles.non_info}>Немає інформації</div>
            ) : (
              <Compatibility fits={productDescription.fits} />
            )}
          </div>
        </div>
      ) : null}
      {router.query.viewport != 'mobile' ? (
        <div className={styles.container_item_desctop}>
          <div className={styles.container_for_question}>
            <h2 className={styles.cont_for_oem_title}>
              {help}Безкоштовно перевіримо чи підійде {item.brandName}{' '}
              {item.article} до Вашого авто
            </h2>
            <form
              className={styles.request_form_cont}
              onSubmit={e => check_compatability(e)}
            >
              <div className={styles.description_request}>
                1. Для перевірки потрібно лише вінкод та Ваші контактні дані
              </div>
              <div className={styles.row_for_name_numberphone}>
                <input
                  className={styles.input_name_phone}
                  placeholder="Ім'я *"
                  required
                  minLength={4}
                  onChange={e => setName(e.target.value)}
                />
                <input
                  className={styles.input_name_phone}
                  placeholder="Телефон *"
                  required
                  minLength={10}
                  onChange={e => setNumberPhone(e.target.value)}
                />
              </div>
              <div className={styles.description_request}>
                2. Вінкод знаходиться у свідоцтві про реєстрацію або у додатку
                'ДІЯ'
              </div>
              <input
                className={styles.input_vin}
                placeholder="VIN *"
                required
                minLength={17}
                onChange={e => setVin(e.target.value)}
              />
              <button className={styles.submit_button} type="submit">
                Надіслати запит
              </button>
            </form>
          </div>
        </div>
      ) : null}
      {router.query.viewport != 'mobile' && cat.relatedArticles.length > 0 ? (
        <div className={styles.container_item_desctop}>
          <div className={styles.container_for_question}>
            <h2 className={styles.cont_for_oem_title}>
              {articles} Корисні статті
            </h2>
            <ul className={styles.cont_related_articles}>
              {cat.relatedArticles.map(relatedArticle => (
                <li>
                  {flag}
                  <Link href={`/articles/${relatedArticle.link}`}>
                    {relatedArticle.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {router.query.viewport === 'mobile' ? (
        <div className={styles.container_item_mobile}>
          <h1 className={styles.top_info_mobile} content={item.title}>
            {title}
          </h1>
          <div className={styles.article_mobile}>Артикул : {item.article}</div>
          <img
            className={styles.image_mobile}
            src={mobileImage}
            alt={item.title}
            resource={item.img}
            loading="lazy"
            onClick={() => dispatch(showFullImage(item.img))}
          />
          <div className={styles.price_info_cont}>
            <div className={styles.stock_info_cont}>
              {item.lvivStock == 1 ||
              (item.lvivStock === '-' && item.otherStock == 1) ? (
                <div className={styles.last_item_cont}>
                  <img
                    src="https://backend.bayrakparts.com/images/media/hot-icon.svg"
                    alt="fire"
                    loading="lazy"
                  />
                  Остання шт на складі
                </div>
              ) : item.lvivStock == 0 ? null : (
                <div className={styles.how_many_available}>
                  {+item.lvivStock > 0 || item.lvivStock === '> 10'
                    ? item.lvivStock
                    : item.otherStock}{' '}
                  шт доступно
                </div>
              )}
              {item.lvivStock == 0 && item.otherStock === '-' ? (
                <div className={styles.out_stock_info}>
                  {preorder} Під замовлення
                </div>
              ) : (
                <div className={styles.in_stock_info}>{box2} В наявності</div>
              )}
            </div>
            <div className={styles.price_container_with_disc}>
              {item.lvivStock == 1 ||
              (item.lvivStock === '-' && item.otherStock == 1) ? (
                <div className={styles.old_price_and_disc_cont}>
                  <div className={styles.old_price}>
                    {Math.ceil(item.price * 1.25)} UAH
                  </div>
                  <div className={styles.disc_container}>-20%</div>
                </div>
              ) : null}
              <div className={styles.real_price}>{item.price},00 UAH</div>
              <span className={styles.deliver_cost}>
                Останнє оновлення: {item.lastUpdate}
              </span>
            </div>
          </div>
          <div className={styles.buttons_container}>
            <div className={styles.add_remove_btns_container}>
              {numerPerItem}
              <div className={styles.add_remove_btns}>
                <button onClick={() => addNumberPerItem(1)}>{arrowup}</button>
                <button onClick={() => addNumberPerItem(-1)}>
                  {arrowDown}
                </button>
              </div>
            </div>
            {item.lvivStock == 0 ? (
              <button disabled className={styles.buy_button_mobile_dis}>
                Немає в наявності
              </button>
            ) : (
              <button
                className={styles.buy_button_mobile}
                onClick={() => addingToCard(item)}
              >
                {newbasket}Купити
              </button>
            )}
          </div>
          <div className={styles.return_container}>
            14 днів гарантованого повернення
            <div className={styles.returning_mobile}>{returning}</div>
          </div>
          <button
            className={
              !openedFormCheck
                ? styles.check_button_mobile
                : styles.check_button_mobile_opened
            }
            onClick={() => setOpenFormCheck(prev => !prev)}
          >
            Чи підійде до мого авто{question}
          </button>
          {openedFormCheck ? (
            <div className={styles.detail_cont_mobile}>
              <form
                className={styles.request_form_cont}
                onSubmit={e => check_vin(e)}
              >
                <span>Введіть вінкод</span>
                <input
                  className={styles.input_vin_mobile}
                  placeholder="VIN *"
                  required
                  minLength={17}
                  onChange={e => setVin(e.target.value)}
                />
                {!searchedCarByVin ? (
                  <button className={styles.submit_button_mobile} type="submit">
                    {!checking ? (
                      <>Перевірити</>
                    ) : (
                      <span className={styles.loader}></span>
                    )}
                  </button>
                ) : null}
                {searchedCarByVin ? (
                  <div className={styles.searched_car_mobile}>
                    <b>Ваше авто </b>
                    {searchedCarByVin === 'no car' ? (
                      <b>не знайдено</b>
                    ) : (
                      <span>
                        {searchedCarByVin.brand} {searchedCarByVin.model}
                      </span>
                    )}
                    <div className={styles.searched_check_needed}>
                      {info_circule}Потрібна перевірка спеціалістом
                    </div>
                    <div>
                      Залиште номер телефону та ми перевіримо чи запчастина
                      підійде до Вашого авто
                    </div>
                    <input
                      className={styles.input_name_phone}
                      placeholder="Телефон *"
                      onChange={e => setNumberPhone(e.target.value)}
                    />
                    {minLength ? (
                      <div className={styles.empty_name_phone}>
                        Неповний номер телефону
                      </div>
                    ) : null}
                    <button
                      className={styles.submit_button_mobile}
                      onClick={e => check_vin_request(e)}
                    >
                      Перевірте будь ласка
                    </button>
                  </div>
                ) : null}
              </form>
            </div>
          ) : null}
          <div className={styles.detail_cont_mobile}>
            <div
              className={styles.detal_title_mobile}
              onClick={() => loadDetailsMobile()}
            >
              <div className={styles.icon_and_name}>{gear}Деталі</div>
              <div className={styles.center}>
                {!openedDetailsMobile ? plusCircule : minus}
              </div>
            </div>
            {openedDetailsMobile ? (
              <div className={styles.info_container}>
                {productDescription.details ? (
                  <>
                    {Object.keys(productDescription?.details).map(
                      (key, index) => (
                        <span className={styles.item_detail_row}>
                          <span className={styles.detail_key}>
                            {capitalize(key)}:
                          </span>{' '}
                          <span className={styles.detail_value}>
                            {Object.values(productDescription?.details)[index]}
                          </span>
                          <br />
                        </span>
                      )
                    )}
                  </>
                ) : (
                  <span className={styles.item_detail_row}>
                    {!loadingInformation ? (
                      <>Немає інформації</>
                    ) : (
                      <>Завантаження...</>
                    )}
                  </span>
                )}
              </div>
            ) : null}
          </div>
          <div className={styles.detail_cont_mobile}>
            <div
              className={styles.detal_title_mobile}
              onClick={() => loadFitsMobile()}
            >
              <div className={styles.icon_and_name}>
                {car}Підходить до таких авто
              </div>
              <div className={styles.center}>
                {!openedFitsMobile ? plusCircule : minus}
              </div>
            </div>
            {openedFitsMobile ? (
              <div className={styles.info_container}>
                {productDescription.fits.length === 0 ? (
                  <div className={styles.non_info}>
                    {loadingInformation
                      ? 'Завантаження...'
                      : 'Немає інформації'}
                  </div>
                ) : (
                  <Compatibility fits={productDescription.fits} />
                )}
              </div>
            ) : null}
          </div>
          <div className={styles.detail_cont_mobile}>
            <div
              className={styles.detal_title_mobile}
              onClick={() => loadOEMobile()}
            >
              <div className={styles.icon_and_name}>
                {oeNumbers}Оригінальні номери
              </div>
              <div className={styles.center}>
                {!openOE ? plusCircule : minus}
              </div>
            </div>
            {openOE ? (
              <div className={styles.info_container}>
                {!loadingInformation ? (
                  <>
                    {productDescription.oe.slice(0, end).map(brand => (
                      <div className={styles.number_and_brand}>
                        <span>{brand.brand.toUpperCase()}</span>
                        <span>{brand.number.toUpperCase()}</span>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className={styles.number_and_brand}>
                    <span>Завантаження...</span>
                  </div>
                )}
                {productDescription.oe.length < 10 ? null : end >=
                  productDescription.oe.length ? (
                  <div
                    className={styles.more_button}
                    onClick={() => setEnd(10)}
                  >
                    Згорнути
                  </div>
                ) : (
                  <div
                    className={styles.more_button}
                    onClick={() => setEnd(prev => prev + 10)}
                  >
                    Ще...
                  </div>
                )}
              </div>
            ) : null}
          </div>
          <div className={styles.detail_cont_mobile}>
            <div className={styles.detal_title_mobile_form}>
              <h2 className={styles.icon_and_name}>
                {help}Безкоштовно перевіримо
              </h2>
            </div>
            <form
              className={styles.request_form_cont}
              onSubmit={e => check_compatability(e)}
            >
              <span>
                Залиште вінкод Вашого авто, та ми безкоштовно перевіримо чи
                підійде дана запчастина до нього
              </span>
              <input
                className={styles.input_name_phone}
                placeholder="Ім'я *"
                required
                minLength={4}
                onChange={e => setName(e.target.value)}
              />
              <input
                className={styles.input_name_phone}
                placeholder="Телефон *"
                required
                minLength={10}
                onChange={e => setNumberPhone(e.target.value)}
              />
              <input
                className={styles.input_vin_mobile}
                placeholder="VIN *"
                required
                minLength={17}
                onChange={e => setVin(e.target.value)}
              />
              <button className={styles.submit_button_mobile} type="submit">
                Надіслати запит
              </button>
            </form>
          </div>
          <div className={styles.detail_cont_mobile}>
            <div className={styles.detal_title_mobile_form}>
              <h2 className={styles.icon_and_name}>{articles}Корисні статті</h2>
            </div>
            {cat.relatedArticles.length > 0 ? (
              <div className={styles.request_form_cont}>
                <ul className={styles.cont_related_articles}>
                  {cat.relatedArticles.map(relatedArticle => (
                    <li>
                      {flag}
                      <Link href={`/articles/${relatedArticle.link}`}>
                        {relatedArticle.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <ReviewProduct
        article={item.article}
        brand={item.brandName}
        reviewsArr={item.reviews}
      />
    </div>
  )
}

export const getServerSideProps = async ({ req, params }) => {
  const fullLink = params.product.split('-')

  const article = fullLink[fullLink.length - 1]
    .toUpperCase()
    .replace(/[- /]/g, '')

  let body

  const brand = fullLink[fullLink.length - 2].toUpperCase().replace('.', ' ')
  const res = await fetch(
    `https://backend.bayrakparts.com/get_item_info/${article}?brand=${encodeURIComponent(
      brand
    )}`,
    {
      method: 'GET',
    }
  )
  body = await res.json()

  if (!body) {
    return {
      props: {
        item: null,
      },
    }
  }

  const filteredPrice = body.supliers.filter(
    item => +item.amount > 0 || item.amount === '> 10'
  )

  let price

  if (filteredPrice.length === 0) {
    price = body.supliers.reduce((acc, loc) =>
      +acc.price < +loc.price ? acc : loc
    )
  } else {
    price = filteredPrice.reduce((acc, loc) =>
      +acc.price < +loc.price ? acc : loc
    )
  }

  if (body.image === '-') {
    body.image =
      'https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
  }

  const item = {
    title: body.title,
    price: price.price,
    img: body.image,
    article: body.article,
    brandName: body.brand,
    lvivStock: price.amount,
    lastUpdate: price.lastDate,
    otherStock: '-',
    link: body.link[0].link,
    unicTitle: body?.unicTitle || null,
    reviews: body?.reviews || null,
    categoryName: body.categoryName,
  }

  let cat = null
  if (body.categories[0]) {
    cat = body.categories[0]
  }

  return {
    props: {
      item,
      cat,
    },
  }
}

export default Item
