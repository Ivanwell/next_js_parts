import { useState, useEffect } from 'react'
import styles from '../../styles/ItemsInStock.module.css'
import { getSession, signIn } from 'next-auth/react'

const Item = productData => {
  const { name, brand, price, amount, image, article } = productData.productData
  const { _id } = productData.productData

  const [amountInStock, setAmountsInStock] = useState(amount)
  const [priceInStock, setPriceInStock] = useState(price)
  const [nameInStock, setNameInStock] = useState(name)
  const [loading, setLoading] = useState(false)

  const updateProductInStock = async e => {
    setLoading(true)
    let token = await fetch(`https://api.edetal.store/updateProduct/${_id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        amount: amountInStock,
        price: priceInStock,
        name: nameInStock,
      }),
    })
    setLoading(false)
  }

  return (
    <div className={styles.item_container}>
      <img src={image} />
      <input
        className={styles.item_description}
        value={nameInStock}
        onChange={e => setNameInStock(e.target.value)}
      ></input>
      <div className={styles.item_description}>{brand}</div>
      <input
        className={styles.item_description}
        onChange={e => setPriceInStock(e.target.value)}
        value={priceInStock}
      ></input>
      <input
        type="number"
        value={amountInStock}
        className={styles.item_amount}
        onChange={e => setAmountsInStock(e.target.value)}
      ></input>
      <button
        className={styles.save_changes_btn}
        onClick={() => updateProductInStock()}
      >
        {loading ? '......' : 'Внести зміни'}
      </button>
    </div>
  )
}

const ItemsInStock = productData => {
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkLog = async () => {
      const session = await getSession()

      if (!session) {
        signIn()
      } else {
        setChecking(false)
      }
    }
    checkLog()
  }, [])

  if (checking) {
    return <h2>Завантаження</h2>
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.greenwall}></div>
        <div className={styles.content_container}>
          <h1>Товари в наявності</h1>
          <div className={styles.items_container}>
            <div className={styles.item_container}>
              <div className={styles.item_description}></div>
              <div className={styles.item_description}>Назва</div>
              <div className={styles.item_description}>Виробник</div>
              <div className={styles.item_description}>Ціна вхідна</div>
              <div className={styles.item_description}>Кількість</div>
            </div>
            {productData.productData.map(product => (
              <Item productData={product} />
            ))}
          </div>
        </div>
        <div className={styles.greenwall}></div>
      </main>
    </>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch(`https://api.edetal.store/getStock`, {
    method: 'GET',
  })

  const body = await res.json()

  return {
    props: {
      productData: body,
    },
  }
}

export default ItemsInStock
