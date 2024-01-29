import styles from '../../styles/NewNavbar.module.css'
import Link from 'next/link'
import {
  info,
  personWithoutAuth,
  garage1,
  heart,
  car,
  fireIgn,
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

const NewNavbar = () => {
  const dispatch = useDispatch()
  const sumury = useSelector(state => state.cartReducer.value.total)
  const sumury2 = useSelector(state => state.cartReducer.value.sum)
  const openedProposal = useSelector(
    state => state.cartReducer.value.openedCheckoutProposal
  )
  const isImageShown = useSelector(
    state => state.cartReducer.value.imgCont.visibility
  )
  const fullImage = useSelector(state => state.cartReducer.value.imgCont.image)
  const [openedSearch, setOpenedSearch] = useState(false)
  const [openedMenuMobile, setOpenedMobileMenu] = useState(false)
  const [article, setArticle] = useState('')
  const [loading, setLoading] = useState(false)
  const [noResults, setNoResults] = useState(false)

  const router = useRouter()

  const searchInStock = async e => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch(
      `http://backend.bayrakparts.com/get_item_info/${article
        .replace(/[- /]/g, '')
        .toUpperCase()}`,
      {
        method: 'GET',
      }
    )

    const body = await res.json()
    if (body) {
      router.push(`/product/${body.link[0].link}`)
    } else {
      setNoResults(true)
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
            <div>Товар успішно доданий до кошика</div>
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
      <div className={styles.main_header}>
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
            <Link href="/">
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
                {sumury > 0 ? (
                  <div className={styles.items_in_circule}>{sumury}</div>
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
              onSubmit={e => searchInStock(e)}
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
            onSubmit={e => searchInStock(e)}
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
                <span>{sumury} товарів</span>
                <span className={styles.small_font}># роздріб</span>
              </div>
            </Link>
            <div className={styles.total_sum}>
              {sumury2 === 0 ? '0' : sumury2} грн
            </div>
          </div>
        </div>
        <div className={styles.header_bottom}>
          <ul className={styles.list_categories}>
            <li className={styles.category}>
              <Link href="/categories/olyva-zmazka--i-tehnichni">
                {droplet}Оливи та рідини
              </Link>
            </li>
            <li className={styles.category}>
              <Link href="/categories/galmivna-systema">{discbrake}Гальма</Link>
            </li>
            <li className={styles.category}>
              <Link href="/categories/systema-zapalyuvannya-rozzharyuvannya">
                {fireIgn}Запалення
              </Link>
            </li>
            <li className={styles.category}>
              <Link href="/categories/obigriv-kondytsioner">
                {hodovaa}Опалення/конд
              </Link>
            </li>
            <li className={styles.category}>
              <Link href="/categories/rulova-systema">
                {remni}Рульова система
              </Link>
            </li>

            <li className={styles.category}>
              <Link href="/categories/kuzov-skladovi">{accecories}Кузов</Link>
            </li>
            <li className={styles.category}>
              <Link href="/categories/systema-vypusku-vpusku-povitrya">
                {electric}Впуск/випуск
              </Link>
            </li>
            <li className={styles.category}>
              <Link href="/categories/systemy-pidgotovky-podachi-palyva">
                {tiress}Подача палива
              </Link>
            </li>
            <li className={styles.category}>
              <Link href="/categories/aksesuary-zasoby-po-doglyadu-dod.tovary">
                {kuzov}
                Аксесуари
              </Link>
            </li>
          </ul>
        </div>
        {noResults ? (
          <div className={styles.no_result}>
            Не знайдено такого артикулу. Перевірте будь ласка чи артикул вірно
            вказаний
          </div>
        ) : null}
      </div>
    </header>
  )
}

export default NewNavbar
