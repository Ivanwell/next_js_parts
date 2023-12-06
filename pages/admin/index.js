import Link from 'next/link'
import styles from '../../styles/Admin.module.css'
import { useEffect, useState } from 'react'
import { getSession, signIn } from 'next-auth/react'

const Admin = () => {
  const [loading, setLoading] = useState(true)
  const [username, setUserName] = useState('')

  useEffect(() => {
    const checkLog = async () => {
      const session = await getSession()

      if (!session) {
        signIn()
      } else {
        setUserName(session.user.name)
        setLoading(false)
      }
    }
    checkLog()
  }, [])

  if (loading) {
    return (
      <>
        <main className={styles.main}>
          <div className={styles.greenwall}></div>
          <div className={styles.content_container}>
            <h1>Завантаження</h1>
          </div>
          <div className={styles.greenwall}></div>
        </main>
      </>
    )
  }

  if (username === 'Ivanwell') {
    return (
      <>
        <main className={styles.main}>
          <div className={styles.greenwall}></div>
          <div className={styles.content_container}>
            <h1>Адмін панель BayrakParts</h1>
            <h1>Вітаємо {username}</h1>
            <div className={styles.nav_buttons_container}>
              <Link className={styles.nav_button} href="/admin/add_to_stock">
                Додати товар
              </Link>
              <Link className={styles.nav_button} href="/admin/items_in_stock">
                Товари на складі
              </Link>
              <Link
                className={styles.nav_button}
                href="/admin/upload_price_masterteile"
              >
                Завантажити прайс мастертелі
              </Link>
            </div>
          </div>
          <div className={styles.greenwall}></div>
        </main>
      </>
    )
  } else {
    return (
      <>
        <main className={styles.main}>
          <div className={styles.greenwall}></div>
          <div className={styles.content_container}>
            <h1>У Вас немає доступу до цієї сторінки</h1>
          </div>
          <div className={styles.greenwall}></div>
        </main>
      </>
    )
  }
}

export default Admin
