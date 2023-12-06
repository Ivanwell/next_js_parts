import Papa from 'papaparse'
import styles from '../../styles/UploadpriceMasterteile.module.css'
import { useState } from 'react'

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

  const sentWholeArticlesToServer = async onlyArticles => {
    const articleAmounts = Math.ceil(onlyArticles.length / 4000)
    setLoading(true)
    let step = 0
    let start = 0
    while (step < articleAmounts) {
      step++
      await sentArticlesToServer(onlyArticles.slice(start, start + 4000))
      start = start + 4000
    }
    setLoading(false)
  }

  const sentArticlesToServer = async price => {
    let token = await fetch('https://api.edetal.store/uploadarticlestm', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(price),
    })
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

  async function parcingCsvToArray(e) {
    e.preventDefault()
    Papa.parse(csvFile, {
      header: true,
      encoding: 'UTF-8',
      skipEmptyLines: true,
      complete: function (results) {
        const onlyArticles = results.data.map(element => element.Code)
        console.log(onlyArticles)
        sentWholeArticlesToServer(onlyArticles)
      },
    })
  }

  const parseAndSentPrice = e => {
    e.preventDefault()
    parcingCsvToArray(e)
  }

  const getPricesTechnoMir = async e => {
    const res = await fetch(`https://api.edetal.store/partsTM4`, {
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
  }

  const getArrticlesMasterteile = async () => {
    const res = await fetch(
      `https://api.edetal.store/get_articles_masterteile`,
      {
        method: 'GET',
      }
    )

    const body = await res.json()
  }

  const testVin = async () => {
    const data = {
      vin: 'VF77J9HL0AJ879oo 1 '.replace(/[- /]/g, ''),
    }
    const res = await fetch(
      `https://api.edetal.store/get_info_by_vin?vin=${encodeURIComponent(
        data.vin
      )}`,
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
            <h1>Завантаження прайсу STLK</h1>
          )}
          {!loading ? (
            <form
              className={styles.upload_price_form}
              onSubmit={e => parseAndSentPrice(e)}
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
        <button onClick={() => testVin()}> Вінкод </button>
        <div className={styles.greenwall}></div>
      </main>
    </>
  )
}

export default AddOrderStatus
