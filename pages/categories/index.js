import Head from 'next/head'
import styles from '../../styles/Links.module.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { changeLinkPath } from '@/global_state/features/cardata_redux'

const LinkComponent = ({ linkData }) => {
  const linkQuery = useSelector(
    state => state.dataSelectscartReducer.value.selectedCar
  )
  let link = `/categories/${linkData.link}${linkQuery}`

  return (
    <Link href={link} className={styles.link_pod_category}>
      <span>{linkData.name}</span>
    </Link>
  )
}

const CategoryMainPage = ({ mainCategories }) => {
  const dispatch = useDispatch()
  dispatch(changeLinkPath([]))

  return (
    <div className={styles.full_container}>
      <Head>
        <title>Категорії автозапчастин</title>
        <meta name="description" content="Категорії автозапчастин" />
      </Head>
      <h1>Категорії автозапчастин</h1>
      <div className={styles.pod_cat_cont_main}>
        {mainCategories.map(catInfo => (
          <LinkComponent key={catInfo.link} linkData={catInfo} />
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const mainCategories = [
    {
      name: 'Оливи',
      link: 'olyva-zmazka--i-tehnichni',
    },
    {
      name: 'Гальмівна система',
      link: 'galmivna-systema',
    },
    {
      name: 'Трансмісія',
      link: 'pryvid',
    },
    {
      name: 'Електрика',
      link: 'elektryka',
    },
    {
      name: 'Система запалювання',
      link: 'systema-zapalyuvannya-rozzharyuvannya',
    },
    {
      name: 'Опалення і кондиціонування',
      link: 'obigriv-kondytsioner',
    },
    {
      name: 'Рульова система',
      link: 'rulova-systema',
    },
    {
      name: 'Система випуску і впуску повітря',
      link: 'systema-vypusku-vpusku-povitrya',
    },
    {
      name: 'Подача палива',
      link: 'systemy-pidgotovky-podachi-palyva',
    },
    {
      name: 'Фільтри',
      link: 'filtry-komplektuyuchi',
    },
    {
      name: 'Амортизація складові',
      link: 'amortyzatsiya',
    },
    {
      name: 'Система охолодження',
      link: 'systema-oholodzhennya',
    },
    {
      name: 'Ходова частина',
      link: 'shasi',
    },
    {
      name: 'Комплектуючі двигуна',
      link: 'dvygun',
    },
    {
      name: 'Кузовні частини',
      link: 'kuzov-skladovi',
    },
  ]

  return {
    props: { mainCategories },
  }
}

export default CategoryMainPage
