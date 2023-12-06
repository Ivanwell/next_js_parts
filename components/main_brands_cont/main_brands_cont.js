import styles from '../../styles/Brands.module.css'
import { useRouter } from 'next/router'
import Image from 'next/image'

const Brands_in_main = () => {
  const router = useRouter()

  const goToBrandSearch = choosebrand => {
    const brand = choosebrand
    router.push(`/brand/${brand}`)
  }

  const toyota = (
    <Image
      className={styles.brandimg}
      src="https://www.bayrakparts.com/media/toyota-7.svg"
      alt="viberSVG"
      width={90}
      height={90}
    />
  )
  const bmw = (
    <Image
      className={styles.brandimg}
      src="https://www.bayrakparts.com/media/bmw-8.svg"
      alt="viberSVG"
      width={90}
      height={90}
    />
  )
  const hyundai = (
    <Image
      className={styles.brandimg}
      src="https://www.bayrakparts.com/media/hyundai-automobiles-1.svg"
      alt="viberSVG"
      width={90}
      height={90}
    />
  )
  const mazda = (
    <Image
      className={styles.brandimg}
      src="https://www.bayrakparts.com/media/mazda-2.svg"
      alt="viberSVG"
      width={90}
      height={90}
    />
  )
  const subaru = (
    <Image
      className={styles.brandimg}
      src="https://www.bayrakparts.com/media/SUBAR.png"
      alt="viberSVG"
      width={90}
      height={90}
    />
  )
  const audi = (
    <Image
      className={styles.brandimg}
      src="https://www.bayrakparts.com/media/audi-11.svg"
      alt="viberSVG"
      width={90}
      height={90}
    />
  )
  const mercb = (
    <Image
      className={styles.brandimg}
      src="https://www.bayrakparts.com/media/mercedes-benz-8.svg"
      alt="viberSVG"
      width={90}
      height={90}
    />
  )
  const jeep = (
    <Image
      className={styles.brandimg}
      src="https://www.bayrakparts.com/media/jeep-5.svg"
      alt="viberSVG"
      width={90}
      height={90}
    />
  )
  const suzuki = (
    <Image
      className={styles.brandimg}
      src="https://www.bayrakparts.com/media/fiat-logo-1.svg"
      alt="viberSVG"
      width={90}
      height={90}
    />
  )
  const kia = (
    <Image
      className={styles.brandimg}
      src="https://www.bayrakparts.com/media/kia-motors.svg"
      alt="viberSVG"
      width={90}
      height={90}
    />
  )
  const ford = (
    <Image
      className={styles.brandimg}
      src="https://www.bayrakparts.com/media/ford-8.svg"
      alt="viberSVG"
      width={90}
      height={90}
    />
  )
  const volks = (
    <Image
      className={styles.brandimg}
      src="https://www.bayrakparts.com/media/cdnlogo.com_volkswagen.svg"
      alt="viberSVG"
      width={90}
      height={90}
    />
  )
  const skoda = (
    <Image
      className={styles.brandimg}
      src="https://www.bayrakparts.com/media/skoda-6.svg"
      alt="viberSVG"
      width={90}
      height={90}
    />
  )
  const nissan = (
    <Image
      className={styles.brandimg}
      src="https://www.bayrakparts.com/media/nissan-6.svg"
      alt="viberSVG"
      width={90}
      height={90}
    />
  )
  const renault = (
    <Image
      className={styles.brandimg}
      src="https://www.bayrakparts.com/media/renault-2.svg"
      alt="viberSVG"
      width={90}
      height={90}
    />
  )
  const peugeut = (
    <Image
      className={styles.brandimg}
      src="https://www.bayrakparts.com/media/peugeot-8.svg"
      alt="viberSVG"
      width={90}
      height={90}
    />
  )
  const opel = (
    <Image
      className={styles.brandimg}
      src="https://www.bayrakparts.com/media/opel-6.svg"
      alt="viberSVG"
      width={90}
      height={90}
    />
  )
  const mitsubishi = (
    <Image
      className={styles.brandimg}
      src="https://www.bayrakparts.com/media/mitsubishi.svg"
      alt="viberSVG"
      width={90}
      height={90}
    />
  )

  return (
    <div className={styles.brands_container}>
      <div></div>
      <div
        className={styles.brandItem}
        onClick={() => goToBrandSearch('TOYOTA')}
      >
        {toyota}
      </div>
      <div className={styles.brandItem} onClick={() => goToBrandSearch('BMW')}>
        {bmw}
      </div>
      <div
        className={styles.brandItem}
        onClick={() => goToBrandSearch('HYUNDAI')}
      >
        {hyundai}
      </div>
      <div className={styles.small}></div>
      <div className={styles.small}></div>
      <div
        className={styles.brandItem}
        onClick={() => goToBrandSearch('MAZDA')}
      >
        {mazda}
      </div>
      <div
        className={styles.brandItem}
        onClick={() => goToBrandSearch('SUBARU')}
      >
        {subaru}
      </div>
      <div className={styles.brandItem} onClick={() => goToBrandSearch('AUDI')}>
        {audi}
      </div>
      <div className={styles.big}></div>
      <div className={styles.big}></div>
      <div className={styles.small}></div>
      <div className={styles.small}></div>
      <div className={styles.brandItem} onClick={() => goToBrandSearch('MB')}>
        {mercb}
      </div>
      <div className={styles.brandItem} onClick={() => goToBrandSearch('JEEP')}>
        {jeep}
      </div>
      <div className={styles.brandItem} onClick={() => goToBrandSearch('FIAT')}>
        {suzuki}
      </div>
      <div className={styles.small}></div>
      <div className={styles.small}></div>
      <div className={styles.brandItem} onClick={() => goToBrandSearch('KIA')}>
        {kia}
      </div>
      <div className={styles.brandItem} onClick={() => goToBrandSearch('FORD')}>
        {ford}
      </div>
      <div className={styles.brandItem} onClick={() => goToBrandSearch('VW')}>
        {volks}
      </div>
      <div></div>
      <div className={styles.big}></div>
      <div className={styles.small}></div>
      <div
        className={styles.brandItem}
        onClick={() => goToBrandSearch('SKODA')}
      >
        {skoda}
      </div>
      <div
        className={styles.brandItem}
        onClick={() => goToBrandSearch('NISSAN')}
      >
        {nissan}
      </div>
      <div
        className={styles.brandItem}
        onClick={() => goToBrandSearch('RENAULT')}
      >
        {renault}
      </div>
      <div className={styles.small}></div>
      <div className={styles.small}></div>
      <div
        className={styles.brandItem}
        onClick={() => goToBrandSearch('PEUGEOT')}
      >
        {peugeut}
      </div>
      <div className={styles.brandItem} onClick={() => goToBrandSearch('OPEL')}>
        {opel}
      </div>
      <div
        className={styles.brandItem}
        onClick={() => goToBrandSearch('MITSUBISHI')}
      >
        {mitsubishi}
      </div>
      <div></div>
    </div>
  )
}

export default Brands_in_main
