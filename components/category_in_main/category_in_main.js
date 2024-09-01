import styles from '../../styles/Category_in_main.module.css'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import Image from 'next/image'

const CategoryInMain = () => {
  const query = useSelector(
    state => state.dataSelectscartReducer.value.selectedCar
  )

  return (
    <div className={styles.container_for_items_row}>
      <Link
        href={`/categories/filtry-komplektuyuchi${query}`}
        className={styles.category_cont}
      >
        <span>Деталі для ТО</span>
        <Image
          src="https://backend.bayrakparts.com/images/media/detali-dlya-to-min-250.png"
          loading="lazy"
          alt="to"
          fill={true}
          style={{
            maxHeight: '80%',
            maxWidth: '80%',
            objectFit: 'contain',
            top: '30px',
            left: '30px',
          }}
        />
      </Link>
      <Link
        href={`/categories/amortyzatsiya${query}`}
        className={styles.category_cont}
      >
        <span>Амортизатори</span>
        <Image
          src="https://backend.bayrakparts.com/images/media/amortyzator-250.png"
          loading="lazy"
          alt="shocks"
          fill={true}
          style={{
            maxHeight: '80%',
            maxWidth: '80%',
            objectFit: 'contain',
            top: '30px',
            left: '30px',
          }}
        />
      </Link>
      <Link
        href={`/categories/systema-oholodzhennya${query}`}
        className={styles.category_cont}
      >
        <span>Система охолодження</span>
        <Image
          src="https://backend.bayrakparts.com/images/media/systema-oholodzennya-min-250.png"
          loading="lazy"
          alt="radiators"
          fill={true}
          style={{
            maxHeight: '80%',
            maxWidth: '80%',
            objectFit: 'contain',
            top: '30px',
            left: '30px',
          }}
        />
      </Link>
      <Link href={`/categories/shasi${query}`} className={styles.category_cont}>
        <span>Ходова частина</span>
        <Image
          src="https://backend.bayrakparts.com/images/media/hodova-chastyna-min-250.png"
          loading="lazy"
          alt="chassis"
          fill={true}
          style={{
            maxHeight: '80%',
            maxWidth: '80%',
            objectFit: 'contain',
            top: '30px',
            left: '30px',
          }}
        />
      </Link>
      <Link
        href={`/categories/dvygun${query}`}
        className={styles.category_cont}
      >
        <span>Двигун</span>
        <Image
          src="https://backend.bayrakparts.com/images/media/dvygun-min-250.png"
          loading="lazy"
          alt="engine"
          fill={true}
          style={{
            maxHeight: '80%',
            maxWidth: '80%',
            objectFit: 'contain',
            top: '30px',
            left: '30px',
          }}
        />
      </Link>
      <Link
        href={`/categories/kuzov-skladovi${query}`}
        className={styles.category_cont}
      >
        <span>Кузов</span>
        <Image
          src="https://backend.bayrakparts.com/images/media/pngegg (7).png"
          loading="lazy"
          alt="body"
          fill={true}
          style={{
            maxHeight: '80%',
            maxWidth: '80%',
            objectFit: 'contain',
            top: '30px',
            left: '30px',
          }}
        />
      </Link>
      <Link
        href={`/categories/galmivna-systema${query}`}
        className={styles.category_cont}
      >
        <span>Гальмівна система</span>
        <Image
          src="https://backend.bayrakparts.com/images/media/pngegg (4).png"
          loading="lazy"
          alt="brakes"
          fill={true}
          style={{
            maxHeight: '80%',
            maxWidth: '80%',
            objectFit: 'contain',
            top: '30px',
            left: '30px',
          }}
        />
      </Link>
      <Link
        href={`/categories/pryvid${query}`}
        className={styles.category_cont}
      >
        <span>Трансмісія</span>
        <Image
          src="https://backend.bayrakparts.com/images/media/transmision1-min-250.png"
          loading="lazy"
          alt="transmission"
          fill={true}
          style={{
            maxHeight: '80%',
            maxWidth: '80%',
            objectFit: 'contain',
            top: '30px',
            left: '30px',
          }}
        />
      </Link>
    </div>
  )
}

export default CategoryInMain
