import styles from '../../styles/Category_in_main.module.css'
import Link from 'next/link'

const CategoryInMain = () => {
  return (
    <div className={styles.container_for_items_row}>
      <Link
        href="/categories/filtry-komplektuyuchi"
        className={styles.category_cont}
      >
        <span>Деталі для ТО</span>
        <img
          src="https://bayrakparts.com/media/detali-dlya-to-min.png"
          loading="lazy"
        ></img>
      </Link>
      <Link href="/categories/amortyzatsiya" className={styles.category_cont}>
        <span>Амортизатори</span>
        <img
          src="https://bayrakparts.com/media/amortyzator.png"
          loading="lazy"
        ></img>
      </Link>
      <Link
        href="/categories/systema-oholodzhennya"
        className={styles.category_cont}
      >
        <span>Система охолодження</span>
        <img
          src="https://bayrakparts.com/media/systema-oholodzennya-min.png"
          loading="lazy"
        ></img>
      </Link>
      <Link href="/categories/shasi" className={styles.category_cont}>
        <span>Ходова частина</span>
        <img
          src="https://bayrakparts.com/media/hodova-chastyna-min.png"
          loading="lazy"
        ></img>
      </Link>
      <Link href="/categories/dvygun" className={styles.category_cont}>
        <span>Двигун</span>
        <img
          src="https://bayrakparts.com/media/dvygun-min.png"
          loading="lazy"
        ></img>
      </Link>
      <Link
        href="/categories/aksesuary-zasoby-po-doglyadu-dod.tovary"
        className={styles.category_cont}
      >
        <span>Аксесуари</span>
        <img
          src="https://bayrakparts.com/media/aksesuary-min.png"
          loading="lazy"
        ></img>
      </Link>
      <Link href="/categories/elektryka" className={styles.category_cont}>
        <span>Електричні частини</span>
        <img
          src="https://bayrakparts.com/media/electryka-min.png"
          loading="lazy"
        ></img>
      </Link>
      <Link href="/categories/pryvid" className={styles.category_cont}>
        <span>Трансмісія</span>
        <img
          src="https://bayrakparts.com/media/transmision1-min.png"
          loading="lazy"
        ></img>
      </Link>
    </div>
  )
}

export default CategoryInMain
