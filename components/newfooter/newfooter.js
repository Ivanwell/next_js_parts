import styles from '../../styles/Footer.module.css'
import { scedj, tel, mail } from '../SVGs/SVGs'
import Link from 'next/link'

const NewFooter = () => {
  return (
    <footer className={styles.whole_footer}>
      <div className={styles.whole_footer_container}>
        <ul className={styles.column_links}>
          <label className={styles.column_name}>Про компанію</label>
          <li className={styles.column_link}>
            <Link href="/aboutus">Коротко про нашу компанію</Link>
          </li>
          <li className={styles.column_link}>
            <Link href="/newcontacts">Як з нами зв'язатись?</Link>
          </li>
          <li className={styles.column_link}>
            <Link href="/leave_request">Залишити заявку</Link>
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
          <label className={styles.column_name}>Популярні товари</label>
          <li className={styles.column_link}>Оливи 0W20</li>
          <li className={styles.column_link}>Оливи 5W30</li>
          <li className={styles.column_link}>Оливи 10W40</li>
          <li className={styles.column_link}>Антифриз червоний</li>
          <li className={styles.column_link}>Автолампа 12V</li>
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
        <div className={styles.footer_row}>{mail}office@bayrakparts.com</div>
        <span>© 2023 Всі права захищено</span>
      </div>
    </footer>
  )
}

export default NewFooter
