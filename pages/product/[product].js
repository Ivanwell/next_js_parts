import styles from '../../styles/Product.module.css'
import LinksHistory from '@/components/link_history_in_product/link_history_in_product'
import { useDispatch } from 'react-redux'
import { changeLinkPath, setFits } from '@/global_state/features/cardata_redux'
import ReviewProductNew from '@/components/review_in_product_new/review_in_product'
import LeaveReviewBox from '@/components/review_in_product_new/leave_review_box'
import RequestCompatibilityFrom from '@/components/request_compatibility_form/request_comp_form'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import DesctopProdcutCont from '@/components/product_comp/product_descop_cont'
import Head from 'next/head'
import Script from 'next/script'
import Product_in_mobile from '@/components/product_comp/product_mobile_cont'

const NewProduct = ({ item, cat, broadList, dataPage }) => {
  const [fitsLocal, setFitsLocal] = useState('false')
  const dispatch = useDispatch()
  const router = useRouter()

  if (cat) {
    dispatch(changeLinkPath(cat.fullPath))
  }

  useEffect(() => {
    if (router.query.fits === 'true') {
      setFitsLocal('true')
    } else {
      if (router.query.brand && router.query.model && router.query.engine) {
        setFitsLocal('false')
        const abortController = new AbortController()
        const { signal } = abortController
        const apiCall = async () => {
          try {
            const categoryPath = cat.fullPath.map(cat => cat.ukr).join('/')

            const res5 = await fetch(
              `https://api.bayrakparts.com/api/info/check_compatibility`,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                  category: categoryPath,
                  brand: router.query.brand,
                  model: router.query.model,
                  engine: router.query.engine,
                  partArticle: item.article,
                  partBrand: item.brandName,
                }),
              }
            )
            const body6 = await res5.json()

            if (body6 === 'true') {
              setFitsLocal('true')
              // dispatch(setFits(true))
            } else {
              setFitsLocal('does not fit')
              dispatch(setFits('does not fit'))
            }
          } catch (error) {
            if (!signal?.aborted) {
              console.error(error)
            }
          }
        }
        apiCall()

        return () => {
          abortController.abort()
        }
      }
    }
  }, [])

  return (
    <>
      <Head>
        <title>
          {item.unicTitle ? item.unicTitle : item.title + ` - BAYRAKPARTS`}
        </title>
        <meta name="description" content={item.discription} />
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content={item.title}></meta>
        <meta property="og:description" content={item.discription}></meta>
        <meta
          property="og:url"
          content={`https://bayrakparts.com/product/${item.link}`}
        ></meta>
        <meta property="og:image" content={item.img}></meta>
      </Head>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dataPage),
        }}
      />
      {cat ? (
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(broadList),
          }}
        />
      ) : null}
      {router.query.viewport != 'mobile' ? (
        <div className={styles.main_page_component}>
          <div className={styles.component_container}>
            <LinksHistory />
            <DesctopProdcutCont
              fitsLocal={fitsLocal}
              fullPath={cat?.fullPath || null}
              item={item}
            />
          </div>
          <div className={styles.product_details_cont}>
            <div className={styles.description}>{item.discription}</div>
            <div className={styles.container_for_details_and_compatibility}>
              <div className={styles.details_cont_left}>
                <ReviewProductNew
                  article={item.article}
                  brand={item.brandName}
                  reviewsArr={item.reviews}
                />
                <LeaveReviewBox article={item.article} brand={item.brandName} />
              </div>
              <div className={styles.details_cont_right}>
                <RequestCompatibilityFrom
                  article={item.article}
                  brand={item.brandName}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.mobile_page_container}>
          <LinksHistory />
          <Product_in_mobile
            fitsLocal={fitsLocal}
            fullPath={cat?.fullPath || null}
            item={item}
          />
          {item.discription ? (
            <div className={styles.discription_mobile}>{item.discription}</div>
          ) : null}
          <div className={styles.requst_cont_mobile}>
            <RequestCompatibilityFrom
              article={item.article}
              brand={item.brandName}
            />
          </div>
          <div className={styles.requst_cont_mobile}>
            <div className={styles.details_cont_left}>
              <ReviewProductNew
                article={item.article}
                brand={item.brandName}
                reviewsArr={item.reviews}
              />
              <LeaveReviewBox article={item.article} brand={item.brandName} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const getServerSideProps = async ({ req, params }) => {
  const fullLink = params.product.split('-')

  const article = fullLink[fullLink.length - 1]
    .toUpperCase()
    .replace(/[- /]/g, '')

  const brand = fullLink[fullLink.length - 2].toUpperCase().replace('.', ' ')
  const res = await fetch(
    `https://api.bayrakparts.com/api/info/get_product?article=${article}&brand=${brand}`,
    {
      method: 'GET',
    }
  )
  const body = await res.json()

  if (!body.product) {
    return {
      props: {
        item: null,
      },
    }
  }

  const item = {
    title: body.product.title,
    price: body.product.supliers[0]?.price || null,
    img:
      body.product.image ||
      'https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg',
    discription:
      body.product.discription ||
      `Замовте ${body.product.title} у магазині автозапчастин BAYRAKPARTS. Топова якість та швидка доставка`,
    article: body.product.article,
    brandName: body.product.brand,
    lvivStock: body.product.supliers[0]?.amount || null,
    link: body.product.link[0].link,
    unicTitle: body?.product.unicTitle || null,
    reviews: body?.product.reviews || null,
    categoryName: body.product.categoryName || null,
  }

  return {
    props: {
      item,
      cat: body.product.categories[0] || null,
      broadList: body.broadList,
      dataPage: body.dataPage,
    },
  }
}

export default NewProduct
