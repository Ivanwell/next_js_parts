import styles from '../../styles/OilPart.module.css'
import { useRouter } from 'next/router'

const OilPart = () => {
  const router = useRouter()

  const goToSelectedOil = chooseparametr => {
    const parametr = chooseparametr
    router.push(`/search/${parametr}`)
  }

  return (
    <div className={styles.main_oil_part_container}>
      <h2 className={styles.title_oil}>Моторні оливи</h2>
      <div className={styles.oil_part_container}>
        <button
          onClick={() => goToSelectedOil('олива 0W20')}
          className={styles.oil_btn}
        >
          0W20
        </button>
        <button
          onClick={() => goToSelectedOil('олива 0W30')}
          className={styles.oil_btn}
        >
          0W30
        </button>
        <button
          onClick={() => goToSelectedOil('олива 5W20')}
          className={styles.oil_btn}
        >
          5W20
        </button>
        <button
          onClick={() => goToSelectedOil('олива 5W30')}
          className={styles.oil_btn}
        >
          5W30
        </button>
        <button
          onClick={() => goToSelectedOil('олива 10W30')}
          className={styles.oil_btn}
        >
          10W30
        </button>
        <button
          onClick={() => goToSelectedOil('олива 10W40')}
          className={styles.oil_btn}
        >
          10W40
        </button>
      </div>
      <h2 className={styles.title_oil}>Трансмісійні оливи</h2>
      <div className={styles.oil_part_container}>
        <button
          onClick={() => goToSelectedOil('олива 75w80')}
          className={styles.oil_btn}
        >
          75W80
        </button>
        <button
          onClick={() => goToSelectedOil('олива 75W85')}
          className={styles.oil_btn}
        >
          75W85
        </button>
        <button
          onClick={() => goToSelectedOil('олива 75w90')}
          className={styles.oil_btn}
        >
          75W90
        </button>
        <button
          onClick={() => goToSelectedOil('олива 80W90')}
          className={styles.oil_btn}
        >
          80W90
        </button>
        <button
          onClick={() => goToSelectedOil('олива ATF 6')}
          className={styles.oil_btn}
        >
          ATF 6
        </button>
        <button
          onClick={() => goToSelectedOil('олива Dexron III')}
          className={styles.oil_btn}
        >
          Dexron III
        </button>
      </div>
      <h2 className={styles.title_oil}>Охолоджуючі рідини</h2>
      <div className={styles.oil_part_container}>
        <button
          onClick={() => goToSelectedOil('антифриз червоний')}
          className={styles.oil_btn}
        >
          Червоний
        </button>
        <button
          onClick={() => goToSelectedOil('антифриз синій')}
          className={styles.oil_btn}
        >
          Синій
        </button>
        <button
          onClick={() => goToSelectedOil('антифриз фіолетовий')}
          className={styles.oil_btn}
        >
          Фіолетовий
        </button>
        <button
          onClick={() => goToSelectedOil('антифриз зелений')}
          className={styles.oil_btn}
        >
          Зелений
        </button>
        <button
          onClick={() => goToSelectedOil('антифриз оранжевий')}
          className={styles.oil_btn}
        >
          Оранжевий
        </button>
        <button
          onClick={() => goToSelectedOil('Вода дистильована')}
          className={styles.oil_btn}
        >
          Вода дистильована
        </button>
      </div>
    </div>
  )
}

export default OilPart

/*<img
        src="https://www.bayrakparts.com/media/pngegg%20(2).png"
        className={styles.backgound_oil_engine}
      />
      <img
        src="https://www.bayrakparts.com/media/pngegg%20(1).png"
        className={styles.backgound_oil}
      />*/
