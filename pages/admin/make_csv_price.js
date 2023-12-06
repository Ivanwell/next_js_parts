import Papa from 'papaparse'
import styles from '../../styles/UploadpriceMasterteile.module.css'
import { useState } from 'react'
import axios from 'axios'

const AddOrderStatus = () => {
  const [csvFile, setCsvFile] = useState(null)
  const [finished, setFinished] = useState(false)
  const [loading, setLoading] = useState(false)

  const sentWholePriceToServer = async fullPrice => {
    const priceAmounts = Math.ceil(fullPrice.length / 500)
    setLoading(true)
    let step = 0
    let start = 0
    while (step < priceAmounts) {
      step++
      await sentPriceToServer(fullPrice.slice(start, start + 500))
      start = start + 500
      //await sentPriceToServer(fullPrice[step])
    }
    setLoading(false)
    setFinished(true)
  }

  const sentWholeArticlesToServer = async () => {
    const res = await fetch(`https://api.edetal.store/get_price_masterteile`, {
      method: 'GET',
    })

    const body = await res.json()

    const onlyArticles = body.map(item => item.article)

    console.log(onlyArticles)
    const priceAmounts = Math.ceil(onlyArticles.length / 5000)
    setLoading(true)
    let step = 0
    let start = 0
    while (step < priceAmounts) {
      step++
      await sentArticlesToServer(onlyArticles.slice(start, start + 5000))
      start = start + 5000
      //await sentPriceToServer(fullPrice[step])
    }
    setLoading(false)
  }

  const sentArticlesToServer = async price => {
    let token = await fetch(
      'https://api.edetal.store/uploadarticlesmasterteile',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(price),
      }
    )
  }

  const sentPriceToServer = async price => {
    let token = await fetch(
      'https://api.edetal.store/uploadpricemasterteile2',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(price),
      }
    )
  }

  async function parcingArrToCSV(e) {
    e.preventDefault()

    const res = await fetch(`https://api.edetal.store/getStock`, {
      method: 'GET',
    })

    const body = await res.json()

    const filtered = body.filter(element => element.amount > 0)

    const arr = filtered.map(element => {
      return {
        id: element.article,
        title: `${element.brand} ${element.article} ${element.name}`,
        description: element.name,
        link: `https://bayrakparts.com/stock/${element.article}`,
        price: `${Math.ceil(element.price * 1.12)} грн`,
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

    // Creating an object for downloading url
    const url = window.URL.createObjectURL(blob)

    // Creating an anchor(a) tag of HTML
    const a = document.createElement('a')

    // Passing the blob downloading url
    a.setAttribute('href', url)

    // Setting the anchor tag attribute for downloading
    // and passing the download file name
    a.setAttribute('download', 'download.csv')

    // Performing a download with click
    a.click()
  }

  const parseAndSentPrice = e => {
    e.preventDefault()
    parcingCsvToArray(e)
  }

  const getStock = async e => {
    e.preventDefault()
    const res = await fetch(`https://api.edetal.store/getStock`, {
      method: 'GET',
    })

    const body = await res.json()

    console.log(body)
  }

  const getProductMasterteile = async e => {
    const res = await fetch(
      `https://api.edetal.store/findProductMasterteile/YMQ503280`,
      {
        method: 'GET',
      }
    )

    const body = await res.json()

    console.log(body)
  }

  const getArrticlesMasterteile = async () => {
    const res = await fetch(
      `https://api.edetal.store/get_articles_masterteile`,
      {
        method: 'GET',
      }
    )

    const body = await res.json()

    console.log(body)
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.greenwall}></div>
        <div className={styles.upload_price_container}>
          {loading ? (
            <h1>Іде завантаження...</h1>
          ) : (
            <h1>Завантаження прайсу Masterteile</h1>
          )}
          {!loading ? (
            <form
              className={styles.upload_price_form}
              onSubmit={e => parcingArrToCSV(e)}
            >
              <label className={styles.name_of_field}>
                {' '}
                Виберіть прайс в форматі .txt (utf-8)
              </label>
              <input
                type="file"
                id="csvFile"
                accept=".csv"
                className={styles.get_price_input}
                onChange={e => setCsvFile(e.target.files[0])}
              />
              <button type="submit" className={styles.submit_button}>
                Завантажити прайс
              </button>
            </form>
          ) : null}

          {finished ? (
            <button
              className={styles.submit_button}
              onClick={() => getArrticlesMasterteile()}
            >
              Зформувати артикули
            </button>
          ) : null}
        </div>
        <div className={styles.greenwall}></div>
      </main>
    </>
  )
}

export default AddOrderStatus
