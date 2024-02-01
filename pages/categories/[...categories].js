import Link from 'next/link'
import styles from '../../styles/Links.module.css'
import LinksHistory from '@/components/link_history/links_history'
import NewSearchByCategory from '@/components/products_in_search/products_in_search'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Head from 'next/head'
import {
  changeLinkPath,
  setGlobalBrand,
  setGlobalModel,
  setGlobalEngine,
} from '@/global_state/features/cardata_redux'
import { useRouter } from 'next/router'

const LinkComponent = ({ linkData, brand, model, engine }) => {
  console.log(linkData)
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

const Category = ({ body, body1, userAgent, amount }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  dispatch(changeLinkPath(body.fullPath))

  const brand = useSelector(
    state => state.dataSelectscartReducer.value.globalBrand
  )

  const model = useSelector(
    state => state.dataSelectscartReducer.value.globalModel
  )

  const engine = useSelector(state => state.dataSelectscartReducer.value.engine)

  useEffect(() => {
    if (!brand && !model && !engine) {
      if (router.query.brand && router.query.model && router.query.engine) {
        dispatch(setGlobalBrand(router.query.brand))
        dispatch(setGlobalModel(router.query.model))
        dispatch(setGlobalEngine(router.query.engine))
      }
    }
  }, [])

  let titleMeta = `Купити ${body.fullPath[
    body.fullPath.length - 1
  ].ukr.toLowerCase()} - BAYRAKPARTS`

  let title = `${body.fullPath[body.fullPath.length - 1].ukr.toLowerCase()}`

  function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1)
  }

  if (brand && model) {
    titleMeta = `Купити ${body.fullPath[
      body.fullPath.length - 1
    ].ukr.toLowerCase()} для ${brand} ${model} ${engine} - BAYRAKPARTS`

    title = `${body.fullPath[
      body.fullPath.length - 1
    ].ukr.toLowerCase()} для ${brand} ${model} ${engine}`
  }

  const finalTitle = capitalize(title)
  return (
    <div className={styles.full_container}>
      <Head>
        <title>{titleMeta}</title>
      </Head>
      {/* {body.fullPath ? <LinksHistory fullPath={body.fullPath} /> : null} */}
      {body.categories.length != 0 ? (
        <h1 className={styles.category_title}>{finalTitle}</h1>
      ) : null}
      {body.categories.length != 0 ? (
        <div className={styles.pod_cat_cont}>
          {body.categories.map(catInfo => (
            <LinkComponent
              linkData={catInfo}
              brand={brand}
              model={model}
              engine={engine}
            />
          ))}
        </div>
      ) : (
        <NewSearchByCategory
          productData={body1}
          userAgent={userAgent}
          amount={amount}
          brand={brand}
          model={model}
          engine={engine}
          finalTitle={finalTitle}
        />
      )}
    </div>
  )
}

export const getServerSideProps = async ({ req, params, query }) => {
  const res = await fetch(
    `https://backend.bayrakparts.com/get_nodes/${params.categories[0]}`,
    {
      method: 'GET',
    }
  )
  const body = await res.json()

  if (!body) {
    return {
      props: {
        body: null,
      },
    }
  }

  if (body.categories.length === 0) {
    const data = {
      article1: body.fullPath[body.fullPath.length - 1].ukr,
    }

    if (query.brand && query.model && query.engine) {
      const categoryPath = body.fullPath.map(cat => cat.ukr).join('/')

      const res4 = await fetch(
        `https://backend.bayrakparts.com/getProductsByEngine`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            category: categoryPath,
            brand: query.brand,
            model: query.model,
            engine: query.engine,
          }),
        }
      )
      const body5 = await res4.json()
      const userAgent = req.headers['user-agent']

      return {
        props: {
          body: body,
          body1: body5.arr,
          amount: body5.amount,
          userAgent: userAgent,
        },
      }
    } else {
      let page = `?page=0`
      if (query.page) {
        page = `?page=${query.page - 1}`
      }
      const res1 = await fetch(
        `https://backend.bayrakparts.com/get_products_by_category/${encodeURIComponent(
          data.article1
        )}${page}`,
        {
          method: 'GET',
        }
      )
      const body1 = await res1.json()

      const userAgent = req.headers['user-agent']

      return {
        props: {
          body: body,
          body1: body1.arr,
          amount: body1.amount,
          userAgent: userAgent,
        },
      }
    }
  } else {
    return {
      props: {
        body: body,
      },
    }
  }
}

export default Category
