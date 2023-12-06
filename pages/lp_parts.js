import Head from 'next/head'
import styles from '../styles/Lp_parts.module.css'
import {
  arrowRight,
  tel,
  checkbox1,
  sighn,
  watch,
} from '@/components/SVGs/SVGs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import * as ga from '../components/lib/gtag'

const Spiner = () => {
  return (
    <div className={styles.lds_facebook}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

const LP_Parts = () => {
  const [article, setArticle] = useState('')
  const [loading, setLoading] = useState(false)
  const [noData, setNoData] = useState(false)
  const [name, setName] = useState('')
  const [part, setPart] = useState('')
  const [numberPhone, setNumberPhone] = useState('')
  const [vin, setVin] = useState('')
  const router = useRouter()

  const goToStockProductPage = () => {
    router.push(`/stock/${article.replace(/[- /]/g, '').toUpperCase()}`)
  }

  const goToSearchProductPage = () => {
    router.push(`/search/item/${article.replace(/[- /]/g, '')}`)
  }

  const goToSearchUTProductPage = item => {
    router.push(`/search/ut_item/${article.replace(/[- /]/g, '')}`)
  }

  const goToSearchTMProductPage = item => {
    router.push(`/search/tm_stock_item/${article.replace(/[- /]/g, '')}`)
  }

  const searchInTMProductPage = async () => {
    const res1 = await fetch(
      `https://technomir.bayrakparts.com/findProductTechnomir/${article.replace(
        /[- /]/g,
        ''
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
      img: info.data?.images[0]?.image,
      price: Math.ceil(price1.data[0].rests[index1].price * 1.12),
      article: price1.data[0].code,
      deliveryTime: price1.data[0].rests[index1].deliveryTime,
      quantity: price1.data[0].rests[index1].quantity,
      brandName: info.data.brand,
      weight: price1.data[0].weight,
      deliveryType: price1.data[0].rests[index1].deliveryType,
    }

    return dataTM
  }

  const searchInUnickTrade = async () => {
    const data = {
      article1: article.replace(/[- /]/g, ''),
    }

    const res = await fetch(
      `https://api.edetal.store/partsUTR?article1=${encodeURIComponent(
        data.article1
      )}`,
      {
        method: 'GET',
      }
    )
    const body = await res.json()

    if (!body) {
      return null
    }
    {
      const stockInLviv = body?.details[0].remains.find(
        storage => storage.storage.name === 'Львів'
      )

      const otherStock = body?.details[0].remains.find(
        storage => storage.storage.name === 'Kиїв Правий'
      )

      const preOrder = body?.details[0].remains.find(
        storage => storage.storage.name === 'Під замовлення (2-4 дні)'
      )

      const item = {
        title: body.details[0]?.title,
        img: body.details[0].images[0]?.fullImagePath,
        price: Math.ceil(body.details[0].yourPrice.amount * 1.12),
        article: body.details[0].article.replace(/[- /]/g, ''),
        brandName: body.details[0].brand.name,
        lvivStock: stockInLviv?.remain,
        otherStock: otherStock?.remain,
        preOrder: preOrder?.remain,
      }

      return item
    }
  }

  const searchInStock = async () => {
    const res = await fetch(
      `https://api.edetal.store/findProduct/${article
        .replace(/[- /]/g, '')
        .toUpperCase()}`,
      {
        method: 'GET',
      }
    )

    const body = await res.json()
    return body
  }

  const searchInBMParts = async () => {
    const res = await fetch(
      `https://api.edetal.store/bmparts?article1=${encodeURIComponent(
        article
      )}`,
      {
        method: 'GET',
      }
    )

    const body = await res.json()
    const array = Object.values(body.products)
    const finaldata = array.find(
      product =>
        product.article.replace(/[- ]/g, '') === article.replace(/[- ]/g, '')
    )
    return finaldata
  }

  const searchArticle = async e => {
    e.preventDefault()
    setNoData(false)
    setLoading(true)
    const dataFromStock = await searchInStock()
    if (dataFromStock) {
      goToStockProductPage()
      setLoading(false)
    } else {
      const dataFromBM = await searchInBMParts()
      if (dataFromBM) {
        setLoading(false)
        goToSearchProductPage(dataFromBM)
      } else {
        const dataFromUT = await searchInUnickTrade()
        if (dataFromUT) {
          setLoading(false)
          goToSearchUTProductPage(dataFromUT)
        } else {
          const dataFromTM = await searchInTMProductPage()
          if (dataFromTM) {
            goToSearchTMProductPage(dataFromTM)
            setLoading(false)
          } else {
            setNoData(true), setLoading(false)
          }
        }
      }
    }
  }

  const makeRequest = e => {
    e.preventDefault()
    router.push(`/thankyou`)
    ga.event({
      action: 'generate_lead',
    })
    fetch(
      `https://api.telegram.org/bot6173056848:AAE0eviFsiQtx0CWxEJyBizEdl_zhaJ0P1w/sendMessage?chat_id=@edetalRequests&text=Запит на підбір BayrakParts з ЛП! ${
        ' Вінкод : ' +
        vin +
        ', запчастина : ' +
        part +
        ' .Клієнт ' +
        name +
        ' ' +
        numberPhone
      }`
    )
  }
  return (
    <>
      <Head>
        <title>Купити автозапчастини || BayrakParts</title>
        <meta
          name="description"
          content="Запчатини до Hyundai/KIA , Toyota/Lexus, Nissan, Mazda, Honda, Subaru, BMW, Volkswagen. У нас Ви можете купити запчастини до ходової частини, двигуна, кузову, трансмісії, комплекти для ТО, комплекти ГРМ, водяні помпи, масла, фільтра, амортизатори, сайлентблоки. В наявності більше 50000 запчастин. Відправляємо в день замовлення. "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.page_content}>
          <h1>Підберемо запчастини за 20 хвилин!</h1>
          <div className={styles.how_we_work}>
            <h2>Підкажіть що шукаєте</h2>
            <div></div>
            <h2 className={styles.show_in_desctop}>Знаєте номер запчастини?</h2>
          </div>
          <div className={styles.how_we_work}>
            <form
              className={styles.box_for_work}
              onSubmit={e => makeRequest(e)}
            >
              <div className={styles.description_request}>
                1. Вінкод (знаходиться у свідоцтві про реєстрацію або у додатку
                'ДІЯ')
              </div>
              <input
                className={styles.input_vin}
                placeholder="VIN *"
                required
                minLength={17}
                onChange={e => setVin(e.target.value)}
              />
              <div className={styles.description_request}>
                2. Запчастина яку шукаєте
              </div>
              <input
                className={styles.input_part}
                placeholder="Наприклад водяна помпа *"
                required
                minLength={5}
                onChange={e => setPart(e.target.value)}
              />
              <div className={styles.description_request}>
                3. Ваше ім'я та номер телефону
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
              <button className={styles.submit_button} type="submit">
                Надіслати запит
              </button>
            </form>
            {arrowRight}
            <h2 className={styles.show_on_mobile}>Знаєте номер запчастини?</h2>
            {loading ? (
              <div className={styles.box_for_work}>
                <Spiner />
              </div>
            ) : (
              <div className={styles.box_for_work}>
                <div className={styles.description_request}>
                  Введіть номер запчастини
                </div>
                <input
                  className={styles.input_vin}
                  placeholder="наприклад : GDB3480"
                  required
                  minLength={17}
                  onChange={e => setArticle(e.target.value)}
                />
                <button
                  className={styles.submit_button}
                  onClick={e => searchArticle(e)}
                >
                  Знайти
                </button>
                {noData ? (
                  <div className={styles.noData}>
                    Такого артикулу не знайшли...
                  </div>
                ) : null}
                <div className={styles.description_request}>
                  Або бажаєте пошукати по марці та моделі
                </div>
                <Link
                  href="/"
                  className={styles.submit_button}
                  onClick={() =>
                    ga.event({
                      action: 'generate_lead',
                    })
                  }
                >
                  Перейти до пошуку
                </Link>
              </div>
            )}
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
          <h2 className={styles.why_we}>Потрібно ще швидше?</h2>
          <div className={styles.messangers_container}>
            <h2 className={styles.why_we}>Одразу пишіть нам</h2>
            <div className={styles.messangers_container_dir}>
              <Link href="https://telegram.me/eDetalStore">
                <img src="https://edetal.store/media/Telegram_(software)-Logo.wine.svg" />
              </Link>
              <Link href="viber://chat?number=%2B380937289485">
                <img src="https://edetal.store/media/Viber-Icon-Purple-Logo.wine.svg" />
              </Link>
              <Link href="https://wa.me/380937289485/">
                <img src="https://edetal.store/media/WhatsApp-Logo.wine.svg" />
              </Link>
            </div>
            <h2 className={styles.why_we}>Або телефонуйте</h2>
            <Link href="tel:+380937289485" className={styles.call_me_btn}>
              {tel}Зателефонувати{' '}
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default LP_Parts
