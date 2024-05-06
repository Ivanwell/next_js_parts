import styles from '../../styles/Product.module.css'
import { circuleDoesNotFit, fitsInCircule } from '../SVGs/SVGs'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setSelectedCar } from '@/global_state/features/cardata_redux'
import { useRouter } from 'next/router'

const SuitabilityContainer = ({ fits, fullPath }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const linkQuery = useSelector(
    state => state.dataSelectscartReducer.value.selectedCar
  )

  const changeCar = () => {
    dispatch(setSelectedCar(''))
    if (
      router.asPath.includes('product') ||
      router.asPath.includes('categories')
    ) {
      router.push(router.asPath.split('?')[0])
    }
  }

  return (
    <>
      {fits === 'false' ? (
        <div className={styles.suitability_container}>
          <span className={styles.question_suitable}>
            Не впевнені чи підійде запчастина?
          </span>
          <span className={styles.suggestion_suitable}>
            Оберіть авто в формі вище та перевірте
          </span>
        </div>
      ) : fits === 'does not fit' ? (
        <div className={styles.not_suitability_container}>
          <span className={styles.warning_cont}>
            {circuleDoesNotFit}НЕ підходить до Вашого авто
          </span>
          <span className={styles.suggestion_to_find_cont}>
            <Link
              href={`/categories/${
                fullPath[fullPath.length - 1].eng
              }${linkQuery}`}
            >
              Підібрати під моє авто
            </Link>
            {/* <span onClick={changeCar}>Обрати інше авто</span> */}
          </span>
        </div>
      ) : (
        <div className={styles.fits_suitability_container}>
          <span className={styles.fits_content}>
            {fitsInCircule}Підходить до Вибраного авто
          </span>
        </div>
      )}
    </>
  )
}

export default SuitabilityContainer
