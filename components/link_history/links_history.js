import styles from '../../styles/Links.module.css'
import Link from 'next/link'
import { arrowRight1 } from '../SVGs/SVGs'

const LinkHistory = ({ data }) => {
  const link = `/categories/${data.eng}`
  function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1).toLowerCase()
  }
  const text = capitalize(data.ukr)
  return (
    <Link href={link}>
      <li>
        {arrowRight1}
        <span>{text}</span>
      </li>
    </Link>
  )
}

const LinksHistory = ({ fullPath }) => {
  return (
    <>
      <ul div className={styles.links}>
        {fullPath.map(category => (
          <LinkHistory data={category} />
        ))}
      </ul>
    </>
  )
}

export default LinksHistory
