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
            <Link href={`/?brand=${globalBrand}`}>
              <li>
                {arrowRight1}
                <span>{globalBrand}</span>
              </li>
            </Link>
          ) : null}
          {globalBrand && globalModel ? (
            <Link href={`/?brand=${globalBrand}&model=${globalModel}`}>
              <li>
                {arrowRight1}
                <span>{globalModel}</span>
              </li>
            </Link>
          ) : null}
          {globalEngine && globalBrand && globalModel ? (
            <Link
              href={`/?brand=${globalBrand}&model=${globalModel}&engine=${globalEngine}`}
            >
              <li>
                {arrowRight1}
                <span>{globalEngine}</span>
              </li>
            </Link>
          ) : null}
        </ul>
      ) : null}
    </>
  )
}

export default SelectedCar
