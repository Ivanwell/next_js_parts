import styles from '../../styles/Product.module.css'
import SuitabilityContainer from '../suitability_container/suitability_container'
import {
  heartIcon,
  newBuscetIcon,
  doesNotFit,
  fitsIndicator,
  orderIcon,
} from '../SVGs/SVGs'
import { useDispatch } from 'react-redux'
import { adddToCart } from '@/global_state/features/cart_redux'

const DesctopProdcutCont = ({ fitsLocal, fullPath, item }) => {
  const dispatch = useDispatch()

  const addToCard = () => {
    const newItem = { ...item, quantity: 1 }
    dispatch(adddToCart(newItem))
  }

  const { img, title, brandName, article, price, lvivStock, mobileImage } = item

  return (
    <div className={styles.product_container}>
      <div className={styles.image_container}>
        {fitsLocal === 'does not fit' ? (
          <div className={styles.fits_indicator_near_img}>{doesNotFit}</div>
        ) : fitsLocal === 'true' ? (
          <div className={styles.fits_indicator_near_img}>{fitsIndicator}</div>
        ) : null}
        <img
          src={mobileImage ? mobileImage : img}
          fill={true}
          alt={title}
          loading="lazy"
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className={styles.product_info_container}>
        <h1>
          {title} - {brandName} {article}
        </h1>
        <div className={styles.cont_for_article_and_usage}>
          <span>Артикул : {article}</span>
          <span>Стан : новий</span>
        </div>
        <SuitabilityContainer fits={fitsLocal} fullPath={fullPath} />
      </div>
      <div className={styles.purchaise_container}>
        <div>{heartIcon}</div>
        {price ? (
          <div className={styles.price}>{price},00 грн</div>
        ) : (
          <div className={styles.price}>Ціну уточнюйте</div>
        )}
        <div className={styles.btn_and_stock}>
          {lvivStock ? (
            <span className={styles.stock}>В наявності: {lvivStock} шт</span>
          ) : (
            <span className={styles.out_of_stock}>Немає в наявності</span>
          )}
          {!lvivStock ? (
            <button className={styles.order_button}>
              Замовити {orderIcon}
            </button>
          ) : (
            <button className={styles.buy_button} onClick={addToCard}>
              Купити {newBuscetIcon}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default DesctopProdcutCont
