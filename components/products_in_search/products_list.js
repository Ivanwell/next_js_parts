import styles from '../../styles/Product_list.module.css'
import Pagination from '../pagination_in_search/pagination'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import LinksHistory from '../link_history_in_product/link_history_in_product'
import Product_in_search_mobile from '../product_comp/product_in_search_mobile'
import No_products_found from './no_products_found'
import One_product_in_search from './one_product_in_search'

const ProductsList = ({ productData, fits, amount }) => {
  const router = useRouter()
  const linkQuery = useSelector(
    state => state.dataSelectscartReducer.value.selectedCar
  )

  return (
    <div className={styles.product_list_container}>
      <div className={styles.product_list_content}>
        <LinksHistory />
      </div>
      <div className={styles.list_box}>
        {productData.length > 0 && router.query.viewport != 'mobile' ? (
          productData.map(product => (
            <One_product_in_search
              key={product.article}
              product={product}
              fits={fits}
              linkQuery={linkQuery}
            />
          ))
        ) : productData.length > 0 && router.query.viewport === 'mobile' ? (
          productData.map(product => (
            <Product_in_search_mobile
              key={product.article}
              product={product}
              fitsLocal={fits}
              linkQuery={linkQuery}
            />
          ))
        ) : (
          <No_products_found />
        )}
      </div>
      <Pagination amount={amount} />
    </div>
  )
}

export default ProductsList
