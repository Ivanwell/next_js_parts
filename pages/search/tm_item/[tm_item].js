import Head from 'next/head'
import styles from '../../../styles/Item.module.css'
import { ShopContext } from '../../../components/contex/contex'
import { useContext, useState } from 'react'
import { basket, plane, ship } from '@/components/SVGs/SVGs'
import { useRouter } from 'next/router'
import { returnBack } from '@/components/SVGs/SVGs'
import * as ga from '../../../components/lib/gtag'

const Item = productData => {
  const router = useRouter()

  let img = productData?.productData?.img

  if (!img) {
    img =
      'https://as2.ftcdn.net/v2/jpg/04/00/24/31/1000_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg'
  }

  const item = {
    title: productData?.productData?.title,
    price: productData?.productData?.price,
    img: img,
    article: productData?.productData?.article,
    brandName: productData?.productData?.brandName,
    lvivStock: productData?.productData?.quantity,
    otherStock: productData?.productData?.quantity,
  }

  const { addToCart, cartsItemsObj, setOpenCard, isMaximumItems } =
    useContext(ShopContext)

  const [number, setNumber] = useState('')
  const [vin, setVin] = useState('')

  const goTopreviousPage = () => {
    setOpenCard(false)
    router.back()
  }

  const goToCheckOut = () => {
    setOpenCard(false)
    if (item?.otherStock == undefined && item?.stockInLviv == undefined) {
      return
    }
    if (
      typeof cartsItemsObj[item.article] === 'undefined' ||
      cartsItemsObj[item.article] < 1
    ) {
      addToCart(item)
    }
    router.push(`/checkout`)
  }

  let title

  if (productData.productData) {
    title = `${item?.brandName} ${item?.article.replace(/[- ]/g, '')} ${
      item?.title
    }`
  } else {
    title = null
  }

  let metateg

  if (productData.productData) {
    metateg = `Купити ${title} Львів, Тернопіль, Івано-Франківськ, Луцьк, Ужгород, Чернівці, Рівне, Київ, Житомир, Стрий, Добротвор, Радехів, Червоноград`
  } else {
    metateg = null
  }

  let description

  if (productData.productData) {
    description = `Купити ${item.title} ${
      item.brandName
    } ${item.article.replace(
      /[- ]/g,
      ''
    )}: ціна, фото, характеристики. Доставка по Україні. Гарантія та повернення.`
  } else {
    description = null
  }

  let link

  if (productData.productData) {
    link = `https://bayrakparts.com/search/item/${item.article.replace(
      /[- ]/g,
      ''
    )}`
  } else {
    link = null
  }

  const check_compatability = () => {
    setOpenCard(false)
    router.push(`/thankyou`)
    ga.event({
      action: 'generate_lead',
    })
    fetch(
      `https://api.telegram.org/bot6173056848:AAE0eviFsiQtx0CWxEJyBizEdl_zhaJ0P1w/sendMessage?chat_id=@edetalRequests&text=Запит на перевірку BayrakParts! ${
        ' Вінкод : ' + vin + ' Артикул : ' + item.article + ' Клієнт ' + number
      }`
    )
  }

  const callMe = () => {
    setOpenCard(false)
    router.push(`/thankyou`)
    ga.event({
      action: 'generate_lead',
    })
    fetch(
      `https://api.telegram.org/bot6173056848:AAE0eviFsiQtx0CWxEJyBizEdl_zhaJ0P1w/sendMessage?chat_id=@edetalRequests&text=Запит на дзвінок BayrakParts! ${
        ' Зателефонувати клієнту : ' + number + ' Цікавить : ' + item.article
      }`
    )
  }

  return (
    <>
      {productData.productData ? (
        <div className={styles.main_item_direct}>
          {isMaximumItems.active ? (
            <div className={styles.error_message_max_items}>
              {isMaximumItems.aviability ? (
                <>В наявності всього : {isMaximumItems.quantity} шт</>
              ) : (
                <>
                  Товар тільки під замовлення.
                  <br /> Зверніться до менеджера по консультацію
                </>
              )}
            </div>
          ) : null}
          <Head>
            <title>{title}</title>
            <meta name="description" content={metateg} />
            <meta property="og:title" content={metateg} />
            <meta property="og:image" content={item.img} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={link} />
          </Head>
          <div></div>
          <div
            className={styles.return_arrow}
            onClick={() => goTopreviousPage()}
          >
            {returnBack} Повернутись до списку
          </div>
          <div></div>
          <div></div>
          <div className={styles.main_item_smaller}>
            <div className={styles.img_amd_price_container}>
              <img
                rel="schema:image"
                resource={img}
                className={styles.imageItem}
                src={img}
                alt={title}
              />
              <div className={styles.article_information_for_mobile}>
                {' '}
                Артикул : {item.article}
              </div>
              <div className={styles.price_information_fro_mobile}>
                {Math.ceil(item?.price)} грн
              </div>
            </div>
            {/* <div className={styles.price_information_fro_mobile}>
              {Math.ceil(item?.price)} грн
            </div> */}
            {/* <img className={styles.imageItem} src={img} alt={title} /> */}
            <div className={styles.item_information}>
              <h2 className={styles.brand_information}>{item?.brandName}</h2>
              <div className={styles.product_information}>{item?.title}</div>
              <div className={styles.product_information}>
                {`Вага: ${productData?.productData?.weight} кг`}
              </div>
              {productData?.productData?.deliveryTime >= 0 &&
              productData?.productData?.deliveryTime <= 2 ? (
                <div className={styles.tommorrow}>
                  <div className={styles.aveability_section_tommorow}>
                    завтра {item?.otherStock} шт
                  </div>
                </div>
              ) : null}
              {productData?.productData?.deliveryTime >= 3 &&
              productData?.productData?.deliveryTime < 7 ? (
                <div className={styles.tommorrow}>
                  <div className={styles.aveability_section_tommorow}>
                    (3-7 днів) {item?.otherStock} шт
                  </div>
                </div>
              ) : null}
              {productData?.productData?.deliveryTime > 7 ? (
                <div className={styles.tommorrow}>
                  {productData?.productData?.deliveryType === 'Авиа' ? (
                    <div
                      className={styles.aveability_section_tommorow}
                      title="Вартість доставки 9.5$/кг , габарит 15$/кг"
                    >
                      {plane} Авіа {+productData?.productData?.deliveryTime + 2}{' '}
                      днів
                    </div>
                  ) : (
                    <div className={styles.aveability_section_tommorow}>
                      {ship} Море {+productData?.productData?.deliveryTime + 2}{' '}
                      днів
                    </div>
                  )}
                </div>
              ) : null}
              <div className={styles.delivery_information}>
                <img
                  className={styles.newpostimg}
                  src="https://static.novaposhta.ua/sitecard/logo/logochat.png"
                />
                відправимо у будь-яку точку нашої України
              </div>
              <div className={styles.price_information}>
                <div className={styles.article_information_for_desctop}>
                  {' '}
                  Артикул : {item?.article}
                </div>
                <div className={styles.price_for_desctop}>
                  {Math.ceil(item?.price)} грн
                </div>
              </div>
              <div className={styles.button_container_item}>
                <div
                  className={styles.basket_icon}
                  onClick={() => addToCart(item)}
                >
                  {basket}
                </div>
                {cartsItemsObj[item.article] > 0 ? (
                  <button
                    className={styles.button_buy_next}
                    onClick={() => goToCheckOut()}
                  >
                    В кошику {cartsItemsObj[item.article]} шт
                  </button>
                ) : (
                  <button
                    className={styles.button_buy}
                    onClick={() => goToCheckOut()}
                  >
                    Купити в 1 клік
                  </button>
                )}
              </div>
            </div>
          </div>
          <div></div>
          <div></div>
          <div className={styles.main_item_smaller_second}>
            <div className={styles.request_match_from_item}>
              <h3 className={styles.title_plus}>
                Перевірити чи підійде до мого авто:
              </h3>
              <form
                className={styles.from_container}
                onSubmit={() => check_compatability()}
              >
                <div className={styles.from_row}>
                  <label className={styles.label_input}>
                    Вінкод Вашого авто
                  </label>
                  <input
                    className={styles.from_input}
                    placeholder="- - - - - - - - - - - - - - - - -"
                    onChange={e => setVin(e.target.value)}
                    required
                    minLength={17}
                  ></input>
                </div>
                <div className={styles.from_row}>
                  <label className={styles.label_input}>
                    Ваш номер телефону
                  </label>
                  <input
                    className={styles.from_input}
                    placeholder="+38(0* *)* * *-* *-* *"
                    onChange={e => setNumber(e.target.value)}
                    required
                    minLength={9}
                  ></input>
                </div>
                <div className={styles.container_for_call_button}>
                  <button
                    className={styles.check_button}
                    type="submit"
                    onClick={() => {
                      onsubmit
                    }}
                  >
                    Перевірити
                  </button>
                </div>
              </form>
            </div>
            <form className={styles.our_pluses} onSubmit={() => callMe()}>
              <h3 className={styles.title_plus}>Чому купувати у нас?</h3>
              <div></div>
              <div className={styles.plus}>
                <img src="https://edetal.store/media/reshot-icon-e-commerce-optimization-2GZVF43XUH.svg" />
                Ми відповідаємо за вірний підбір
              </div>
              <div className={styles.plus}>
                {' '}
                <img src="https://edetal.store/media/reshot-icon-free-delivery-6J5ZK2F43U.svg" />
                Безпечна та зручна доставка
              </div>
              <div className={styles.plus}>
                <img src="https://edetal.store/media/reshot-icon-best-buy-8KZVEB6H32.svg" />
                Знижки постійним покупцям
              </div>
              <div className={styles.plus}>
                <img src="https://edetal.store/media/reshot-icon-chat-UMR863NSTQ.svg" />
                Завжди готові допомогти
              </div>
              <input
                required
                minLength={9}
                className={styles.input_phone}
                placeholder="+38(0* *)* * *-* *-* *"
                onChange={e => setNumber(e.target.value)}
              ></input>
              <div className={styles.container_for_call_button}>
                <button
                  className={styles.call_me_button}
                  type="submit"
                  onClick={() => {
                    onsubmit
                  }}
                >
                  Подзвоніть мені
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <h1 className={styles.container_for_error}>
          Не вірна URL-адреса. Будь ласка перевірте адресу або скористайтесь
          пошуком.
        </h1>
      )}
    </>
  )
}

export const getServerSideProps = async ({ params, query }) => {
  if (query.article) {
    return {
      props: {
        productData: query,
      },
    }
  } else {
    const data = {
      article1: params.tm_item.replace(/[- /]/g, ''),
    }

    const res1 = await fetch(
      `https://api.edetal.store/partsTM1?article1=${encodeURIComponent(
        data.article1
      )}`,
      {
        method: 'GET',
      }
    )
    const brandID = await res1.json()

    if (!brandID) {
      return null
    }

    const res2 = await fetch(
      `https://api.edetal.store/partsTM2?article1=${encodeURIComponent(
        data.article1
      )}&brandID1=${brandID?.data[0].brandId}`,
      {
        method: 'GET',
      }
    )
    const info = await res2.json()

    const res3 = await fetch(
      `https://api.edetal.store/partsTM3?article1=${encodeURIComponent(
        data.article1
      )}&brandID1=${brandID.data[0].brandId}`,
      {
        method: 'GET',
      }
    )
    const price1 = await res3.json()

    const min = Math.min.apply(
      Math,
      price1.data[0].rests.map(function (o) {
        return o.deliveryTime
      })
    )

    const isLargeNumber = element => element.deliveryTime === min
    const index1 = price1.data[0].rests.findIndex(isLargeNumber)

    const dataTM = {
      title: price1.data[0].descriptionUa || price1.data[0].descriptionRus,
      img: info.data?.images[0]?.image || null,
      price: Math.ceil(price1.data[0].rests[index1].price * 1.12),
      article: price1.data[0].code,
      deliveryTime: price1.data[0].rests[index1].deliveryTime,
      quantity: price1.data[0].rests[index1].quantity,
      brandName: info.data.brand,
      weight: price1.data[0].weight,
      deliveryType: price1.data[0].rests[index1].deliveryType,
    }
    return {
      props: {
        productData: dataTM,
      },
    }
  }
}

export default Item
