import styles from '../../styles/Links.module.css'
import Link from 'next/link'
import { arrowRight1 } from '../SVGs/SVGs'
import { useSelector } from 'react-redux'
import { cancel } from '../SVGs/SVGs'
import {
  setGlobalBrand,
  setGlobalModel,
  setGlobalEngine,
} from '@/global_state/features/cardata_redux'
import { useDispatch } from 'react-redux'

const SelectedCar = () => {
  const dispatch = useDispatch()

  const clearCar = e => {
    dispatch(setGlobalBrand(null))
    dispatch(setGlobalModel(null))
    dispatch(setGlobalEngine(null))
  }

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
        <ul className={styles.links}>
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
              <button onClick={clearCar}>{cancel}</button>
            </li>
          ) : null}
        </ul>
      ) : null}
    </>
  )
}

export default SelectedCar
