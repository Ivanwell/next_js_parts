import { useRouter } from 'next/router'
import styles from '../../styles/Product_list.module.css'
import Link from 'next/link'
import SuitabilityContainer from '../suitability_container/suitability_container'
import {
  heartIcon,
  fitsIndicator,
  newBuscetIcon,
  orderIcon,
} from '../SVGs/SVGs'

const One_product_in_search = ({ product, fits, linkQuery }) => {
  const router = useRouter()

  const link = `/product/${product.link[0]?.link}${linkQuery}${
    fits === 'true' ? `&fits=true` : ''
  }`

  return (
    <div className={styles.one_product_container}>
      <div className={styles.image_container}>
        {fits === 'true' ? (
          <div className={styles.fit_indicator}>{fitsIndicator}</div>
        ) : null}
        <img src={product.image} alt={product.title} />
      </div>
      <div className={styles.title_and_compatibility}>
        <Link href={link}>
          {product.brand} {product.article} <br /> {product.title}
        </Link>
        <div className={styles.cont_for_article_and_state}>
          <span>Артикул: {product.article}</span>
          <span>Стан : новий</span>
        </div>
        {fits === 'true' ? (
          <SuitabilityContainer fits={fits} fullPath={product.categories[0]} />
        ) : null}
      </div>
      <div className={styles.purchaise_container}>
        <div className={styles.heart_cont}>{heartIcon}</div>
        {product.supliers.length > 0 ? (
          <div className={styles.price_in_search}>
            {product.supliers[0].price},00 грн
          </div>
        ) : (
          <div className={styles.price_in_search}>------- грн</div>
        )}
        <div className={styles.btn_cont}>
          {product.supliers.length > 0 ? (
            <>
              <span className={styles.stock_text}>
                В наявності {product.supliers[0].amount} шт
              </span>
              <button
                className={styles.buy_btn}
                onClick={() => {
                  router.push(link)
                }}
              >
                Купити {newBuscetIcon}
              </button>
            </>
          ) : (
            <>
              <span className={styles.out_stock_text}>Немає в наявності</span>
              <button className={styles.order_btn}>Замовити {orderIcon}</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default One_product_in_search
