import Head from 'next/head'
import styles from '../../../styles/NewItem.module.css'
import Compatibility from '@/components/compatability/compatabikity'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
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
  box2,
  arrowup,
  arrowDown,
  plusCircule,
  minus,
  gear,
  question,
  info_circule,
} from '@/components/SVGs/SVGs'
import { useRouter } from 'next/router'
import * as ga from '../../../components/lib/gtag'
import { useUserAgent } from 'next-useragent'
import { adddToCart } from '@/global_state/features/cart_redux'
import { useDispatch } from 'react-redux'

const Item = ({ item, userAgent, rating, reviews }) => {
  let ua
  if (userAgent.uaString) {
    ua = useUserAgent(userAgent.uaString)
  } else {
    ua = useUserAgent(window.navigator.userAgent)
  }

  let img

  if (ua.isMobile) {
    img = item.img.slice(0, 28) + '320x320' + item.img.slice(28)
  } else {
    img = item.img.slice(0, 28) + '1920x1920' + item.img.slice(28)
  }

  const googleImage = item.img.slice(0, 28) + '320x320' + item.img.slice(28)

  const dispatch = useDispatch()

  const router = useRouter()
  const [end, setEnd] = useState(10)
  const [numerPerItem, setNumberPerItem] = useState(1)
  const [name, setName] = useState('')
  const [numberPhone, setNumberPhone] = useState('')
  const [vin, setVin] = useState('')
  const [openedDetailsMobile, setOpenedDetailsMobile] = useState(false)
  const [openedFitsMobile, setOpenedFitsMobile] = useState(false)
  const [openOE, setOpenOE] = useState(false)
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

  let metateg
  let metateg2

  if (productDescription.fits?.length > 0) {
    metateg = `✅Придбати за ${item.price} грн ${
      item.title
    } до ${productDescription.fits.map(
      brand => `${brand.models.map(model => `${brand.brand} ${model.model}`)}`
    )}.`

    metateg2 = `✅Підходить до : ${productDescription.fits.map(
      brand => `${brand.models.map(model => `${brand.brand} ${model.model}`)}`
    )}`
  } else {
    metateg = `✅Придбати за ${item.price} грн ${
      item.title
    }. Номери аналогів : ${productDescription.oe
      .slice(0, 10)
      .map(number => `${number.number}`)}.`

    metateg2 = metateg
  }

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController
    const data1 = {
      article1: item.uuid,
    }
    const apiCall = async () => {
      try {
        setLoadingInformation(true)
        const res1 = await fetch(
          `https://api.bonapart.pro/bmpartinfopart?article1=${encodeURIComponent(
            data1.article1
          )}`,
          {
            method: 'GET',
          }
        )
        const body1 = await res1.json()

        if (body1) {
          setProductDescription(prev => {
            return {
              ...prev,
              fits: body1.product?.cars,
              details: body1.product?.details,
              oe: body1.product?.oe,
            }
          })
        }
        setLoadingInformation(false)
      } catch (error) {
        if (!signal?.aborted) {
          console.error(error)
          setLoadingInformation(false)
        }
      }
    }
    apiCall()

    return () => {
      abortController.abort()
    }
  }, [])

  const title = `${item.brandName} ${item.article.replace(/[&\/\\ ]/g, '')} ${
    item.title
  }`

  const title1 = `⭐${item.brandName}⭐ ${item.article.replace(
    /[&\/\\ ]/g,
    ''
  )} ${item.title}`

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
      `https://api.telegram.org/bot6173056848:AAE0eviFsiQtx0CWxEJyBizEdl_zhaJ0P1w/sendMessage?chat_id=@edetalRequests&text=Запит на перевірку BayrakParts BM! ${
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

  const goTopreviousPage = () => {
    router.back()
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

  const linkToPage = `https://bayrakparts.com/search/item/${item.article}`

  return (
    <div className={styles.main_item}>
      <Head>
        <title>
          {title1.slice(0, 55) + `... купити , ціна ${item.price} грн`}
        </title>
        <meta name="description" content={metateg} />
        <meta property="og:type" content="product"></meta>
        <meta
          property="og:title"
          content={title.slice(0, 55) + `... купити , ціна ${item.price} грн`}
        ></meta>
        <meta property="og:image" content={googleImage}></meta>
        <meta property="og:description" content={metateg2}></meta>
        <meta property="og:url" content={linkToPage}></meta>
      </Head>
      {!ua.isMobile ? (
        <div className={styles.container_item_desctop} typeof="schema:Product">
          <div rel="schema:aggregateRating" className={styles.nodisplay}>
            <div typeof="schema:AggregateRating">
              <div
                property="schema:reviewCount"
                content={reviews.toString()}
              ></div>
              <div property="schema:ratingValue" content={rating}></div>
            </div>
          </div>
          <div rel="schema:offers" className={styles.nodisplay}>
            <div typeof="schema:Offer">
              <div property="schema:price" content={item.price}></div>
              {item.lvivStock === '-' && item.otherStock === '-' ? (
                <div
                  property="schema:availability"
                  content="http://schema.org/OutOfStock"
                ></div>
              ) : (
                <div
                  property="schema:availability"
                  content="https://schema.org/InStock"
                ></div>
              )}

              <div property="schema:priceCurrency" content="UAH"></div>
              <div
                property="schema:priceValidUntil"
                datatype="xsd:date"
                content="2029-12-31"
              ></div>
              <div rel="schema:url" resource={linkToPage}></div>
              <div
                property="schema:itemCondition"
                content="https://schema.org/NewCondition"
              ></div>
            </div>
          </div>
          <div className={styles.container_image}>
            <span className={styles.brand_title}>{item.brandName}</span>
            <img
              rel="schema:image"
              resource={img}
              src={img}
              alt={item.title}
              loading="lazy"
            />
          </div>
          <div className={styles.informaton_container}>
            <h1
              className={styles.main_item_title}
              property="schema:name"
              content={item.title}
            >
              {title}
            </h1>
            <div className={styles.main_item_atcile}>
              Артикул : {item.article}
            </div>
            {loadingInformation ? (
              <b>Завантаження...</b>
            ) : (
              <>
                {productDescription.details ? (
                  <div className={styles.main_item_details}>
                    <span>Характеристики:</span>
                    <br />
                    {Object.keys(productDescription?.details).map(
                      (key, index) => (
                        <span className={styles.item_detail_row}>
                          <>{capitalize(key)}</> :{' '}
                          <>
                            {Object.values(productDescription?.details)[index]}
                          </>
                          <br />
                        </span>
                      )
                    )}
                  </div>
                ) : (
                  <div className={styles.main_item_details}>
                    <span>Характеристики:</span>
                    <br />
                    <span className={styles.item_detail_row}>
                      <>Немає інформації</>
                    </span>
                  </div>
                )}
              </>
            )}

            <div className={styles.returning_cont}>
              {returning} 14 днів гарантованого повернення
            </div>
          </div>
          <div className={styles.purchaise_container}>
            <div className={styles.wishlist_and_stock}>
              <div className={styles.svg_and_title}>
                {heart} Додати до відстеження
              </div>
              {item.lvivStock === '-' && item.otherStock === '-' ? (
                <div className={styles.svg_and_title}>
                  {preorder} Під замовлення
                </div>
              ) : (
                <div className={styles.svg_and_title}>{box} В наявності</div>
              )}
            </div>
            <div className={styles.price_container_with_disc}>
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
            <div className={styles.aviability_cont}>
              {item.lvivStock === '1' ||
              (item.lvivStock === '-' && item.otherStock === '1') ? (
                <div className={styles.last_item_cont}>
                  <img
                    src="https://bayrakparts.com/media/hot-icon.svg"
                    alt="fire"
                    loading="lazy"
                  />
                  Остання шт на складі
                </div>
              ) : (
                <div className={styles.how_many_available}>
                  {+item.lvivStock > 0 ? item.lvivStock : item.otherStock} шт
                  доступно
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
            <button
              className={styles.buy_btn}
              onClick={() => addingToCard(item)}
            >
              {newbasket}Купити
            </button>
            <Link href="#form" className={styles.buy_btn_check}>
              Чи підійде до мого авто {question}
            </Link>
          </div>
        </div>
      ) : null}
      {!ua.isMobile ? (
        <div className={styles.container_item_desctop}>
          <div className={styles.cont_for_oem_and_compability}>
            <div className={styles.cont_for_oem_title}>
              {oeNumbers} <>Оригінальні номери</>
            </div>
            <div className={styles.cont_for_oem_numbers}>
              {productDescription.oe.slice(0, end).map(brand => (
                <div className={styles.number_and_brand}>
                  <span>{brand.brand.toUpperCase()}</span>
                  <span>{brand.number.toUpperCase()}</span>
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
      {!ua.isMobile ? (
        <div className={styles.container_item_desctop}>
          <div className={styles.container_for_question}>
            <Link name="form" href="/" />
            <div className={styles.cont_for_oem_title}>
              {help}Безкоштовно перевіримо чи підійде {item.brandName}{' '}
              {item.article.replace(/[&\/\\ ]/g, '')} до Вашого авто
            </div>
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
      {ua.isMobile ? (
        <div className={styles.container_item_mobile} typeof="schema:Product">
          <div rel="schema:aggregateRating" className={styles.nodisplay}>
            <div typeof="schema:AggregateRating">
              <div
                property="schema:reviewCount"
                content={reviews.toString()}
              ></div>
              <div property="schema:ratingValue" content={rating}></div>
            </div>
          </div>
          <div rel="schema:offers" className={styles.nodisplay}>
            <div typeof="schema:Offer">
              <div property="schema:price" content={item.price}></div>
              {item.lvivStock === '-' && item.otherStock === '-' ? (
                <div
                  property="schema:availability"
                  content="http://schema.org/OutOfStock"
                ></div>
              ) : (
                <div
                  property="schema:availability"
                  content="https://schema.org/InStock"
                ></div>
              )}
              <div property="schema:priceCurrency" content="UAH"></div>
              <div
                property="schema:priceValidUntil"
                datatype="xsd:date"
                content="2029-12-31"
              ></div>
              <div rel="schema:url" resource={linkToPage}></div>
              <div
                property="schema:itemCondition"
                content="https://schema.org/NewCondition"
              ></div>
            </div>
          </div>
          <div
            className={styles.go_back_cont}
            onClick={() => goTopreviousPage()}
          >
            {arrowLeft}
          </div>
          <h1
            className={styles.top_info_mobile}
            property="schema:name"
            content={item.title}
          >
            {title}
          </h1>
          <div className={styles.article_mobile}>Артикул : {item.article}</div>
          <img
            className={styles.image_mobile}
            src={img}
            alt={item.title}
            rel="schema:image"
            resource={img}
            loading="lazy"
          />

          <div className={styles.price_info_cont}>
            <div className={styles.stock_info_cont}>
              {item.lvivStock === '1' ||
              (item.lvivStock === '-' && item.otherStock === '1') ? (
                <div className={styles.last_item_cont}>
                  <img
                    src="https://bayrakparts.com/media/hot-icon.svg"
                    alt="fire"
                    loading="lazy"
                  />
                  Остання шт на складі
                </div>
              ) : (
                <div className={styles.how_many_available}>
                  {+item.lvivStock > 0 ? item.lvivStock : item.otherStock} шт
                  доступно
                </div>
              )}
              {item.lvivStock === '-' && item.otherStock === '-' ? (
                <div className={styles.out_stock_info}>
                  {preorder} Під замовлення
                </div>
              ) : (
                <div className={styles.in_stock_info}>{box2} В наявності</div>
              )}
            </div>
            <div className={styles.price_container_with_disc}>
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
            <button
              className={styles.buy_button_mobile}
              onClick={() => addingToCard(item)}
            >
              {newbasket}Купити
            </button>
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
              onClick={() => setOpenedDetailsMobile(prev => !prev)}
            >
              <div className={styles.icon_and_name}>{gear}Деталі</div>
              <div className={styles.center}>
                {!openedDetailsMobile ? plusCircule : minus}
              </div>
            </div>
            {openedDetailsMobile ? (
              <div className={styles.info_container}>
                {!loadingInformation ? (
                  <>
                    {productDescription.details ? (
                      <>
                        {Object.keys(productDescription?.details).map(
                          (key, index) => (
                            <span className={styles.item_detail_row}>
                              <span className={styles.detail_key}>
                                {capitalize(key)}:
                              </span>{' '}
                              <span className={styles.detail_value}>
                                {
                                  Object.values(productDescription?.details)[
                                    index
                                  ]
                                }
                              </span>
                              <br />
                            </span>
                          )
                        )}
                      </>
                    ) : (
                      <span className={styles.item_detail_row}>
                        <>Немає інформації</>
                      </span>
                    )}
                  </>
                ) : (
                  <>Завантаження...</>
                )}
              </div>
            ) : null}
          </div>
          <div className={styles.detail_cont_mobile}>
            <div
              className={styles.detal_title_mobile}
              onClick={() => setOpenedFitsMobile(prev => !prev)}
            >
              {' '}
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
                  <div className={styles.non_info}>Немає інформації</div>
                ) : (
                  <Compatibility fits={productDescription.fits} />
                )}
              </div>
            ) : null}
          </div>
          <div className={styles.detail_cont_mobile}>
            <div
              className={styles.detal_title_mobile}
              onClick={() => setOpenOE(prev => !prev)}
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
                {productDescription.oe.slice(0, end).map(brand => (
                  <div className={styles.number_and_brand}>
                    <span>{brand.brand.toUpperCase()}</span>
                    <span>{brand.number.toUpperCase()}</span>
                  </div>
                ))}
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
              <div className={styles.icon_and_name}>
                {help}Безкоштовно перевіримо
              </div>
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
        </div>
      ) : null}
    </div>
  )
}

export const getServerSideProps = async ({ req, params, query }) => {
  const userAgent = req.headers['user-agent']
  const data = {
    article1: params.item.replace(/[- /]/g, ''),
    brand: query.brand,
  }

  function randomNumber(min, max) {
    return Math.random() * (max - min) + min
  }
  const rating = randomNumber(4, 5).toString().slice(0, 3)
  let reviews = Math.floor(Math.random() * 10) + 1

  if (query.brand) {
    const res = await fetch(
      `https://api.bonapart.pro/bmpart?article1=${encodeURIComponent(
        data.article1
      )}&brand=${encodeURIComponent(data.brand)}`,
      {
        method: 'GET',
      }
    )
    const item = await res.json()

    return {
      props: {
        item,
        userAgent,
        rating,
        reviews,
      },
    }
  } else {
    const res = await fetch(
      `https://api.bonapart.pro/bmpart?article1=${encodeURIComponent(
        data.article1
      )}`,
      {
        method: 'GET',
      }
    )
    const item = await res.json()

    return {
      props: {
        item,
        userAgent,
        rating,
        reviews,
      },
    }
  }
}

export default Item
