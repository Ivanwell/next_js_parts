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

const Product_in_mobile = ({ fitsLocal, fullPath, item }) => {
  const dispatch = useDispatch()

  const addToCard = () => {
    const newItem = { ...item, quantity: 1 }
    dispatch(adddToCart(newItem))
  }

  const { img, title, brandName, article, price, lvivStock, discription } = item

  return (
    <div className={styles.product_container_mobile}>
      <div className={styles.image_container_mobile}>
        <div className={styles.like_container}>{heartIcon}</div>
        {fitsLocal === 'does not fit' ? (
          <div className={styles.fits_indicator_near_img_mobile}>
            {doesNotFit}
          </div>
        ) : fitsLocal === 'true' ? (
          <div className={styles.fits_indicator_near_img_mobile}>
            {fitsIndicator}
          </div>
        ) : null}
        <img src={img} alt={title} />
      </div>
      <h1>
        {title} - {brandName} {article}
      </h1>
      <div className={styles.cont_for_article_and_usage_mobile}>
        <span>Артикул : {article}</span>
        <span>Стан : новий</span>
      </div>
      <div className={styles.suitability_cont}>
        <SuitabilityContainer fits={fitsLocal} fullPath={fullPath} />
      </div>
      <div className={styles.purchise_cont_mobile}>
        {price ? (
          <div className={styles.price_text}>{price},00 грн</div>
        ) : (
          <div className={styles.price}>------ грн</div>
        )}
        {!lvivStock ? (
          <button className={styles.order_button}>Замовити {orderIcon}</button>
        ) : (
          <button className={styles.buy_button} onClick={addToCard}>
            Купити{newBuscetIcon}
          </button>
        )}
      </div>
      {lvivStock ? (
        <div className={styles.amount_cont}>В наявності {lvivStock} шт</div>
      ) : (
        <span className={styles.amount_cont_out}>Немає в наявності</span>
      )}
    </div>
  )
}

export default Product_in_mobile
