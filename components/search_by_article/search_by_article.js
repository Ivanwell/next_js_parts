import styles from '../../styles/SearchPart.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'

const SearchByArticle = () => {
  const [article, setArticle] = useState('')
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [loading3, setLoading3] = useState(false)
  const [loading4, setLoading4] = useState(false)
  const [noData, setNoData] = useState(false)

  const router = useRouter()

  const goToStockProductPage = () => {
    router.push(`/stock/${article.replace(/[- /]/g, '').toUpperCase()}`)
  }

  const goToSearchProductPage = () => {
    router.push(`/search/item/${article.replace(/[- /]/g, '')}`)
  }

  const goToSearchUTProductPage = item => {
    router.push({
      pathname: `/search/ut_item/${article.replace(/[- /]/g, '')}`,
    })
  }

  const goToSearchTMProductPage = item => {
    router.push({
      pathname: `/search/tm_stock_item/${article
        .replace(/[- /]/g, '')
        .toUpperCase()}`,
    })
  }

  const searchInTMProductPage = async () => {
    const res = await fetch(
      `https://technomir.bayrakparts.com/findProductTechnomir/${article
        .replace(/[- /.]/g, '')
        .toUpperCase()}`,
      {
        method: 'GET',
      }
    )
    const body = await res.json()
    if (body) {
      const item = {
        title: body.title,
        price: Math.ceil(+body.price * 39 * 1.15),
        img: body.image,
        article: body.article,
        brandName: body.brand,
        lvivStock: body.amount,
        otherStock: '-',
      }
      return item
    } else {
      return null
    }
  }

  const goToSearchMasterTeileProductPage = () => {
    router.push({
      pathname: `/search/mt_item/${article
        .replace(/[- /]/g, '')
        .toUpperCase()}`,
    })
  }

  const searchInMasterTeileProductPage = async () => {
    const res = await fetch(
      `https://masterteile.bayrakparts.com/findProductMasterteile/${article
        .replace(/[- /.]/g, '')
        .toUpperCase()}`,
      {
        method: 'GET',
      }
    )
    const body = await res.json()
    if (body) {
      const item = {
        title: body.title,
        price: body.price,
        img: body.image,
        article: body.article,
        brandName: body.brand,
        lvivStock: body.amount,
        otherStock: '-',
      }
      return item
    } else {
      return null
    }
  }

  const searchInUnickTrade = async () => {
    const data = {
      article1: article.replace(/[- /]/g, ''),
    }

    const res = await fetch(
      `https://api.edetal.store/partsUTR?article1=${encodeURIComponent(
        data.article1
      )}`,
      {
        method: 'GET',
      }
    )
    const body = await res.json()

    if (!body) {
      return null
    }
    {
      const stockInLviv = body?.details[0].remains.find(
        storage => storage.storage.name === 'Львів'
      )

      const otherStock = body?.details[0].remains.find(
        storage => storage.storage.name === 'Kиїв Правий'
      )

      if (stockInLviv === undefined && otherStock === undefined) {
        return null
      } else {
        const item = {
          title: body.details[0]?.title,
          img: body.details[0].images[0]?.fullImagePath,
          price: Math.ceil(body.details[0].yourPrice.amount * 1.12),
          article: body.details[0].article.replace(/[- /]/g, ''),
          brandName: body.details[0].brand.name,
          lvivStock: stockInLviv?.remain,
          otherStock: otherStock?.remain,
        }

        return item
      }
    }
  }

  const searchInStock = async () => {
    const res = await fetch(
      `https://api.edetal.store/findProduct/${article
        .replace(/[- /]/g, '')
        .toUpperCase()}`,
      {
        method: 'GET',
      }
    )

    const body = await res.json()
    return body
  }

  const searchInBMParts = async () => {
    const res = await fetch(
      `https://api.edetal.store/bmparts?article1=${encodeURIComponent(
        article
      )}`,
      {
        method: 'GET',
      }
    )

    const body = await res.json()
    const array = Object.values(body.products)
    const finaldata = array.find(
      product =>
        product.article.replace(/[- ]/g, '') === article.replace(/[- ]/g, '')
    )
    return finaldata
  }

  const searchArticle = async e => {
    e.preventDefault()
    setNoData(false)
    setLoading(true)
    setLoading1(true)
    const dataFromStock = await searchInStock()
    setLoading1(false)
    if (dataFromStock) {
      goToStockProductPage()
      setLoading(false)
    } else {
      setLoading2(true)
      const dataFromBM = await searchInBMParts()
      setLoading2(false)
      if (dataFromBM) {
        setLoading(false)
        goToSearchProductPage(dataFromBM)
      } else {
        setLoading3(true)
        const dataFromUT = await searchInUnickTrade()
        setLoading3(false)
        if (dataFromUT) {
          setLoading(false)
          goToSearchUTProductPage(dataFromUT)
        } else {
          setLoading4(true)
          const dataFromTM = await searchInTMProductPage()
          if (dataFromTM) {
            goToSearchTMProductPage(dataFromTM)
            setLoading4(false)
            setLoading(false)
          } else {
            const dataFromMT = await searchInMasterTeileProductPage()
            if (dataFromMT) {
              goToSearchMasterTeileProductPage()
              setLoading4(false)
              setLoading(false)
            } else {
              setNoData(true), setLoading(false)
            }
          }
        }
      }
    }
  }

  const Spiner = () => {
    return (
      <div className={styles.lds_facebook}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }

  return (
    <form className={styles.search_container} onSubmit={e => searchArticle(e)}>
      <h2 className={styles.search_title}>
        Знаєте номер запчастини? Супер, спробуйте наш пошук
      </h2>
      {!loading ? (
        <div className={styles.search_and_btn_cont}>
          <input
            className={styles.search_input}
            type="text"
            value={article}
            onChange={e => setArticle(e.target.value)}
            required
            minLength={3}
            placeholder="64101Q4000"
          />
          <button type="submit" className={styles.btn_submit}>
            Пошук
          </button>
        </div>
      ) : (
        <div className={styles.search_and_btn_cont1}>
          {loading1 ? 'Шукаємо...' : null}
          {loading2 ? 'Ще трішечки...' : null}
          {loading3 ? 'Ще трішечки...' : null}
          {loading4 ? 'Вже майже...' : null}
          <Spiner />
        </div>
      )}
      {noData ? (
        <div className={styles.noData}>
          Упс... по такому артикулу не можемо знайти запчастину
        </div>
      ) : null}
    </form>
  )
}

export default SearchByArticle
