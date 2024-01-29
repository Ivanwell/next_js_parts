import {
  statusNotProccesedYet,
  rejectOrder,
  inDepartment,
  inRoadToCustomer,
  orderInProcess,
  orderCompleted,
} from '@/components/SVGs/SVGs'
import styles from '../../styles/Track_order.module.css'
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

const Track_Order = productData => {
  console.log(productData)
  let orderFromParams = null
  if (productData.productData) {
    orderFromParams = productData.productData
  } else if (productData.productData === null) {
    orderFromParams = 'no such order'
  }
  const [searchedOrder, setSearchedOrder] = useState(orderFromParams)
  const [orderNumber, setOrderNumber] = useState('')
  const [loading, setLoading] = useState(false)

  const trackOrder = async () => {
    if (orderNumber === '') {
      return
    }
    setLoading(true)
    const res = await fetch(
      `https://api.bonapart.pro/findOrder/${orderNumber}`,
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

export const getServerSideProps = async ({ params, query }) => {
  const orderNumber = params.track_order
  const res = await fetch(`https://api.bonapart.pro/findOrder/${orderNumber}`, {
    method: 'GET',
  })

  const body = await res.json()

  return {
    props: {
      productData: body,
    },
  }
}

export default Track_Order
