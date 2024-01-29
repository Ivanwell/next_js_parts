import styles from '../../styles/SearchPart.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'

const SearchByArticle = () => {
  const [article, setArticle] = useState('')
  const [loading, setLoading] = useState(false)
  const [noData, setNoData] = useState(false)

  const router = useRouter()

  const searchInStock = async e => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch(
      `https://backend.bayrakparts.com/get_item_info/${article
        .replace(/[- /]/g, '')
        .toUpperCase()}`,
      {
        method: 'GET',
      }
    )

    const body = await res.json()
    if (body) {
      router.push(`/product/${body.link[0].link}`)
    } else {
      setNoData(true)
    }
    setLoading(false)
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
    <form className={styles.search_container} onSubmit={e => searchInStock(e)}>
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
