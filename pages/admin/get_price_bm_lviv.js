import Papa from 'papaparse'
import styles from '../../styles/UploadpriceMasterteile.module.css'
import { useState } from 'react'

const AddOrderStatus = () => {
  const [csvFile, setCsvFile] = useState(null)
  const [finished, setFinished] = useState(false)
  const [loading, setLoading] = useState(false)
  const [priceBM, setPriceBM] = useState(null)
  const [startPoint, setStartPoint] = useState(0)
  const [endPoint, setEndPoint] = useState(0)

  const getFullPrice = async () => {
    const res1 = await fetch(`https://api.edetal.store/getprices`, {
      method: 'GET',
    })

    const body1 = await res1.json()

    Papa.parse(body1, {
      header: true,
      encoding: 'UTF-8',
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data)
        const grm = results.data.filter(item =>
          item.Назва.includes('Комплект ГРМ')
        )
        console.log(grm)
        //getAllItems(grm)
      },
    })
  }

  const tesst = async () => {
    const res = await fetch(
      `https://technomir.bayrakparts.com/get_full_price_from_my_bd`,
      {
        method: 'GET',
      }
    )

    const body = await res.json()
    console.log(body)
    const data4 = body.filter(item => !item.image)
    console.log(data4)

    const data3 = body.filter(item => item.image === '-')
    console.log(data3)

    // const res1 = await fetch(`https://technomir.bayrakparts.com/`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   method: 'POST',
    //   body: JSON.stringify({ price: data4 }),
    // })
    // const body1 = await res1.json()
  }

  const test = async () => {
    const res = await fetch(
      `https://masterteile.bayrakparts.com/get_price_masterteile`,
      {
        method: 'GET',
      }
    )

    const body = await res.json()

    console.log(body)

    const data1 = body.filter(item => item.image != '-')
    const data2 = body.filter(item => item.image === '-')
    const data3 = body.filter(item => item.image)
    const data4 = body.filter(item => !item.image)

    console.log(data1)
    console.log(data2)
    console.log(data3)
    console.log(data4)

    // const date = new Date()
    // const year = date.getFullYear()
    // let month = date.getMonth() + 1
    // if (month < 10) {
    //   month = `0${month}`
    // }
    // let day = date.getDate()
    // if (day < 10) {
    //   day = `0${day}`
    // }
    // const finalDate = `${day}.${month}.${year}`

    // const endedProducts = body.filter(item => item.date != finalDate)
    // console.log(endedProducts)
  }

  const newtest = async () => {
    const res = await fetch(`https://api.tehnomir.com.ua/price/getStockPrice`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ apiToken: 'jLiA0DZd9LwG6K75xXpfMoZX8t3L7SsO' }),
    })

    const body = await res.json()
    console.log(body)
  }

  const getOneItem = async article => {
    const data = {
      article1: article.replace(/[- /]/g, ''),
    }

    const res = await fetch(
      `https://api.edetal.store/bmparts?article1=${encodeURIComponent(
        data.article1
      )}`,
      {
        method: 'GET',
      }
    )

    const body = await res.json()

    const array = Object.values(body.products)

    const finaldata = array.find(
      product =>
        product.article.replace(/[- /]/g, '') === article.replace(/[- /]/g, '')
    )

    if (!finaldata) {
      return null
    }

    const img1 = finaldata.default_image.slice(5).replace(/[&\/\\]/g, '/')
    let img = 'https://cdn.bm.parts/photos/' + img1

    if (img === 'https://cdn.bm.parts/photos/') {
      return null
    }

    const item = {
      id: finaldata.article,
      title: finaldata.name,
      description: finaldata.name,
      link: `https://bayrakparts.com/search/item/${finaldata.article}`,
      price: `${Math.ceil(finaldata.price * 1.15)} грн`,
      availability: 'in_stock',
      image_link: img,
      brand: finaldata.brand,
      condition: 'new',
    }

    return item
  }

  const getAllItems = async arr => {
    setLoading(true)
    let step = 0
    let stepsAmount = arr.length
    const newarr = []
    while (step < stepsAmount) {
      const item = await getOneItem(arr[step].Артикул)
      if (!item) {
      } else {
        newarr.push(item)
      }
      step++
    }
    setLoading(false)

    const hello = Papa.unparse(newarr, {
      delimiter: ',',
      header: true,
      newline: '\r\n',
      encoding: 'UTF-8',
    })

    const blob = new Blob([hello], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('download', 'download.csv')
    a.click()
  }
  const createCsvFile = async e => {
    e.preventDefault()
    await getFullPrice()
  }

  const getFullPriceBayrakParts = async e => {
    e.preventDefault()

    const res = await fetch(`https://api.edetal.store/getStock`, {
      method: 'GET',
    })

    const body = await res.json()

    const filtered = body.filter(element => element.amount > 0)

    const arr = filtered.map(element => {
      return {
        id: element.article,
        title: `${element.article} ${element.brand} ${element.name}`,
        description: element.name,
        link: `https://bayrakparts.com/stock/${element.article}`,
        price: `${Math.ceil(element.price * 1.15)} грн`,
        availability: 'in_stock',
        image_link: element.image,
        brand: element.brand,
        condition: 'new',
      }
    })

    const hello = Papa.unparse(arr, {
      delimiter: ',',
      header: true,
      newline: '\r\n',
      encoding: 'UTF-8',
    })

    const blob = new Blob([hello], { type: 'text/csv' })

    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('download', 'download.csv')
    a.click()
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.greenwall}></div>
        <div className={styles.upload_price_container}>
          {!loading ? (
            <form
              className={styles.upload_price_form}
              onSubmit={e => createCsvFile(e)}
            >
              <h3>BM Parts</h3> <label>Початок прайсу</label>
              <input
                type="number"
                value={startPoint}
                onChange={e => setStartPoint(e.target.value)}
              />
              <label>Кінець прайсу</label>
              <input
                type="number"
                value={endPoint}
                onChange={e => setEndPoint(e.target.value)}
              />
              <button type="submit" className={styles.submit_button}>
                Зформувати CSV файл
              </button>
            </form>
          ) : null}
          {!loading ? (
            <form
              className={styles.upload_price_form}
              onSubmit={e => getFullPriceBayrakParts(e)}
            >
              <h3>BayrakParts</h3> <label>Початок прайсу</label>
              <input
                type="number"
                value={startPoint}
                onChange={e => setStartPoint(e.target.value)}
              />
              <label>Кінець прайсу</label>
              <input
                type="number"
                value={endPoint}
                onChange={e => setEndPoint(e.target.value)}
              />
              <button type="submit" className={styles.submit_button}>
                Зформувати CSV файл
              </button>
            </form>
          ) : null}
          <button onClick={() => tesst()}>djskgjsgkjlf</button>
        </div>
        <div className={styles.greenwall}></div>
      </main>
    </>
  )
}

export default AddOrderStatus
