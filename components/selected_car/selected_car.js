import styles from '../../styles/Links.module.css'
import Link from 'next/link'
import { arrowRight1 } from '../SVGs/SVGs'
import { useSelector } from 'react-redux'

const SelectedCar = () => {
  const globalBrand = useSelector(
    state => state.dataSelectscartReducer.value.globalBrand
  )

  const globalModel = useSelector(
    state => state.dataSelectscartReducer.value.globalModel
  )

  const globalEngine = useSelector(
    state => state.dataSelectscartReducer.value.engine
  )
  return (
    <>
      {globalBrand || globalModel || globalEngine ? (
        <ul div className={styles.links}>
          <h3>Обране авто:</h3>
          {globalBrand ? (
            <li>
              <Link href={`/?brand=${globalBrand}`}>
                {arrowRight1}
                <span>{globalBrand}</span>
              </Link>
            </li>
          ) : null}
          {globalBrand && globalModel ? (
            <li>
              <Link href={`/?brand=${globalBrand}&model=${globalModel}`}>
                {arrowRight1}
                <span>{globalModel}</span>
              </Link>
            </li>
          ) : null}
          {globalEngine && globalBrand && globalModel ? (
            <li>
              <Link
                href={`/?brand=${globalBrand}&model=${globalModel}&engine=${globalEngine}`}
              >
                {arrowRight1}
                <span>{globalEngine}</span>
              </Link>
            </li>
          ) : null}
          {globalEngine && globalBrand && globalModel ? (
            <li>
              <button>Скасувати</button>
            </li>
          ) : null}
        </ul>
      ) : null}
    </>
  )
}

export default SelectedCar
