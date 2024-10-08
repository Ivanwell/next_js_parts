import styles from '../../styles/NewNavbar.module.css'
import Link from 'next/link'
import {
  personWithoutAuth,
  garage1,
  heart,
  car,
  fireIgn,
  newbasket,
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
  closeSvg,
} from '../SVGs/SVGs'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import {
  handleOpenPropToCheck,
  hideFullImage,
} from '@/global_state/features/cart_redux'
import { useDispatch } from 'react-redux'
import New_car_choose_form from '../choose_car_form/new_choose_car_form'
import { useSession, signIn, signOut } from 'next-auth/react'

function NewNavbar() {
  const dispatch = useDispatch()

  const test = async () => {
    const credentials = {
      username: 'Ivanwell',
      password: 'test',
    }

    const res = await fetch('https://api.bayrakparts.com/api/auth/get_user', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    })
    const user = await res.json()
    console.log(user)
  }

  const { data: session } = useSession()

  const sumury = useSelector(state => state.cartReducer.value.total)
  const sumury2 = useSelector(state => state.cartReducer.value.sum)
  const linkQuery = useSelector(
    state => state.dataSelectscartReducer.value.selectedCar
  )
  const openedProposal = useSelector(
    state => state.cartReducer.value.openedCheckoutProposal
  )
  const isImageShown = useSelector(
    state => state.cartReducer.value.imgCont.visibility
  )
  const fullImage = useSelector(state => state.cartReducer.value.imgCont.image)
  const [openedMenuMobile, setOpenedMobileMenu] = useState(false)
  const [article, setArticle] = useState('')
  const [loading, setLoading] = useState(false)
  const [noResults, setNoResults] = useState(false)
  const [manyBrands, setManyBrands] = useState(null)

  const router = useRouter()

  const searchInStockWithDiffBrands = async e => {
    e.preventDefault()
    setNoResults(false)
    setLoading(true)
    const res = await fetch(
      `https://api.bayrakparts.com/api/info/get_products?article=${article
        .replace(/[- ./]/g, '')
        .toUpperCase()}`,
      {
        method: 'GET',
      }
    )

    const body = await res.json()

    if (body.products && body.products.length === 1) {
      router.push(`/product/${body.products[0].link[0].link}${linkQuery}`)
    } else {
      if (body.products.length > 1) {
        setManyBrands(body.products)
      } else {
        setNoResults(true)
      }
    }
    setLoading(false)
  }

  return (
    <header className={styles.whole_header}>
      {isImageShown ? (
        <div
          onClick={() => dispatch(hideFullImage())}
          className={styles.whole_image_cont}
        >
          {' '}
          {closeSvg}
          <img src={fullImage} />
        </div>
      ) : null}
      {openedProposal ? (
        <div className={styles.added_to_cart_cont}>
          <div className={styles.choose_to_proceed_or_back}>
            <Link
              href="/checkout"
              onClick={() => dispatch(handleOpenPropToCheck(false))}
              className={styles.btn_checkout_btn}
            >
              Оформити замовлення
            </Link>
            <button
              className={styles.btn_back_btn}
              onClick={() => dispatch(handleOpenPropToCheck(false))}
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
              <span>{car}Головна</span>
              {onearrowright}
            </Link>
            <Link
              href="/how_to_order"
              className={styles.links_menu_mobile}
              onClick={() => setOpenedMobileMenu(false)}
            >
              <span>{search}Пошук</span>
              {onearrowright}
            </Link>
            <Link
              href="/leave_request"
              className={styles.links_menu_mobile}
              onClick={() => setOpenedMobileMenu(false)}
            >
              <span>{chat}Залишити заявку</span>
              {onearrowright}
            </Link>
            <Link
              href="/aboutus"
              className={styles.links_menu_mobile}
              onClick={() => setOpenedMobileMenu(false)}
            >
              <span>{infor}Про нас</span>
              {onearrowright}
            </Link>
            <Link
              href="/checkout"
              className={styles.links_menu_mobile}
              onClick={() => setOpenedMobileMenu(false)}
            >
              <span>{smallBuscet}Корзина</span>
              {onearrowright}
            </Link>
            <Link
              href="/track_order"
              className={styles.links_menu_mobile}
              onClick={() => setOpenedMobileMenu(false)}
            >
              <span>{garage1}Відстежити</span>
              {onearrowright}
            </Link>
            <Link
              href="/contacts"
              className={styles.links_menu_mobile}
              onClick={() => setOpenedMobileMenu(false)}
            >
              <span>{tel}Контакти</span>
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
      {manyBrands ? (
        <div className={styles.many_brands}>
          <div>Оберіть бренд</div>
          {manyBrands.map((brand, index) => (
            <Link
              key={`brands${index}`}
              onClick={() => setManyBrands(null)}
              href={`/product/${brand.link[0]?.link}`}
            >
              {brand.brand}
              <span>{brand.title}</span>
            </Link>
          ))}
        </div>
      ) : null}
      <div className={styles.discount_box}>
        А ВЖЕ ОСІНЬ! ОТРИМАЙТЕ ЗНИЖКУ 20%
      </div>
      <div className={styles.main_header}>
        <div className={styles.header_top_desctop}>
          <Link href={`/`} className={styles.header_logo}>
            BAYRAKPARTS
          </Link>
          <div className={styles.header_links}>
            <Link className={styles.link_big} href="/">
              ГОЛОВНА
            </Link>
            <Link className={styles.link_big} href="/payment_and_delivery">
              ДОСТАВКА ТА ОПЛАТА
            </Link>
            <Link className={styles.link_big} href="/contacts">
              КОНТАКТИ
            </Link>
          </div>
          <div className={styles.login}>
            <Link href="/track_order" title="Відстежити замовлення">
              {garage1}
            </Link>
            <Link href="/payment_and_delivery" title="Збережені товари">
              {heart}
              <span className={styles.number_in_circule_container}>0</span>
            </Link>
            {session ? (
              'Logout'
            ) : (
              <button className={styles.sign_in_btn} onClick={() => signIn()}>
                {personWithoutAuth}
              </button>
            )}
          </div>
        </div>
        <div className={styles.header_top_mobile}>
          <div
            className={styles.header_logo}
            onClick={() => setOpenedMobileMenu(true)}
          >
            BAYRAKPARTS
          </div>
          <div className={styles.menu_burger_svg}>
            <Link href="/checkout" className={styles.busket_mobile_cont}>
              {garage1}
            </Link>
            <Link href="/checkout" className={styles.busket_mobile_cont_sm}>
              {personWithoutAuth}
            </Link>
            <Link href="/checkout" className={styles.busket_mobile_cont}>
              {heart}
            </Link>
            <Link href="/checkout" className={styles.busket_mobile_cont_sm}>
              {sumury > 0 ? (
                <div className={styles.items_in_circule}>{sumury}</div>
              ) : null}

              {smallBuscet}
            </Link>
          </div>
        </div>

        <div className={styles.header_main}>
          <Link href="/categories" className={styles.select_part}>
            {car}Автозапчастини
          </Link>
          <form
            className={styles.search_container}
            onSubmit={searchInStockWithDiffBrands}
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
              <span className={styles.near_basket_items}>
                <span>{sumury} товарів</span>
                <span className={styles.small_font}># роздріб</span>
              </span>
            </Link>
            <div className={styles.total_sum}>
              {sumury2 === 0 ? '0' : sumury2} грн
            </div>
          </div>
        </div>
        <div className={styles.header_bottom}>
          <ul className={styles.list_categories}>
            <li className={styles.category}>
              <Link href={`/categories/olyva-zmazka--i-tehnichni${linkQuery}`}>
                {droplet}Оливи
              </Link>
            </li>
            <li className={styles.category}>
              <Link href={`/categories/elektryka${linkQuery}`}>
                {discbrake}Електрика
              </Link>
            </li>
            <li className={styles.category}>
              <Link
                href={`/categories/systema-zapalyuvannya-rozzharyuvannya${linkQuery}`}
              >
                {fireIgn}Запалення
              </Link>
            </li>
            <li className={styles.category}>
              <Link href={`/categories/obigriv-kondytsioner${linkQuery}`}>
                {hodovaa}Опалення/конд
              </Link>
            </li>
            <li className={styles.category}>
              <Link href={`/categories/rulova-systema${linkQuery}`}>
                {remni}Кермова
              </Link>
            </li>
            <li className={styles.category}>
              <Link
                href={`/categories/systema-vypusku-vpusku-povitrya${linkQuery}`}
              >
                {electric}Впуск/випуск
              </Link>
            </li>
            <li className={styles.category}>
              <Link
                href={`/categories/systemy-pidgotovky-podachi-palyva${linkQuery}`}
              >
                {tiress}Подача палива
              </Link>
            </li>
            <li className={styles.category}>
              <Link
                href={`/categories/aksesuary-zasoby-po-doglyadu-dod.tovary${linkQuery}`}
              >
                {kuzov}
                Аксесуари
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.mobile_nav_contacts}>
          <div className={styles.header_links}>
            <Link className={styles.link_big} href="/">
              ГОЛОВНА
            </Link>
            <Link className={styles.link_big} href="/payment_and_delivery">
              ДОСТАВКА ТА ОПЛАТА
            </Link>
            <Link className={styles.link_big} href="/contacts">
              КОНТАКТИ
            </Link>
          </div>
        </div>
        <form
          className={styles.mobile_search_from_container}
          onSubmit={searchInStockWithDiffBrands}
        >
          <input
            onChange={e => setArticle(e.target.value)}
            placeholder="Введіть номер запчастини..."
          />
          <button type="submit">{loading ? 'Шукаємо' : 'Пошук'}</button>
        </form>
        {noResults ? (
          <div className={styles.no_result}>
            Не знайдено такого артикулу. Перевірте будь ласка чи артикул вірно
            вказаний
          </div>
        ) : null}
      </div>
      {router.asPath.includes('product') ||
      router.asPath.includes('categories') ||
      router.asPath === `/` ? (
        <New_car_choose_form />
      ) : null}
    </header>
  )
}

export default NewNavbar
