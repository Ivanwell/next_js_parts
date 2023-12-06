import styles from '../../styles/User_info.module.css'
import { ShopContext } from '@/components/contex/contex'
import { useContext } from 'react'

const UserDetails = () => {
  const { user } = useContext(ShopContext)
  return (
    <>
      <main className={styles.main}>
        <div className={styles.greenwall}></div>
        <div className={styles.informaion_page}>
          <h2>Дані користувача</h2>
          <div className={styles.information_fields_box}>
            <div className={styles.information_field}>
              ПІБ :
              <div className={styles.details_description}>{user?.name}</div>
            </div>
            <div className={styles.information_field}>
              ID користувача :
              <div className={styles.details_description}>{user?.userId}</div>
            </div>
            <div className={styles.information_field}>
              Email адрес :
              <div className={styles.details_description}>{user?.email}</div>
            </div>
            <div className={styles.information_field}>
              Номер телефону :
              <div className={styles.details_description}>{user?.phone}</div>
            </div>
            <div className={styles.information_field}>
              Місто :
              <div className={styles.details_description}>{user?.npCity}</div>
            </div>
            <div className={styles.information_field}>
              Відділення НП :
              <div className={styles.details_description}>
                {user?.npDepartment}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.greenwall}></div>
      </main>
    </>
  )
}

export default UserDetails
