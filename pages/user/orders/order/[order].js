import styles from '../../../../styles/Order_details.module.css'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { ShopContext } from '@/components/contex/contex'
import Link from 'next/link'

const OrderItem = order => {
  return (
    <div className={styles.order_item}>
      <div>{order.orderItem.title}</div>
      <div className={styles.article}>{order.orderItem.article}</div>
      <div>{order.amount} шт</div>
      <div>{order.orderItem.price * order.amount} грн</div>
    </div>
  )
}

const OrderDetails = ({ productData }) => {
  const router = useRouter()
  const { user } = useContext(ShopContext)
  const goBack = () => {
    router.back()
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
      <div className={styles.order_details_main}>
        <h2 className={styles.title}>
          <div className={styles.link_to_list} onClick={() => goBack()}>
            Назад
          </div>
          Деталі замовлення #{productData.order_id}
          <span className={styles.status_title}>{productData.status}</span>
        </h2>
        <div className={styles.order_box}>
          {productData.order_items.map(item => (
            <OrderItem
              orderItem={item}
              amount={productData.items_amount[item.article]}
            />
          ))}
        </div>
        <h2 className={styles.title_delivery}>Деталі доставки</h2>
        <div className={styles.delivery_box}>
          <div className={styles.deivery_oprion}>
            {' '}
            Отримувач : <b>{productData.delivery_info.pib}</b>
          </div>
          <div className={styles.deivery_oprion}>
            {' '}
            Номер телефону : <b>{productData.delivery_info.phone}</b>
          </div>
          <div className={styles.deivery_oprion}>
            {' '}
            Місто : <b>{productData.delivery_info.city}</b>
          </div>
          <div className={styles.deivery_oprion}>
            {' '}
            Відділення : <b>{productData.delivery_info.department}</b>
          </div>
        </div>
        <button className={styles.return_btn} onClick={() => goBack()}>
          назад
        </button>
      </div>
    )
}

export const getServerSideProps = async ({ params }) => {
  if (params.order_details == '') {
    return
  }

  const orderNumber = params.order

  const res = await fetch(`https://api.edetal.store/findOrder/${orderNumber}`, {
    method: 'GET',
  })
  const body = await res.json()

  return {
    props: {
      productData: body,
    },
  }
}

export default OrderDetails
