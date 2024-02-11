import styles from '../../styles/Links.module.css'
import Link from 'next/link'
import { arrowRight1 } from '../SVGs/SVGs'
import { useSelector } from 'react-redux'

const LinkHistory = ({ data, brand, model, engine }) => {
  let link = `/categories/${data.eng}`

  if (brand && model) {
    link = `/categories/${data.eng}?brand=${brand}&model=${model}&engine=${engine}`
  }
  function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1).toLowerCase()
  }
  const text = capitalize(data.ukr)
  return (
    <li>
      <Link href={link}>
        {arrowRight1}
        <span>{text}</span>
      </Link>
    </li>
  )
}

const LinksHistory = () => {
  const fullPath = useSelector(
    state => state.dataSelectscartReducer.value.fullPath
  )

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
      {fullPath ? (
        <ul div className={styles.links}>
          {/* {globalBrand ? (
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
          ) : null} */}
          {fullPath
            ? fullPath.map(category => (
                <LinkHistory
                  data={category}
                  brand={globalBrand}
                  model={globalModel}
                  engine={globalEngine}
                />
              ))
            : null}
        </ul>
      ) : null}
    </>
  )
}

export default LinksHistory
