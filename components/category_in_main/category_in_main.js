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
          src="https://backend.bayrakparts.com/images/media/detali-dlya-to-min-250.png"
          loading="lazy"
        ></img>
      </Link>
      <Link
        href={`https://bayrakparts.com/categories/amortyzatsiya${query}`}
        className={styles.category_cont}
      >
        <span>Амортизатори</span>
        <img
          src="https://backend.bayrakparts.com/images/media/amortyzator-250.png"
          loading="lazy"
        ></img>
      </Link>
      <Link
        href={`https://bayrakparts.com/categories/systema-oholodzhennya${query}`}
        className={styles.category_cont}
      >
        <span>Система охолодження</span>
        <img
          src="https://backend.bayrakparts.com/images/media/systema-oholodzennya-min-250.png"
          loading="lazy"
        ></img>
      </Link>
      <Link
        href={`https://bayrakparts.com/categories/shasi${query}`}
        className={styles.category_cont}
      >
        <span>Ходова частина</span>
        <img
          src="https://backend.bayrakparts.com/images/media/hodova-chastyna-min-250.png"
          loading="lazy"
        ></img>
      </Link>
      <Link
        href={`https://bayrakparts.com/categories/dvygun${query}`}
        className={styles.category_cont}
      >
        <span>Двигун</span>
        <img
          src="https://backend.bayrakparts.com/images/media/dvygun-min-250.png"
          loading="lazy"
        ></img>
      </Link>
      <Link
        href={`https://bayrakparts.com/categories/kuzov-skladovi${query}`}
        className={styles.category_cont}
      >
        <span>Кузов</span>
        <img
          src="https://backend.bayrakparts.com/images/media/pngegg (7).png"
          loading="lazy"
        ></img>
      </Link>
      <Link
        href={`https://bayrakparts.com/categories/galmivna-systema${query}`}
        className={styles.category_cont}
      >
        <span>Гальмівна система</span>
        <img
          src="https://backend.bayrakparts.com/images/media/pngegg (4).png"
          loading="lazy"
        ></img>
      </Link>
      <Link
        href={`https://bayrakparts.com/categories/pryvid${query}`}
        className={styles.category_cont}
      >
        <span>Трансмісія</span>
        <img
          src="https://backend.bayrakparts.com/images/media/transmision1-min-250.png"
          loading="lazy"
        ></img>
      </Link>
    </div>
  )
}

export default CategoryInMain
