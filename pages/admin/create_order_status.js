import { useState, useEffect } from 'react'
import styles from '../../styles/Add_to_stock.module.css'
import { getSession, signIn } from 'next-auth/react'
import axios from 'axios'

const AddOrderStatus = () => {
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const [orderStatus, setOrderStatus] = useState({
    order_id: '',
    status: 'Замовлення створнене, та ще не обробилось нашою системою',
  })

  // useEffect(() => {
  //   const checkLog = async () => {
  //     const session = await getSession()

  //     if (!session) {
  //       signIn()
  //     } else {
  //       setChecking(false)
  //     }
  //   }
  //   checkLog()
  // }, [])

  // if (checking) {
  //   return <h2>Завантаження</h2>
  // }

  const createOrderStatus = async e => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch(`https://api.edetal.store/getOrders`, {
      method: 'GET',
    })

    const body = await res.json()
    const orderNumber = body[body.length - 1].order_id + 1
    let token = await fetch('https://api.edetal.store/create_order_status', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        order_id: orderNumber,
        status: 'Замовлення створнене, та ще не обробилось нашою системою',
      }),
    })
    setOrderStatus({
      order_id: '',
      status: '',
    })
    setLoading(false)
  }
  return (
    <>
      <main className={styles.main}>
        <div className={styles.greenwall}></div>
        <form
          className={styles.add_product_form}
          onSubmit={e => createOrderStatus(e)}
        >
          {!loading ? <h1>Додавання замовлення</h1> : <h1> Додаємо...</h1>}
          <label className={styles.name_of_field}> Номер замовлення</label>
          <input
            className={styles.add_options_filed}
            value={orderStatus.order_id}
            required
            onChange={e => {
              setOrderStatus({
                ...orderStatus,
                order_id: e.target.value,
              })
            }}
          />
          <label className={styles.name_of_field}> Наша наявність</label>
          <input
            type="checkbox"
            onChange={e => {
              if (e.target.checked) {
                setOrderStatus({
                  ...orderStatus,
                  status: 'Товар у нас на складі',
                })
              } else {
                setOrderStatus({
                  ...orderStatus,
                  status: 'На обробці',
                })
              }
            }}
          />
          <button type="submit" className={styles.submit_button}>
            Створити замовлення
          </button>
        </form>
        <div className={styles.greenwall}></div>
      </main>
    </>
  )
}

export default AddOrderStatus
