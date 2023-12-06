import styles from '../../../styles/Order_details.module.css'
import Link from 'next/link'

const OrderItem = order => {
  console.log(order.amount)
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
  return (
    <div className={styles.order_details_main}>
      <h2 className={styles.title}>
        <Link href="/admin/order_list" className={styles.link_to_list}>
          До списку замовлень
        </Link>
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
        <div>
          {' '}
          Отримувач : <b>{productData.delivery_info.pib}</b>
        </div>
        <div> Номер телефону : {productData.delivery_info.phone}</div>
        <div> Місто : {productData.delivery_info.city}</div>
        <div> Відділення : {productData.delivery_info.department}</div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {
  if (params.order_details == '') {
    return
  }
  const orderNumber = params.order_details

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
