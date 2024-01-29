import Link from 'next/link'
import styles from '../styles/Error.module.css'

export default function Custom500() {
  return (
    <div className={styles.main}>
      <div className={styles.container_full}>
        <div className={styles.error_500_container}></div>
        <div className={styles.cont_for_descr_and_link}>
          <h1>Упс... Щось з нашим сервером</h1>
          <h1>Ми вже над цим працюємо!</h1>
          <Link href="/">На головну</Link>
        </div>
      </div>
    </div>
  )
}
