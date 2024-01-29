import Papa from 'papaparse'
import styles from '../../styles/UploadpriceMasterteile.module.css'
import { useState } from 'react'

const AddOrderStatus = () => {
  const [csvFile, setCsvFile] = useState(null)
  const [finished, setFinished] = useState(false)
  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [percent, setPercent] = useState(0)
  const [updatingArticles, setUpdatingArticles] = useState(false)

  var rounded = function (number) {
    return +number.toFixed(2)
  }

  const sentWholePriceToServer = async fullPrice => {
    const priceAmounts = Math.ceil(fullPrice.length / 300)
    setLoading(true)
    let step = 0
    let start = 0
    let percentStep = 100 / priceAmounts
    while (step < priceAmounts) {
      step++
      await sentPriceToServer(fullPrice.slice(start, start + 300))
      start = start + 300
      setPercent(prev => prev + percentStep)
      //await sentPriceToServer(fullPrice[step])
    }
    setPercent(0)
    setLoading(false)
    setFinished(true)
  }

  const sentWholePriceToServerForUpdating = async fullPrice => {
    const priceAmounts = Math.ceil(fullPrice.length / 300)
    setUpdating(true)
    let step = 0
    let percentStep = 100 / priceAmounts
    let start = 0
    while (step < priceAmounts) {
      step++
      await sentPriceToServerForUpdating(fullPrice.slice(start, start + 300))

      start = start + 300
      setPercent(prev => prev + percentStep)
    }
    await updateEmptyProducts()
    setPercent(0)
    setUpdating(false)
  }

  const sentWholeArticlesToServer = async () => {
    setUpdatingArticles(true)
    const res1 = await fetch(
      `https://api.bonapart.pro/delete_articles_msasterteile`,
      {
        method: 'GET',
      }
    )

    const body1 = await res1.json()

    const res = await fetch(`https://api.bonapart.pro/get_price_masterteile`, {
      method: 'GET',
    })

    const body = await res.json()

    const onlyArticles = body.map(item => item.article)

    console.log(onlyArticles)
    const priceAmounts = Math.ceil(onlyArticles.length / 5000)
    let step = 0
    let percentStep = 100 / priceAmounts
    let start = 0
    while (step < priceAmounts) {
      step++
      await sentArticlesToServer(onlyArticles.slice(start, start + 5000))
      start = start + 5000
      setPercent(prev => prev + percentStep)
    }
    setPercent(0)
    setUpdatingArticles(false)
  }

  const sentArticlesToServer = async price => {
    let token = await fetch(
      'https://api.bonapart.pro/uploadarticlesmasterteile',
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
    const date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    if (month < 10) {
      month = `0${month}`
    }
    let day = date.getDate()
    if (day < 10) {
      day = `0${day}`
    }
    const finalDate = `${day}.${month}.${year}`
    let token = await fetch('https://api.bonapart.pro/uploadpricemasterteile', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ priciList: price, date: finalDate }),
    })
  }

  const sentPriceToServerForUpdating = async price => {
    const date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    if (month < 10) {
      month = `0${month}`
    }
    let day = date.getDate()
    if (day < 10) {
      day = `0${day}`
    }
    const finalDate = `${day}.${month}.${year}`

    const response = await fetch(
      'https://masterteile.bayrakparts.com/updatemasterteileprice',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ priciList: price, date: finalDate }),
      }
    )
    if (!response?.ok) {
      const response1 = await fetch(
        'https://masterteile.bayrakparts.com/updatemasterteileprice',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ priciList: price, date: finalDate }),
        }
      )
      if (!response1?.ok) {
        const response2 = await fetch(
          'https://masterteile.bayrakparts.com/updatemasterteileprice',
          {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ priciList: price, date: finalDate }),
          }
        )
      }
    }

    // try {
    //   const response = await fetch(
    //     'https://api.bonapart.pro/updatemasterteileprice',
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       method: 'POST',
    //       body: JSON.stringify({ priciList: price, date: finalDate }),
    //     }
    //   )
    //   const json = await response.json()
    // } catch (error) {
    //   console.log('again')
    //   await fetch('https://api.bonapart.pro/updatemasterteileprice', {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     method: 'POST',
    //     body: JSON.stringify({ priciList: price, date: finalDate }),
    //   })
    // }
  }

  async function parcingCsvToArrayAndUpload(e) {
    e.preventDefault()
    Papa.parse(csvFile, {
      header: true,
      encoding: 'UTF-8',
      skipEmptyLines: true,
      complete: function (results) {
        const key = 'Article'
        const arrayUniqueByKey = [
          ...new Map(results.data.map(item => [item[key], item])).values(),
        ]
        console.log(results.data)
        console.log(arrayUniqueByKey)
        sentWholePriceToServer(arrayUniqueByKey)
      },
    })
  }

  async function parcingCsvToArrayAndUpdate(e) {
    e.preventDefault()
    Papa.parse(csvFile, {
      header: true,
      encoding: 'UTF-8',
      skipEmptyLines: true,
      complete: function (results) {
        const key = 'Номер деталі'
        const arrayUniqueByKey = [
          ...new Map(results.data.map(item => [item[key], item])).values(),
        ]
        sentWholePriceToServerForUpdating(arrayUniqueByKey)
      },
    })
  }

  const parseAndUploadPrice = e => {
    e.preventDefault()
    parcingCsvToArrayAndUpload(e)
  }

  const parseAndUpdatePrice = e => {
    e.preventDefault()
    parcingCsvToArrayAndUpdate(e)
  }

  const updateEmptyProducts = async () => {
    const date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    if (month < 10) {
      month = `0${month}`
    }
    let day = date.getDate()
    if (day < 10) {
      day = `0${day}`
    }
    const finalDate = `${day}.${month}.${year}`
    const res = await fetch(
      `https://masterteile.bayrakparts.com/get_price_masterteile`,
      {
        method: 'GET',
      }
    )
    const body = await res.json()
    console.log(body)

    const notUpdatedProducts = body.filter(
      product => product.lastUpdate != finalDate && product.amount > 0
    )
    console.log(notUpdatedProducts)

    let step = 0
    const priceAmounts = Math.ceil(notUpdatedProducts.length / 200)
    let start = 0

    while (step < priceAmounts) {
      step++
      let token = await fetch(
        'https://masterteile.bayrakparts.com/updateEndedProductMT',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            priciList: notUpdatedProducts.slice(start, start + 200),
            date: finalDate,
          }),
        }
      )

      start = start + 200
    }
  }

  const checkEmpty = async () => {
    const date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    if (month < 10) {
      month = `0${month}`
    }
    let day = date.getDate()
    if (day < 10) {
      day = `0${day}`
    }
    const finalDate = `${day}.${month}.${year}`
    const res = await fetch(`https://api.bonapart.pro/get_price_masterteile`, {
      method: 'GET',
    })
    const body = await res.json()
    console.log(body)

    const notUpdatedProducts = body.filter(product => product.amount === 0)

    console.log(notUpdatedProducts)
  }

  const getArrticlesMasterteile = async () => {
    const res = await fetch(
      `https://api.bonapart.pro/get_articles_masterteile`,
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
          <div className={styles.form_container}>
            {!loading ? (
              <h1>Завантажити прайс MT</h1>
            ) : (
              <h1>Завантажено {Math.ceil(percent.toFixed(2))}%</h1>
            )}
            <form
              className={styles.upload_price_form}
              onSubmit={e => parseAndUploadPrice(e)}
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
          </div>
          <div>
            {!updating ? (
              <h1>Оновити прайс MT</h1>
            ) : (
              <h1>Оновлено {rounded(percent)}%</h1>
            )}
            <form
              className={styles.upload_price_form}
              onSubmit={e => parseAndUpdatePrice(e)}
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
                Оновити прайс
              </button>
            </form>
          </div>
          <div>
            {!updatingArticles ? (
              <h1>Оновити артикули</h1>
            ) : (
              <h1>Оновлено {rounded(percent)}%</h1>
            )}
            <div className={styles.upload_price_form}>
              <button
                className={styles.submit_button}
                onClick={() => sentWholeArticlesToServer()}
              >
                Зформувати артикули
              </button>
              <button onClick={() => checkEmpty()}>
                Перевірити нульові залишки
              </button>
            </div>
          </div>
        </div>
        <div className={styles.greenwall}></div>
      </main>
    </>
  )
}

export default AddOrderStatus
