import Link from 'next/link'
import styles from '../../styles/Links.module.css'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import { changeLinkPath } from '@/global_state/features/cardata_redux'
import { useRouter } from 'next/router'
import Script from 'next/script'
import ProductsList from '@/components/products_in_search/products_list'
import LinksHistory from '@/components/link_history_in_product/link_history_in_product'

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

const Category = ({
  body,
  body1,
  amount,
  broadList,
  fits,
  title,
  metaTitle,
  metaDescr,
}) => {
  const dispatch = useDispatch()
  dispatch(changeLinkPath(body.fullPath))

  return (
    <div className={styles.full_container}>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescr} />
      </Head>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(broadList),
        }}
      />
      {body.categories.length != 0 ? (
        <h1 className={styles.category_title}>{title}</h1>
      ) : null}
      {body.categories.length != 0 ? (
        <div className={styles.links_and_history_cont}>
          <LinksHistory />
          <div className={styles.pod_cat_cont}>
            {body.categories.map(catInfo => (
              <LinkComponent key={catInfo.link} linkData={catInfo} />
            ))}
          </div>
        </div>
      ) : (
        <ProductsList
          productData={body1}
          amount={amount}
          finalTitle={title}
          fits={fits}
        />
      )}
    </div>
  )
}

export const getServerSideProps = async ({ req, params, query }) => {
  const res = await fetch(
    `https://api.bayrakparts.com/api/info/get_categories?link=${params.categories[0]}`,
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

  if (body.category.categories.length === 0) {
    if (query.brand && query.model && query.engine) {
      const categoryPath = body.category.fullPath.map(cat => cat.ukr).join('/')

      const res4 = await fetch(
        `https://api.bayrakparts.com/api/info/get_products_arr_by_full_info`,
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

      return {
        props: {
          body: body.category,
          body1: body5.arr,
          amount: body5.amount,
          broadList: body.broadList,
          fits: body5.arr.length > 0 ? 'true' : 'false',
          title: body5.title,
          metaTitle: body5.metaTitle,
          metaDescr: body5.metaDescr,
        },
      }
    } else {
      let page = 0
      if (query.page) {
        page = +query.page - 1
      }
      const res1 = await fetch(
        `https://api.bayrakparts.com/api/info/get_products_arr_by_category?category=${
          body.category.fullPath[body.category.fullPath.length - 1].ukr
        }&page=${page}`,
        {
          method: 'GET',
        }
      )
      const body1 = await res1.json()

      return {
        props: {
          body: body.category,
          body1: body1.arr,
          amount: body1.amount,
          broadList: body.broadList,
          title: body1.title,
          metaTitle: body1.metaTitle,
          metaDescr: body1.metaDescr,
        },
      }
    }
  } else {
    return {
      props: {
        body: body.category,
        broadList: body.broadList,
        title: body.title,
        metaTitle: body.metaTitle,
        metaDescr: body.metaDescr,
      },
    }
  }
}

export default Category
