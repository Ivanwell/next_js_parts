'use client'
import styles from '../../styles/Footer.module.css'
import { scedj, tel, mail, instagram } from '../SVGs/SVGs'
import Link from 'next/link'
import Script from 'next/script'

const NewFooter = () => {
  return (
    <footer className={styles.whole_footer}>
      <Script
        strategy="lazyOnload"
        src="https://a1.avto.pro/partnership/js?bt=4&amp;sid=682851&amp;s=avtopro.ua"
      />
      <div className={styles.whole_footer_container}>
        <ul className={styles.cont_for_partners}>
          <label className={styles.column_name}>Наші партнери</label>
          <div className="pro-seller-label-banner"></div>
          <a
            href="https://avtopro.ua/catalog/"
            className="pro-seller-label-anchor"
          >
            Автопро - маркетплейс запчастей
          </a>
        </ul>
        <ul className={styles.column_links}>
          <label className={styles.column_name}>Про компанію</label>
          <li className={styles.column_link}>
            <Link href="/aboutus">Коротко про нашу компанію</Link>
          </li>
          <li className={styles.column_link}>
            <Link href="/contacts">Як з нами зв'язатись?</Link>
          </li>
          <li className={styles.column_link}>
            <Link href="/leave_request">Залишити заявку</Link>
          </li>
          <li className={styles.column_link}>
            <Link href="https://www.instagram.com/bayrakparts">
              Ми в інстаграмі
            </Link>
          </li>
        </ul>
        <ul className={styles.column_links}>
          <label className={styles.column_name}>Підтримка клієнтів</label>
          <li className={styles.column_link}>
            <Link href="/payment_and_delivery">Доставка</Link>
          </li>
          <li className={styles.column_link}>
            <Link href="/payment_and_delivery">Оплата</Link>
          </li>
          <li className={styles.column_link}>
            <Link href="/return_policy">Повернення</Link>
          </li>
          <li className={styles.column_link}>
            <Link href="/reklamatsia">Рекламація</Link>
          </li>
          <li className={styles.column_link}>
            <Link href="/how_to_order">Як підібрати запчастину?</Link>
          </li>
        </ul>
        <ul className={styles.column_links}>
          <label className={styles.column_name}>Швидкий зв'язок з нами</label>
          <li className={styles.column_link}>Моб. тел. 093-728-93-84</li>
          <li className={styles.column_link}>
            E-mail : office@bayrakparts.com
          </li>
          <li className={styles.column_link}>
            Месенджери : Viber, Telegram, WhatsApp
          </li>
          <li className={styles.column_link}>ПН-СБ 9:00 - 19:00</li>
        </ul>
      </div>
      <div className={styles.footer_for_mobile}>
        <div className={styles.footer_row}>{scedj}ПН-ПТ 9:00 - 18:30</div>
        <a href="tel:+380937289485" className={styles.footer_row}>
          {tel} +38 (093)-728-94-85
        </a>
        <a
          className={styles.footer_row}
          href="https://www.instagram.com/bayrakparts"
        >
          {instagram} Ми в інстаграмі
        </a>
        <div className={styles.footer_row}>{mail}office@bayrakparts.com</div>
        <label className={styles.column_name}>Наші партнери</label>
        <div className="pro-seller-label-banner"></div>
        <a
          href="https://avtopro.ua/catalog/"
          className="pro-seller-label-anchor"
        >
          Автопро - маркетплейс запчастей
        </a>
        <span>© 2024 Всі права захищено</span>
      </div>
    </footer>
  )
}

export default NewFooter
