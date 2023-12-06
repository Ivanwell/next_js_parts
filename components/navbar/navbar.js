import Link from 'next/link'
import styles from '../../styles/Navbar.module.css'
import { ShopContext } from '../contex/contex'
import { useContext } from 'react'
import { basket } from '../SVGs/SVGs'
import Card from '../card/card'
import { menuSmall } from '../SVGs/SVGs'
import { useRouter } from 'next/router'
import {
  closeMobileMenu,
  tel,
  scedj,
  personWithoutAuth,
  track,
  money,
  personWithAuth,
  newBuscet,
  newbasket,
} from '../SVGs/SVGs'

const Navbar = () => {
  const {
    itemsNumber,
    openCard,
    setOpenCard,
    openMenu,
    setOpenMenu,
    user,
    setUser,
    openedUserMenu,
    setOpenUserMenu,
  } = useContext(ShopContext)

  const router = useRouter()

  const goToOrders = () => {
    setOpenUserMenu(false)
    router.push(`/user/orders/${user.userId}`)
  }

  const logOut = () => {
    setUser(null)
    setOpenUserMenu(false)
    sessionStorage.setItem('user', JSON.stringify(null))
  }

  return (
    <div className={styles.navbar}>
      {openCard === true ? (
        <div className={styles.card_container}>
          <Card />
        </div>
      ) : null}
      {openedUserMenu ? (
        <div className={styles.userMenu}>
          <div onClick={() => goToOrders()}>Мої замовлення</div>
          <Link href="/" onClick={() => setOpenUserMenu(false)}>
            Баланс
          </Link>
          <Link
            href="/user/user_details"
            onClick={() => setOpenUserMenu(false)}
          >
            Особисті дані
          </Link>
          <Link onClick={() => logOut()} href="/">
            Вихід
          </Link>
        </div>
      ) : null}
      {openMenu === true ? (
        <div className={styles.container_menu_modile}>
          <div className={styles.menu_mobile}>
            <button
              className={styles.close_btn_menu}
              onClick={() => {
                setOpenMenu(false)
              }}
            >
              {closeMobileMenu}
            </button>
            <Link
              onClick={() => {
                setOpenMenu(false)
                setOpenCard(false)
              }}
              className={styles.link_big}
              href="/"
            >
              Головна
            </Link>
            <Link
              onClick={() => {
                setOpenMenu(false)
                setOpenCard(false)
              }}
              className={styles.link_big}
              href="/how_to_order"
            >
              Як замовити?
            </Link>
            <Link
              onClick={() => {
                setOpenMenu(false)
                setOpenCard(false)
              }}
              className={styles.link_big}
              href="/vinrequest"
            >
              VIN - запит
            </Link>
            <Link
              onClick={() => {
                setOpenMenu(false)
                setOpenCard(false)
              }}
              className={styles.link_big}
              href="/aboutus"
            >
              Про нас
            </Link>
            <Link
              onClick={() => {
                setOpenMenu(false)
                setOpenCard(false)
              }}
              className={styles.link_big}
              href="/contacts"
            >
              Контакти
            </Link>
          </div>
        </div>
      ) : null}
      <div className={styles.shop_title}>
        <div className={styles.not_in_mobile}></div>
        <div className={styles.scedj_in_head}>
          {scedj}
          ПН-ПТ 9:00 - 18:30
        </div>
        <div className={styles.tel_in_head}>
          {tel}
          <a href="tel:+380937289485">+38(093)-728-94-85</a>
        </div>
        <div className={styles.icons_in_nav}>
          {!user?.name ? null : <span title={user.name}> {user.name}</span>}
          {!user?.name ? (
            <Link href="/auth/login" title="Ваш аккаунт">
              {personWithoutAuth}
            </Link>
          ) : (
            <span title={user.name} onClick={() => setOpenUserMenu(true)}>
              {personWithAuth}
            </span>
          )}
          <Link href="/track_order" title="Відстежити замовлення">
            {track}
          </Link>
          <div
            className={styles.busket_container_in_desctop}
            title="Корзина"
            onClick={() => {
              openCard === true ? setOpenCard(false) : setOpenCard(true)
            }}
          >
            {newBuscet}
            {itemsNumber > 0 ? (
              <div className={styles.items_in_busket}>{itemsNumber}</div>
            ) : null}
          </div>
        </div>
      </div>
      <div className={styles.links}>
        <div
          className={styles.link_small}
          onClick={() => {
            setOpenMenu(true)
          }}
        >
          {menuSmall}
        </div>
        <Link
          className={styles.link_big_and_small}
          onClick={() => setOpenCard(false)}
          href="/"
        >
          BAYRAKPARTS
        </Link>
        <Link
          className={styles.link_big}
          onClick={() => setOpenCard(false)}
          href="/"
        >
          Головна
        </Link>
        <Link
          className={styles.link_big}
          onClick={() => setOpenCard(false)}
          href="/how_to_order"
        >
          Як замовити?
        </Link>
        {/* <Link
          className={styles.link_big}
          onClick={() => setOpenCard(false)}
          href="/vinrequest"
        >
          VIN - запит
        </Link> */}
        <Link
          className={styles.link_big}
          onClick={() => setOpenCard(false)}
          href="/payment_and_delivery"
        >
          Доставка та оплата
        </Link>
        <Link
          className={styles.link_big}
          onClick={() => setOpenCard(false)}
          href="/aboutus"
        >
          Про нас
        </Link>
        <Link
          className={styles.link_big}
          onClick={() => setOpenCard(false)}
          href="/contacts"
        >
          Контакти
        </Link>
        <Link
          className={styles.link_big}
          onClick={() => setOpenCard(false)}
          href="/return_policy"
        >
          Повернення
        </Link>
        <div
          className={styles.busket_container}
          title="Корзина"
          onClick={() => {
            openCard === true ? setOpenCard(false) : setOpenCard(true)
          }}
        >
          {basket}
          {itemsNumber > 0 ? (
            <div className={styles.items_in_busket_mobile}>{itemsNumber}</div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Navbar

/*<div className={styles.search_inNavBar}>
        <div></div>
        <div className={styles.phone_nad_logo}>
          <div></div>
          <div>
            <b>BayrakParts</b>
          </div>
          <a className={styles.phone} href="tel:+380963884554">
            +38(093)-728-94-85
          </a>
        </div>
        <input
          className={styles.search_input}
          placeholder="   введіть номер запчастини"
        ></input>
        <Link href="/" className={styles.cart_link}>
          Корзина{" "}
          <div className={styles.busket}>
            {busket}
            {itemsNumber === 0 ? null : (
              <div className={styles.summ_items}>{itemsNumber}</div>
            )}
          </div>
        </Link>
        <div></div>
      </div>
      <div className={styles.shop_title}>
        <div></div>
        <div>Доставка безкоштовна при замовленні на суму від 2000 грн</div>
        <div></div>
      </div>
      
      <div className={styles.selectAndCheck}>
        <select
          className={styles.selectModel}
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          {BRANDS.map((Brand) => (
            <option value={Brand}>{Brand}</option>
          ))}
        </select>
        <select
          className={styles.selectModel}
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          {MODELS.find((product) => product.brandName === brand).Models.map(
            (model1) => (
              <option value={model1}>{model1}</option>
            )
          )}
        </select>
        <select
          className={styles.selectModel}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES_TO_SELECT.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </select>
        <select
          className={styles.selectModel}
          value={part}
          onChange={(e) => setPart(e.target.value)}
        >
          {EXECT_PARTS.find(
            (castogory3) => castogory3.catigory === category
          ).Models.map((part) => (
            <option value={part}>{part}</option>
          ))}
        </select>
        <button className={styles.search_button} onClick={() => goToSearch()}>
          Знайти
        </button>
      </div>*/
