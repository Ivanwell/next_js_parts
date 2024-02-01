import styles from '../../styles/Category_in_main.module.css'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const CategoryInMain = () => {
  const globalEngine = useSelector(
    state => state.dataSelectscartReducer.value.engine
  )

  const globalBrand = useSelector(
    state => state.dataSelectscartReducer.value.globalBrand
  )
  const globalModel = useSelector(
    state => state.dataSelectscartReducer.value.globalModel
  )

  let query = ''
  if (globalBrand && globalModel && globalEngine) {
    query = `?brand=${globalBrand}&model=${globalModel}&engine=${globalEngine}`
  }
  return (
    <div className={styles.container_for_items_row}>
      <Link
        href={`/categories/filtry-komplektuyuchi${query}`}
        className={styles.category_cont}
      >
        <span>Деталі для ТО</span>
        <img
          src="https://backend.bayrakparts.com/images/media/detali-dlya-to-min.png"
          loading="lazy"
        ></img>
      </Link>
      <Link
        href={`/categories/amortyzatsiya${query}`}
        className={styles.category_cont}
      >
        <span>Амортизатори</span>
        <img
          src="https://backend.bayrakparts.com/images/media/amortyzator.png"
          loading="lazy"
        ></img>
      </Link>
      <Link
        href={`/categories/systema-oholodzhennya${query}`}
        className={styles.category_cont}
      >
        <span>Система охолодження</span>
        <img
          src="https://backend.bayrakparts.com/images/media/systema-oholodzennya-min.png"
          loading="lazy"
        ></img>
      </Link>
      <Link href={`/categories/shasi${query}`} className={styles.category_cont}>
        <span>Ходова частина</span>
        <img
          src="https://backend.bayrakparts.com/images/media/hodova-chastyna-min.png"
          loading="lazy"
        ></img>
      </Link>
      <Link
        href={`/categories/dvygun${query}`}
        className={styles.category_cont}
      >
        <span>Двигун</span>
        <img
          src="https://backend.bayrakparts.com/images/media/dvygun-min.png"
          loading="lazy"
        ></img>
      </Link>
      <Link
        href={`/categories/aksesuary-zasoby-po-doglyadu-dod.tovary${query}`}
        className={styles.category_cont}
      >
        <span>Аксесуари</span>
        <img
          src="https://backend.bayrakparts.com/images/media/aksesuary-min.png"
          loading="lazy"
        ></img>
      </Link>
      <Link
        href={`/categories/elektryka${query}`}
        className={styles.category_cont}
      >
        <span>Електричні частини</span>
        <img
          src="https://backend.bayrakparts.com/images/media/electryka-min.png"
          loading="lazy"
        ></img>
      </Link>
      <Link
        href={`/categories/pryvid${query}`}
        className={styles.category_cont}
      >
        <span>Трансмісія</span>
        <img
          src="https://backend.bayrakparts.com/images/media/transmision1-min.png"
          loading="lazy"
        ></img>
      </Link>
    </div>
  )
}

export default CategoryInMain
