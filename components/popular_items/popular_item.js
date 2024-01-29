import styles from '../../styles/ItemInMain.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

const PopularItem = productData => {
  const { name, brand, price, image, amount, article } = productData.productData

  const item = {
    title: name,
    price: Math.ceil(price * 1.15),
    img: image,
    article: article,
    brandName: brand,
    lvivStock: amount,
    otherStock: '-',
    id: productData.productData._id,
  }

  const link = `/stock/${item.article}`

  const router = useRouter()

  return (
    <Link className={styles.item_im_main} href={link}>
      <div className={styles.item_brand}>{brand}</div>
      <img src={image} alt={name} loading="lazy" />
      <span className={styles.item_price} type={price}>
        {item.price} ГРН
      </span>
      <span className={styles.item_title} title={name}>
        {name}
      </span>
    </Link>
  )
}

export default PopularItem
