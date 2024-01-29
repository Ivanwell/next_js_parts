import Link from 'next/link'
import styles from '../../styles/Links.module.css'
import LinksHistory from '@/components/link_history/links_history'
import NewSearchByCategory from '@/components/products_in_search/products_in_search'
import Head from 'next/head'

const LinkComponent = ({ linkData }) => {
  console.log(linkData)
  const link = `/categories/${linkData.link}`
  return (
    <Link href={link} className={styles.link_pod_category}>
      <span>{linkData.name}</span>
    </Link>
  )
}

const Category = ({ body, body1, userAgent, amount }) => {
  const titleMeta = `Купити ${body.fullPath[
    body.fullPath.length - 1
  ].ukr.toLowerCase()} - BAYRAKPARTS`
  return (
    <div className={styles.full_container}>
      <Head>
        <title>{titleMeta}</title>
      </Head>
      {body.fullPath ? <LinksHistory fullPath={body.fullPath} /> : null}

      {body.categories.length != 0 ? (
        <div className={styles.pod_cat_cont}>
          {body.categories.map(catInfo => (
            <LinkComponent linkData={catInfo} />
          ))}
        </div>
      ) : (
        <NewSearchByCategory
          productData={body1}
          userAgent={userAgent}
          amount={amount}
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

    console.log(body1)

    const userAgent = req.headers['user-agent']

    return {
      props: {
        body: body,
        body1: body1.arr,
        amount: body1.amount,
        userAgent: userAgent,
      },
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
