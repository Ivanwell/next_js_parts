'use client'

import { useState } from 'react'
import styles from '../../styles/Order_list.module.css'
import { useRouter } from 'next/router'

const Order = ({ data }) => {
  const [choosedStatus, setChoosedStatus] = useState(data.status)
  const [loading, setLoading] = useState(false)
  const id = data._id
  const router = useRouter()

  const updateOrderStatus = async () => {
    setLoading(true)
    const date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    if (month < 10) {
      month = `0${month}`
    }
    let day = date.getDate()
    if (day < 10) {
      day = `0${day}`
    }
    const hour = date.getHours()
    let minutes = date.getMinutes()
    if (minutes < 10) {
      minutes = `0${minutes}`
    }

    const finalDate = `${day}.${month}.${year}, ${hour}:${minutes}`
    let token = await fetch(
      `https://api.bonapart.pro/updateOrderStatus/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({
          statusOrder: choosedStatus,
          lastUpdateTime: finalDate,
        }),
      }
    )
    setLoading(false)
  }

  const goToOrderDetails = () => {
    router.push(`/admin/order_details/${data.order_id}`)
  }

  const statuses = [
    'Замовлення в обробці',
    'Товар прямує до нас на склад',
    'У нас на складі',
    'В дорозі до покупця',
    'В поштовому відділенні',
    'Замовлення виконане',
    'Відмова постачальника',
    'Замовлення створене, та ще не обробилось нашою системою',
  ]

  return (
    <div className={styles.order_item}>
      <label>Номер замовлення</label>
      <span
        className={
          choosedStatus === 'Замовлення виконане'
            ? styles.order_item_compelte
            : choosedStatus === 'У нас на складі' ||
              choosedStatus === 'Замовлення в обробці' ||
              choosedStatus === 'В дорозі до покупця' ||
              choosedStatus === 'В поштовому відділенні' ||
              choosedStatus === 'Товар прямує до нас на склад'
            ? styles.order_item_process
            : choosedStatus === 'Відмова постачальника'
            ? styles.order_item_reject
            : styles.order_item_new
        }
        onClick={() => goToOrderDetails()}
      >
        {data.order_id}
      </span>
      <label>Статус</label>
      <select
        className={styles.select_status}
        onChange={e => setChoosedStatus(e.target.value)}
      >
        <option value={data.status} choosed>
          {data.status}
        </option>
        {statuses.map(status => {
          if (status === data.status) {
          } else return <option value={status}>{status}</option>
        })}
      </select>
      <button
        className={styles.update_status_btn}
        onClick={() => updateOrderStatus()}
      >
        {loading ? '...' : 'Оновити статус'}
      </button>
    </div>
  )
}

const OrderList = ({ orders }) => {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.greenwall}></div>
        <div className={styles.order_list_container}>
          <h1>Замовлення клієнтів</h1>
          {orders.map(order => (
            <Order data={order} />
          ))}
        </div>
        <div className={styles.greenwall}></div>
      </main>
    </>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch(`https://api.bonapart.pro/getOrders`, {
    method: 'GET',
  })

  const body = await res.json()

  return {
    props: {
      orders: body,
    },
  }
}

export default OrderList
