import styles from '../../styles/Track_order.module.css'
import {
  statusNotProccesedYet,
  rejectOrder,
  inDepartment,
  inRoadToCustomer,
  orderInProcess,
  orderCompleted,
} from '@/components/SVGs/SVGs'
import { useState } from 'react'

const Spiner = () => {
  return (
    <div className={styles.lds_facebook}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

const Track_Order = () => {
  const [searchedOrder, setSearchedOrder] = useState(null)
  const [orderNumber, setOrderNumber] = useState('')
  const [loading, setLoading] = useState(false)

  const trackOrder = async () => {
    if (orderNumber === '') {
      return
    }
    setLoading(true)
    const res = await fetch(
      `https://api.edetal.store/findOrder/${orderNumber}`,
      {
        method: 'GET',
      }
    )
    const body = await res.json()

    if (body === null) {
      setSearchedOrder('no such order')
    } else {
      setSearchedOrder(body)
    }
    setOrderNumber('')
    setLoading(false)
  }

  return (
    <>
      <main className={styles.main}>
        {!loading ? (
          <div className={styles.content_container}>
            <h1>Вітаємо!</h1>
            <h2>Тут ви можете відстежити своє замовлення</h2>
            <div className={styles.search_container}>
              <h2>Введіть номер Вашого замовлення</h2>
              <input
                className={styles.input_order_number}
                placeholder="номер замовлення"
                onChange={e => setOrderNumber(e.target.value)}
              />
              <button
                className={styles.track_order_btn}
                onClick={() => trackOrder()}
              >
                Відстежити
              </button>
            </div>
            {searchedOrder === 'no such order' ? (
              <div className={styles.order_status_container_reject}>
                {' '}
                Не знайдено такого номеру замовлення. Перевірте будь ласка номер
                ще раз.
              </div>
            ) : searchedOrder ? (
              <div
                className={
                  searchedOrder.status === 'Замовлення виконане'
                    ? styles.order_status_container_complete
                    : searchedOrder.status === 'У нас на складі' ||
                      searchedOrder.status === 'Замовлення в обробці' ||
                      searchedOrder.status === 'В дорозі до покупця' ||
                      searchedOrder.status === 'В поштовому відділенні' ||
                      searchedOrder.status === 'Товар прямує до нас на склад'
                    ? styles.order_status_container
                    : searchedOrder.status === 'Відмова постачальника'
                    ? styles.order_status_container_reject
                    : styles.order_status_container_new
                }
              >
                <label>Номер {searchedOrder.order_id}</label>
                <br />

                <div className={styles.order_status_direct}>
                  {searchedOrder.status ===
                  'Замовлення створене, та ще не обробилось нашою системою' ? (
                    <>{statusNotProccesedYet}</>
                  ) : searchedOrder.status === 'Відмова постачальника' ? (
                    <>{rejectOrder}</>
                  ) : searchedOrder.status === 'В поштовому відділенні' ? (
                    <>{inDepartment}</>
                  ) : searchedOrder.status === 'В дорозі до покупця' ||
                    searchedOrder.status === 'Товар прямує до нас на склад' ? (
                    <>{inRoadToCustomer}</>
                  ) : searchedOrder.status === 'Замовлення в обробці' ? (
                    <>{orderInProcess}</>
                  ) : searchedOrder.status === 'Замовлення виконане' ? (
                    <>{orderCompleted}</>
                  ) : null}
                  {searchedOrder.status}
                </div>
                <br />
                <labe>Оновлено : {searchedOrder.lastUpdateTime}</labe>
              </div>
            ) : null}
          </div>
        ) : (
          <div className={styles.content_container}>
            <h1>У пошуках вашого замовлення</h1>
            <Spiner />
          </div>
        )}
      </main>
    </>
  )
}

export default Track_Order
