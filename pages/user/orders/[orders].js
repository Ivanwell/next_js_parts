import styles from '../../../styles/UserOrders.module.css'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { ShopContext } from '@/components/contex/contex'
import Link from 'next/link'

const OrderList = ({ orders }) => {
  const router = useRouter()

  const { user } = useContext(ShopContext)

  const goToOrderDetails = orderId => {
    router.push(`/user/orders/order/${orderId}`)
  }

  if (!user) {
    return (
      <div className={styles.page_container_toLogin}>
        <h2> Будь ласка, увійдіть у свій кабінет </h2>
        <Link href="/auth/login" className={styles.goToLoginLink}>
          Увійти
        </Link>
      </div>
    )
  } else
    return (
      <div className={styles.page_container}>
        {orders.length === 0 ? (
          <div className={styles.orders_box}>
            <h3>Ви ще не зробили жодного замовлення</h3>
            <img
              src="https://megaarconline.com/assets/images/emptycart.svg"
              alt="empty_order_cart"
            />
          </div>
        ) : (
          <div className={styles.orders_box}>
            <h2 className={styles.title_orders}>Мої замовлення</h2>
            <div className={styles.order_box_title}>
              <div className={styles.cont_id_order}>ID замовлення</div>
              <div>Час створення</div>
              <div>Статус</div>
            </div>
            {orders.map(order => (
              <div
                className={styles.order_box}
                onClick={() => goToOrderDetails(order.order_id)}
              >
                <div
                  className={
                    order.status === 'Замовлення виконане'
                      ? styles.complete_status
                      : order.status === 'Відмова постачальника'
                      ? styles.reject_status
                      : styles.process_status
                  }
                >
                  {order.order_id}
                </div>
                <div>{order.createdTime}</div>
                <div className={styles.status_cont} title={order.status}>
                  <span
                    className={
                      order.status === 'Замовлення виконане'
                        ? styles.complete_status
                        : order.status === 'Відмова постачальника'
                        ? styles.reject_status
                        : styles.process_status
                    }
                  >
                    {order.status}
                  </span>
                  <br />
                  {order.status === 'Відмова постачальника' ? (
                    <span
                      className={styles.reject_status}
                    >{`(${order.lastUpdateTime})`}</span>
                  ) : order.status === 'Замовлення виконане' ? (
                    <span
                      className={styles.complete_status}
                    >{`(${order.lastUpdateTime})`}</span>
                  ) : (
                    <span
                      className={styles.process_status}
                    >{`(${order.lastUpdateTime})`}</span>
                  )}
                </div>
                <div className={styles.check_btn_cont}>
                  <button
                    className={styles.check_details_btn}
                    onClick={() => goToOrderDetails(order.order_id)}
                  >
                    {' '}
                    Деталі
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
}

export const getServerSideProps = async ({ params }) => {
  const userId = params.orders
  const res = await fetch(`https://api.edetal.store/findOrders/${userId}`, {
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
