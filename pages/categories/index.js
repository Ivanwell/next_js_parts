import Head from 'next/head'
import styles from '../../styles/Links.module.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import {
  setPathShown,
  changeLinkPath,
} from '@/global_state/features/cardata_redux'

const LinkComponent = ({ linkData, brand, model, engine }) => {
  let link = `/categories/${linkData.link}`

  if (brand && model) {
    link = `/categories/${linkData.link}?brand=${brand}&model=${model}&engine=${engine}`
  }
  return (
    <Link href={link} className={styles.link_pod_category}>
      <span>{linkData.name}</span>
    </Link>
  )
}

const CategoryMainPage = ({ body, body1, userAgent, amount }) => {
  const dispatch = useDispatch()

  // dispatch(setPathShown(true))
  dispatch(changeLinkPath([]))
  const brand = useSelector(
    state => state.dataSelectscartReducer.value.globalBrand
  )

  const model = useSelector(
    state => state.dataSelectscartReducer.value.globalModel
  )

  const engine = useSelector(state => state.dataSelectscartReducer.value.engine)

  const mainCategories = [
    {
      name: 'Оливи',
      link: 'olyva-zmazka--i-tehnichni',
    },
    {
      name: 'Електрика',
      link: 'elektryka',
    },
  ]
  return (
    <div className={styles.full_container}>
      <Head>
        <title>Категорії автозапчастин</title>
      </Head>
      <h1>Категорії автозапчастин</h1>
      {mainCategories.map(catInfo => (
        <div className={styles.pod_cat_cont}>
          <LinkComponent
            linkData={catInfo}
            brand={brand}
            model={model}
            engine={engine}
          />
        </div>
      ))}
    </div>
  )
}

export default CategoryMainPage
