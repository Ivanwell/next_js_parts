import styles from '../../styles/ProductNew.module.css'
import { useRouter } from 'next/router'
import { ShopContext } from '../contex/contex'
import { useContext } from 'react'

const ProductNew = productData => {
  const { addToCart, setOpenCard, isMaximumItems, user } =
    useContext(ShopContext)
  const router = useRouter()

  const goToItem = item => {
    setOpenCard(false)
    const article = productData.data.article
    router.push({
      pathname: `/search/item/${article}`,
      query: { brand: productData.data.brand },
    })
  }

  const img1 = productData.data.default_image.slice(5).replace(/[&\/\\]/g, '/')
  const url = 'https://cdn.bm.parts/photos/'
  let img = url + img1

  if (img === 'https://cdn.bm.parts/photos/') {
    img =
      'https://as2.ftcdn.net/v2/jpg/04/00/24/31/1000_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg'
  } else {
    img = img
  }

  const item = {
    title: productData.data.name,
    price: Math.ceil(productData.data.price * 1.12),
    img: img,
    article: productData.data.article,
    brandName: productData.data.brand,
    lvivStock: productData.data.in_stocks[0].quantity,
    otherStock: productData.data.in_others.quantity,
  }

  const goToCheckOut = () => {
    setOpenCard(false)
    if (item.lvivStock === '-' && item.otherStock === '-') {
      addToCart(item)
    } else {
      addToCart(item)
      router.push(`/checkout`)
    }
  }

  return (
    <div className={styles.productItemNew}>
      {isMaximumItems.active === true &&
      item.article === isMaximumItems.article ? (
        <div className={styles.error_max_quantity}>
          {isMaximumItems.aviability ? (
            <>В наявності всього : {isMaximumItems.quantity} шт</>
          ) : (
            <>
              Товар тільки під замовлення. Уточніть будь ласка деталі у
              менеджера
            </>
          )}
        </div>
      ) : null}
      <div className={styles.productBrand}>{item.brandName}</div>
      <img src={item.img}></img>
      <span className={styles.productDescription} onClick={() => goToItem()}>
        {item.title}
      </span>
      <span className={styles.article_and_brand}>
        {item.brandName}
        <br />
        <div className={styles.article}>{item.article}</div>
      </span>
      <span className={styles.deliver_for_desctop}>
        {productData.data.in_stocks[0]?.quantity > 0 ||
        productData.data.in_stocks[0].quantity === '> 10' ? (
          <div className={styles.today}>
            Сьогодні <br />
            {productData.data.in_stocks[0].quantity} шт
          </div>
        ) : null}
        {(productData.data.in_others.quantity > 0 &&
          productData.data.in_stocks[0].quantity === '-') ||
        (productData.data.in_others.quantity === '> 10' &&
          productData.data.in_stocks[0].quantity === '-') ? (
          <div className={styles.tommorrow}>
            Завтра <br /> {productData.data.in_others.quantity} шт
          </div>
        ) : null}
        {productData.data.in_others.quantity === '-' &&
        productData.data.in_stocks[0].quantity === '-' ? (
          <div className={styles.pre_order}>
            Під <br /> замовлення
          </div>
        ) : null}
      </span>
      {!user ? (
        <span className={styles.product_price}>{item.price} грн</span>
      ) : (
        <span className={styles.product_price}>
          {Math.ceil(item.price * 0.95)} грн
        </span>
      )}
      <div className={styles.container_for_price_and_buttom}>
        <span>
          {productData.data.in_stocks[0]?.quantity > 0 ||
          productData.data.in_stocks[0].quantity === '> 10' ? (
            <div className={styles.today}>
              Сьогодні <br />
              {productData.data.in_stocks[0].quantity} шт
            </div>
          ) : null}
          {(productData.data.in_others.quantity > 0 &&
            productData.data.in_stocks[0].quantity === '-') ||
          (productData.data.in_others.quantity === '> 10' &&
            productData.data.in_stocks[0].quantity === '-') ? (
            <div className={styles.tommorrow}>
              Завтра <br /> {productData.data.in_others.quantity} шт
            </div>
          ) : null}
          {productData.data.in_others.quantity === '-' &&
          productData.data.in_stocks[0].quantity === '-' ? (
            <div className={styles.pre_order}>
              Під <br /> замовлення
            </div>
          ) : null}
        </span>
        <span className={styles.product_price_mobile}>{item.price} грн</span>
        <button onClick={() => goToItem()}>Деталі</button>
      </div>
      <div className={styles.container_for_buttons}>
        <button
          className={styles.buy_button}
          onClick={() => goToCheckOut(item)}
        >
          Замовити
        </button>
        <br />
        <button className={styles.check_button} onClick={() => addToCart(item)}>
          Додати до кошика
        </button>
      </div>
    </div>
  )
}

export default ProductNew
