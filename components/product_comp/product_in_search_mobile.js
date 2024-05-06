import styles from '../../styles/Product.module.css'
import {
  heartIcon,
  newBuscetIcon,
  doesNotFit,
  fitsIndicator,
  orderIcon,
} from '../SVGs/SVGs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const Product_in_search_mobile = ({ fitsLocal, product }) => {
  const router = useRouter()

  const linkQuery = useSelector(
    state => state.dataSelectscartReducer.value.selectedCar
  )

  const { image, title, brand, article } = product

  return (
    <div className={styles.product_container_mobile_search}>
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
        <img src={image} alt={title} />
      </div>
      <Link
        href={`/product/${product.link[0].link}${linkQuery}${
          fitsLocal === 'true' ? `&fits=true` : ''
        }`}
      >
        {title} - {brand} {article}
      </Link>
      <div className={styles.cont_for_article_and_usage_mobile}>
        <span>Артикул : {article}</span>
        <span>Стан : новий</span>
      </div>
      <div className={styles.purchise_cont_mobile}>
        {product.supliers[0] ? (
          <div className={styles.price_text}>
            {product.supliers[0].price},00 грн
          </div>
        ) : (
          <div className={styles.price}>------ грн</div>
        )}
        {!product.supliers[0] ? (
          <button className={styles.order_button}>Замовити {orderIcon}</button>
        ) : (
          <button
            className={styles.buy_button}
            onClick={() => {
              router.push(
                `/product/${product.link[0].link}${linkQuery}${
                  fitsLocal === 'true' ? `&fits=true` : ''
                }`
              )
            }}
          >
            Купити{newBuscetIcon}
          </button>
        )}
      </div>
      {product.supliers[0] ? (
        <div className={styles.amount_cont}>
          В наявності {product.supliers[0].amount} шт
        </div>
      ) : (
        <span className={styles.amount_cont_out}>Немає в наявності</span>
      )}
    </div>
  )
}

export default Product_in_search_mobile
