import styles from '../../styles/NewNavbar.module.css'
import Link from 'next/link'
import {
  info,
  personWithoutAuth,
  garage1,
  heart,
  car,
  oil,
  newbasket,
  menuBurger,
  search,
  smallBuscet,
  arrowLeft,
  onearrowright,
  tel,
  infor,
  chat,
  discbrake,
  droplet,
  electric,
  tiress,
  hodovaa,
  accecories,
  remni,
  kuzov,
} from '../SVGs/SVGs'
import { useContext, useState } from 'react'
import { ShopContext } from '../contex/contex'
import { useRouter } from 'next/router'

const NewNavbar = () => {
  const {
    itemsNumber,
    cartItems,
    cartsItemsObj,
    openAddedToCard,
    setOpenAddedToCard,
  } = useContext(ShopContext)
  const [openedSearch, setOpenedSearch] = useState(false)
  const [openedMenuMobile, setOpenedMobileMenu] = useState(false)
  const [article, setArticle] = useState('')
  const [loading, setLoading] = useState(false)
  const [noResults, setNoResults] = useState(false)
  var total = 0

  const router = useRouter()

  var sum = cartItems.reduce(function (accumulator, currentValue) {
    return (
      accumulator + currentValue.price * cartsItemsObj[currentValue.article]
    )
  }, total)

  const goToStockProductPage = () => {
    router.push(`/stock/${article.replace(/[- /]/g, '').toUpperCase()}`)
  }

  const goToSearchProductPage = () => {
    router.push(`/search/item/${article.replace(/[- /]/g, '')}`)
  }

  const goToSearchUTProductPage = item => {
    router.push({
      pathname: `/search/ut_item/${article.replace(/[- /]/g, '')}`,
    })
  }

  const goToSearchTMProductPage = item => {
    router.push({
      pathname: `/search/tm_stock_item/${article
        .replace(/[- /]/g, '')
        .toUpperCase()}`,
    })
  }

  const searchInTMProductPage = async () => {
    const res = await fetch(
      `https://technomir.bayrakparts.com/findProductTechnomir/${article
        .replace(/[- /.]/g, '')
        .toUpperCase()}`,
      {
        method: 'GET',
      }
    )
    const body = await res.json()
    if (body) {
      const item = {
        title: body.title,
        price: Math.ceil(+body.price * 39 * 1.15),
        img: body.image,
        article: body.article,
        brandName: body.brand,
        lvivStock: body.amount,
        otherStock: '-',
      }
      return item
    } else {
      return null
    }
  }

  const goToSearchMasterTeileProductPage = () => {
    router.push({
      pathname: `/search/mt_item/${article
        .replace(/[- /]/g, '')
        .toUpperCase()}`,
    })
  }

  const searchInMasterTeileProductPage = async () => {
    const res = await fetch(
      `https://masterteile.bayrakparts.com/findProductMasterteile/${article
        .replace(/[- /.]/g, '')
        .toUpperCase()}`,
      {
        method: 'GET',
      }
    )
    const body = await res.json()
    if (body) {
      const item = {
        title: body.title,
        price: body.price,
        img: body.image,
        article: body.article,
        brandName: body.brand,
        lvivStock: body.amount,
        otherStock: '-',
      }
      return item
    } else {
      return null
    }
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

      if (stockInLviv === undefined && otherStock === undefined) {
        return null
      } else {
        const item = {
          title: body.details[0]?.title,
          img: body.details[0].images[0]?.fullImagePath,
          price: Math.ceil(body.details[0].yourPrice.amount * 1.12),
          article: body.details[0].article.replace(/[- /]/g, ''),
          brandName: body.details[0].brand.name,
          lvivStock: stockInLviv?.remain,
          otherStock: otherStock?.remain,
        }

        return item
      }
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
    setNoResults(false)
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
            const dataFromMT = await searchInMasterTeileProductPage()
            if (dataFromMT) {
              goToSearchMasterTeileProductPage()
              setLoading(false)
            } else {
              setNoResults(true),
                setLoading(false),
                setTimeout(() => {
                  setNoResults(false)
                }, 7000)
            }
          }
        }
      }
    }
  }

  // const goToStockProductPage = () => {
  //   router.push(`/stock/${article.replace(/[- /]/g, '').toUpperCase()}`)
  // }

  // const goToSearchProductPage = () => {
  //   router.push(`/search/item/${article.replace(/[- /]/g, '')}`)
  // }

  // const goToSearchUTProductPage = item => {
  //   router.push({
  //     pathname: `/search/ut_item/${article.replace(/[- /]/g, '')}`,
  //     query: item,
  //   })
  // }

  // const goToSearchTMProductPage = item => {
  //   router.push({
  //     pathname: `/search/tm_stock_item/${article.replace(/[- /]/g, '')}`,
  //     query: {
  //       item,
  //       productDescription: {
  //         fits: [],
  //         details: null,
  //         oe: [{ brand: item.brandName, number: item.article }],
  //       },
  //     },
  //   })
  // }

  // const searchInTMProductPage = async () => {
  //   const data = {
  //     article1: article.replace(/[- /]/g, ''),
  //   }

  //   const res1 = await fetch(
  //     `https://api.edetal.store/partsTM1?article1=${encodeURIComponent(
  //       data.article1
  //     )}`,
  //     {
  //       method: 'GET',
  //     }
  //   )
  //   const brandID = await res1.json()

  //   if (!brandID) {
  //     return null
  //   }

  //   const res2 = await fetch(
  //     `https://api.edetal.store/partsTM2?article1=${encodeURIComponent(
  //       data.article1
  //     )}&brandID1=${brandID?.data[0].brandId}`,
  //     {
  //       method: 'GET',
  //     }
  //   )
  //   const info = await res2.json()

  //   const res3 = await fetch(
  //     `https://api.edetal.store/partsTM3?article1=${encodeURIComponent(
  //       data.article1
  //     )}&brandID1=${brandID.data[0].brandId}`,
  //     {
  //       method: 'GET',
  //     }
  //   )
  //   const price1 = await res3.json()

  //   const min = Math.min.apply(
  //     Math,
  //     price1.data[0].rests.map(function (o) {
  //       return o.deliveryTime
  //     })
  //   )

  //   const isLargeNumber = element => element.deliveryTime === min
  //   const index1 = price1.data[0].rests.findIndex(isLargeNumber)

  //   const dataTM = {
  //     title: price1.data[0].descriptionUa || price1.data[0].descriptionRus,
  //     img: info.data?.images[0]?.image,
  //     price: Math.ceil(price1.data[0].rests[index1].price * 1.12),
  //     article: price1.data[0].code,
  //     deliveryTime: price1.data[0].rests[index1].deliveryTime,
  //     quantity: price1.data[0].rests[index1].quantity,
  //     brandName: info.data.brand,
  //     weight: price1.data[0].weight,
  //     deliveryType: price1.data[0].rests[index1].deliveryType,
  //   }

  //   return dataTM
  // }

  // const searchInUnickTrade = async () => {
  //   const data = {
  //     article1: article.replace(/[- /]/g, ''),
  //   }

  //   const res = await fetch(
  //     `https://api.edetal.store/partsUTR?article1=${encodeURIComponent(
  //       data.article1
  //     )}`,
  //     {
  //       method: 'GET',
  //     }
  //   )
  //   const body = await res.json()

  //   if (!body) {
  //     return null
  //   }
  //   {
  //     const stockInLviv = body?.details[0].remains.find(
  //       storage => storage.storage.name === 'Львів'
  //     )

  //     const otherStock = body?.details[0].remains.find(
  //       storage => storage.storage.name === 'Kиїв Правий'
  //     )

  //     const preOrder = body?.details[0].remains.find(
  //       storage => storage.storage.name === 'Під замовлення (2-4 дні)'
  //     )

  //     let img = body.details[0].images[0]?.fullImagePath

  //     if (!img) {
  //       img =
  //         'https://as2.ftcdn.net/v2/jpg/04/00/24/31/1000_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg'
  //     }

  //     let stock = otherStock?.remain
  //     if (stock === '') {
  //       stock = preOrder?.remain
  //     }

  //     const item = {
  //       title: body.details[0]?.title,
  //       img: img,
  //       price: Math.ceil(body.details[0].yourPrice.amount * 1.12),
  //       article: body.details[0].article.replace(/[- /]/g, ''),
  //       brandName: body.details[0].brand.name,
  //       lvivStock: stockInLviv?.remain,
  //       otherStock: stock,
  //       preOrder: preOrder?.remain,
  //     }

  //     return item
  //   }
  // }

  // const searchInStock = async () => {
  //   const res = await fetch(
  //     `https://api.edetal.store/findProduct/${article
  //       .replace(/[- /]/g, '')
  //       .toUpperCase()}`,
  //     {
  //       method: 'GET',
  //     }
  //   )

  //   const body = await res.json()
  //   return body
  // }

  // const searchInBMParts = async () => {
  //   const res = await fetch(
  //     `https://api.edetal.store/bmparts?article1=${encodeURIComponent(
  //       article
  //     )}`,
  //     {
  //       method: 'GET',
  //     }
  //   )

  //   const body = await res.json()
  //   const array = Object.values(body.products)
  //   const finaldata = array.find(
  //     product =>
  //       product.article.replace(/[- ]/g, '') === article.replace(/[- ]/g, '')
  //   )
  //   return finaldata
  // }

  // const searchArticle = async e => {
  //   e.preventDefault()
  //   setNoResults(false)
  //   setLoading(true)
  //   const dataFromStock = await searchInStock()
  //   setLoading(false)
  //   if (dataFromStock) {
  //     goToStockProductPage()
  //     setLoading(false)
  //   } else {
  //     setLoading(true)
  //     const dataFromBM = await searchInBMParts()
  //     setLoading(false)
  //     if (dataFromBM) {
  //       setLoading(false)
  //       goToSearchProductPage(dataFromBM)
  //     } else {
  //       setLoading(true)
  //       const dataFromUT = await searchInUnickTrade()
  //       setLoading(false)
  //       if (dataFromUT) {
  //         setLoading(false)
  //         goToSearchUTProductPage(dataFromUT)
  //       } else {
  //         setLoading(true)
  //         const dataFromTM = await searchInTMProductPage()
  //         setLoading(false)
  //         if (dataFromTM) {
  //           goToSearchTMProductPage(dataFromTM)
  //           setLoading(false)
  //         } else {
  //           setLoading(false)
  //           setNoResults(true)
  //           setTimeout(() => {
  //             setNoResults(false)
  //           }, 10000)
  //         }
  //       }
  //     }
  //   }
  // }

  return (
    <div className={styles.whole_header}>
      {openAddedToCard ? (
        <div className={styles.added_to_cart_cont}>
          <div className={styles.choose_to_proceed_or_back}>
            <div>Товар успішно доданий до кошика</div>
            <Link
              href="/checkout"
              onClick={() => setOpenAddedToCard(false)}
              className={styles.btn_checkout_btn}
            >
              Оформити замовлення
            </Link>
            <button
              className={styles.btn_back_btn}
              onClick={() => setOpenAddedToCard(false)}
            >
              Повернутись назад
            </button>
          </div>
        </div>
      ) : null}
      {openedMenuMobile ? (
        <div className={styles.mobile_menu_container}>
          <div className={styles.mobile_menu_links_container}>
            <div className={styles.title_in_mobile_menu}>BAYRAKPARTS</div>
            <Link
              href="/"
              className={styles.links_menu_mobile}
              onClick={() => setOpenedMobileMenu(false)}
            >
              <Link href="/">{car}Головна</Link>
              {onearrowright}
            </Link>
            <Link
              href="/"
              className={styles.links_menu_mobile}
              onClick={() => setOpenedMobileMenu(false)}
            >
              <Link href="/how_to_order">{search}Пошук</Link>
              {onearrowright}
            </Link>
            <Link
              href="/leave_request"
              className={styles.links_menu_mobile}
              onClick={() => setOpenedMobileMenu(false)}
            >
              <Link href="/leave_request">{chat}Залишити заявку</Link>
              {onearrowright}
            </Link>
            <Link
              href="/aboutus"
              className={styles.links_menu_mobile}
              onClick={() => setOpenedMobileMenu(false)}
            >
              <Link href="/aboutus">{infor}Про нас</Link>
              {onearrowright}
            </Link>
            <Link
              href="/checkout"
              className={styles.links_menu_mobile}
              onClick={() => setOpenedMobileMenu(false)}
            >
              <Link href="/checkout">{smallBuscet}Корзина</Link>
              {onearrowright}
            </Link>
            <Link
              href="/track_order"
              className={styles.links_menu_mobile}
              onClick={() => setOpenedMobileMenu(false)}
            >
              <Link href="/track_order">{garage1}Відстежити</Link>
              {onearrowright}
            </Link>
            <Link
              href="/contacts"
              className={styles.links_menu_mobile}
              onClick={() => setOpenedMobileMenu(false)}
            >
              <Link href="/contacts">{tel}Контакти</Link>
              {onearrowright}
            </Link>
            <div
              className={styles.links_menu_mobile}
              onClick={() => setOpenedMobileMenu(false)}
            >
              {arrowLeft}
            </div>
          </div>
        </div>
      ) : null}
      <div className={styles.header_links}>
        <Link className={styles.link_big} href="/">
          {info}
          ГОЛОВНА
        </Link>
        <Link className={styles.link_big} href="/payment_and_delivery">
          {info}
          ДОСТАВКА ТА ОПЛАТА
        </Link>
        <Link className={styles.link_big} href="/contacts">
          {info}
          КОНТАКТИ
        </Link>
      </div>
      <div className={styles.discount_box}>
        ВСТИГНІТЬ ОТРИМАТИ ЗИМОВУ ЗНИЖКУ 20%
      </div>
      <header className={styles.main_header}>
        <div className={styles.header_top_desctop}>
          <div className={styles.header_logo}>BAYRAKPARTS</div>
          <div className={styles.login}>
            <Link href="/track_order" title="Відстежити замовлення">
              {garage1}
            </Link>
            <Link href="/payment_and_delivery">
              {heart}
              <div className={styles.number_in_circule_container}>0</div>
            </Link>
            <Link href="/auth/login">
              {personWithoutAuth}
              Увійти
            </Link>
          </div>
        </div>
        {!openedSearch ? (
          <div className={styles.header_top_mobile}>
            <div
              className={styles.menu_burger_svg}
              onClick={() => setOpenedMobileMenu(true)}
            >
              {menuBurger}
            </div>
            <div className={styles.header_logo}>BAYRAKPARTS</div>
            <div className={styles.menu_burger_svg}>
              <div
                className={styles.menu_burger_svg}
                onClick={() => setOpenedSearch(true)}
              >
                {search}
              </div>
              <Link href="/checkout" className={styles.busket_mobile_cont}>
                {itemsNumber > 0 ? (
                  <div className={styles.items_in_circule}>{itemsNumber}</div>
                ) : null}

                {smallBuscet}
              </Link>
            </div>
          </div>
        ) : (
          <div className={styles.header_top_mobile}>
            <button
              onClick={() => setOpenedSearch(false)}
              className={styles.header_top_mobile_back}
            >
              {arrowLeft}
            </button>
            <form
              className={styles.search_container_mobile}
              onSubmit={e => searchArticle(e)}
            >
              <input
                className={styles.search_input_mobile}
                onChange={e => setArticle(e.target.value)}
                placeholder="Введіть номер запчастини..."
              />
              <button type="submit" className={styles.search_mobele_btn}>
                {!loading ? search : '---'}
              </button>
            </form>
          </div>
        )}

        <div className={styles.header_main}>
          <div className={styles.select_part}>{car}Автозапчастини</div>
          <form
            className={styles.search_container}
            onSubmit={e => searchArticle(e)}
          >
            <input
              className={styles.search_input}
              onChange={e => setArticle(e.target.value)}
              placeholder="Введіть номер запчастини..."
            />
            <button type="submit">
              {!loading ? 'Пошук' : <div className={styles.dots_bars_4}></div>}
            </button>
          </form>
          <div className={styles.basket_container}>
            <Link href="/checkout" className={styles.basket_and_numbers}>
              {newbasket}
              <div className={styles.near_basket_items}>
                <span>{itemsNumber} товарів</span>
                <span className={styles.small_font}># роздріб</span>
              </div>
            </Link>
            <div className={styles.total_sum}>{sum === 0 ? '0' : sum} грн</div>
          </div>
        </div>
        <div className={styles.header_bottom}>
          <ul className={styles.list_categories}>
            <li className={styles.category}>
              <Link href="/search/олива">{droplet}Оливи</Link>
            </li>
            <li className={styles.category}>
              <Link href="/categories/discs">{discbrake}Гальма</Link>
            </li>
            <li className={styles.category}>
              <Link href="/search/фільтр">{oil}Фільтри</Link>
            </li>
            <li className={styles.category}>
              <Link href="/categories/amortizator">{hodovaa}Ходова</Link>
            </li>
            <li className={styles.category}>
              <Link href="/categories/grm">{remni}ГРМ</Link>
            </li>

            <li className={styles.category}>
              <Link href="/search/бампер">{accecories}Кузов</Link>
            </li>
            <li className={styles.category}>
              <Link href="/search/датчик abs">{electric}Електрика</Link>
            </li>
            <li className={styles.category}>
              <Link href="/search/шина">{tiress}Шини</Link>
            </li>
            <li className={styles.category}>
              <Link href="/search/домкрат">{kuzov}Аксесуари</Link>
            </li>
          </ul>
        </div>
        {noResults ? (
          <div className={styles.no_result}>
            Не знайдено такого артикулу. Перевірте будь ласка чи артикул вірно
            вказаний
          </div>
        ) : null}
      </header>
    </div>
  )
}

export default NewNavbar
