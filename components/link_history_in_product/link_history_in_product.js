import Link from 'next/link'
import styles from '../../styles/Link_history_in_products.module.css'
import { arrowRight1 } from '../SVGs/SVGs'
import { useSelector } from 'react-redux'

const LinkHistory = ({ data }) => {
  const linkQuery = useSelector(
    state => state.dataSelectscartReducer.value.selectedCar
  )

  let link = `/categories/${data.eng}${linkQuery}`

  function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1).toLowerCase()
  }

  const text = capitalize(data.ukr)

  return (
    <li>
      <Link href={link}>
        {arrowRight1}
        <span>{capitalize(data.ukr)}</span>
      </Link>
    </li>
  )
}

const LinksHistory = () => {
  const fullPath = useSelector(
    state => state.dataSelectscartReducer.value.fullPath
  )

  return (
    <>
      {fullPath ? (
        <ul div className={styles.links_cont}>
          {fullPath.map(category => (
            <LinkHistory key={category.eng} data={category} />
          ))}
        </ul>
      ) : null}
    </>
  )
}

export default LinksHistory
