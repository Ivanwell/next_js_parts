import { useState, useEffect } from 'react'
import styles from '../../styles/Add_to_stock.module.css'
import { getSession, signIn } from 'next-auth/react'
import axios from 'axios'

const AddToStock = () => {
  const [loading, setLoading] = useState(false)
  const [photo, setPhoto] = useState(null)
  const [fitsBrand, setFitsBrand] = useState(null)
  const [fitsModel, setFitsModel] = useState(null)
  const [fitsEngine, setFitsEngine] = useState(null)
  const [product, setProduct] = useState({
    title: '',
    brand: '',
    price: 0,
    amount: '',
    image: '',
    article: '',
  })

  const [checking, setChecking] = useState(true)

  // useEffect(() => {
  //   const checkLog = async () => {
  //     const session = await getSession()

  //     if (!session) {
  //       signIn()
  //     } else {
  //       setChecking(false)
  //     }
  //   }
  //   checkLog()
  // }, [])

  // if (checking) {
  //   return <h2>Завантаження</h2>
  // }

  const setImageUrl = e => {
    setPhoto(e.target.files[0])
    setProduct({
      ...product,
      image: `https://api.bonapart.pro/public/bayrakparts/${e.target.files[0].name}`,
    })
  }

  const uploadPhoto = async () => {
    const data = new FormData()
    data.append('file', photo)
    axios.post('https://api.bonapart.pro/upload', data, {})
  }

  const sendProductToStock = async e => {
    e.preventDefault()
    setLoading(true)
    uploadPhoto()
    let token = await fetch('https://backend.bayrakparts.com/add_stock_item', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        item: {
          title: product.title,
          brand: product.brand,
          price: product.price,
          article: product.article,
          amount: product.amount,
          image: product.image,
        },
      }),
    })
    setProduct({
      title: '',
      brand: '',
      price: 0,
      amount: '',
      image: '',
      article: '',
    })
    setLoading(false)
  }
  return (
    <>
      <main className={styles.main}>
        <div className={styles.greenwall}></div>
        <form
          className={styles.add_product_form}
          onSubmit={e => sendProductToStock(e)}
        >
          {!loading ? <h1>Додавання товару</h1> : <h1> Оприходуємо...</h1>}
          <label className={styles.name_of_field}> Виробник:</label>
          <input
            className={styles.add_options_filed}
            value={product.brand}
            name="brand"
            required
            onChange={e => {
              setProduct({
                ...product,
                brand: e.target.value,
              })
            }}
          />
          <label className={styles.name_of_field}>Назва продукту</label>
          <textarea
            className={styles.add_options_filed_name}
            value={product.title}
            name="name"
            required
            onChange={e => {
              setProduct({
                ...product,
                title: e.target.value,
              })
            }}
          />
          <label className={styles.name_of_field}> Ціна</label>
          <input
            className={styles.add_options_filed}
            value={product.price}
            name="price"
            type="number"
            required
            onChange={e => {
              setProduct({
                ...product,
                price: e.target.value,
              })
            }}
          />
          <label className={styles.name_of_field}> К-сть</label>
          <input
            className={styles.add_options_filed}
            value={product.amount}
            name="amount"
            required
            onChange={e => {
              setProduct({
                ...product,
                amount: e.target.value,
              })
            }}
          />
          <label className={styles.name_of_field}> Артикул </label>
          <input
            className={styles.add_options_filed}
            value={product.article}
            name="article"
            required
            onChange={e => {
              setProduct({
                ...product,
                article: e.target.value,
              })
            }}
          />
          <label className={styles.name_of_field}>
            {' '}
            Підходить до таких моделей{' '}
          </label>
          <label className={styles.name_of_field}>Бренд</label>
          <input
            className={styles.add_options_filed}
            value={fitsBrand}
            onChange={e => {
              setFitsBrand(e.target.value)
            }}
          />
          <label className={styles.name_of_field}>Модель</label>
          <input
            className={styles.add_options_filed}
            value={fitsModel}
            onChange={e => {
              setFitsModel(e.target.value)
            }}
          />
          <label className={styles.name_of_field}>Роки</label>
          <input
            className={styles.add_options_filed}
            value={fitsEngine}
            onChange={e => {
              setFitsEngine(e.target.value)
            }}
          />
          <label className={styles.name_of_field}> Завантажити фото </label>
          <input required type="file" onChange={e => setImageUrl(e)} />
          <button type="submit" className={styles.submit_button}>
            {' '}
            Поставити на прихід{' '}
          </button>
        </form>
        <div className={styles.greenwall}></div>
      </main>
    </>
  )
}

export default AddToStock
