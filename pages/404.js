import Link from 'next/link'
import styles from '../styles/Error.module.css'

export default function Custom404() {
  return (
    <div className={styles.main}>
      <div className={styles.container_full}>
        <div className={styles.error_container}></div>
        <div className={styles.cont_for_descr_and_link}>
          <h1>Упс... Такої сторінки не знайдено</h1>
          <Link href="/">На головну</Link>
        </div>
      </div>
    </div>
  )
}
