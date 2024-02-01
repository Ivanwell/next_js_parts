import Papa from 'papaparse'
import styles from '../../styles/UploadpriceMasterteile.module.css'
import { useState } from 'react'

const AddOrderStatus = () => {
  const [csvFile, setCsvFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [startPoint, setStartPoint] = useState(0)
  const [endPoint, setEndPoint] = useState(0)

  const getFullPrice = async () => {
    const res1 = await fetch(`https://api.bonapart.pro/getprices`, {
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

        const hello = grm.find(item => item['Артикул'] === '530   0237 10')[
          'ІД'
        ]
        console.log(hello)
        //getAllItems(grm)
      },
    })
  }

  async function parcingCsvToArrayAndUpdate(e) {
    e.preventDefault()
    Papa.parse(csvFile, {
      header: true,
      encoding: 'UTF-8',
      skipEmptyLines: true,
      complete: async function (results) {
        const key = 'Номер деталі'
        const arrayUniqueByKey = [
          ...new Map(results.data.map(item => [item[key], item])).values(),
        ]

        let start = 8300

        while (start < arrayUniqueByKey.length) {
          const res1 = await fetch(
            `http://backend.bayrakparts.com/updateMasterteile`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
              body: JSON.stringify({
                arr: arrayUniqueByKey.slice(start, start + 100),
              }),
            }
          )
          const body1 = await res1.json()
          start += 100
        }
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

  const test2 = async () => {
    // const res = await fetch(`http://backend.bayrakparts.com/give_direct`, {
    //   method: 'GET',
    // })
    // const body = await res.json()
    // console.log(body)
    // let newArr = []
    // let step = 0
    // while (step < body.length) {
    //   const filtered = body.filter(item => item.article === body[step].article)
    //   if (filtered.length > 1) {
    //     newArr.push(filtered)
    //   }
    //   step++
    // }
    // console.log(newArr)
    // const spilni = body.filter(item => item.suplierID === 'BMPA')
    // console.log(spilni)
    // const res = await fetch(`http://backend.bayrakparts.com/getGrm`, {
    //   method: 'GET',
    // })
    // const body = await res.json()
    // console.log(body)
    // const spilni = body.filter(item => item.supliers.length > 2)
    // console.log(spilni)
    // const data = {
    //   article1: '53142',
    // }
    // const res = await fetch(
    //   `https://api.bonapart.pro/bmpart?article1=${encodeURIComponent(
    //     data.article1
    //   )}`,
    //   {
    //     method: 'GET',
    //   }
    // )
    // const item = await res.json()
    // console.log(item)
    // const res1 = await fetch(`http://backend.bayrakparts.com/artic`, {
    //   method: 'GET',
    // })
    // const body = await res1.json()
    // console.log(body)
    // const filtered = body.filter(item => item.categories.length === 0)
    // console.log(filtered)
    // const res1 = await fetch(`https://backend.bayrakparts.com/get_categories`, {
    //   method: 'GET',
    // })
    // const body1 = await res1.json()
    // console.log(body1)

    // const filtered = body1.filter(item => item.link.includes('<'))
    // console.log(filtered)

    // const data = {
    //   article1: 'Супорт гальмівний',
    // }

    // const res2 = await fetch(
    //   `http://backend.bayrakparts.com/get_products_by_category/${encodeURIComponent(
    //     data.article1
    //   )}`,
    //   {
    //     method: 'GET',
    //   }
    // )
    // const body2 = await res2.json()
    // console.log(body2)

    // const filtered = body2.filter(item => item.link.includes('Ё'))
    // console.log(filtered)
    // const filt = []
    // let step = 0
    // while (step < body2.length) {
    //   const data = body2[step].supliers.find(item => item.suplierID === 'BMPA')
    //   if (data) {
    //     filt.push(body2[step])
    //   }
    //   step++
    // }

    // console.log(filt)

    // const withoutCatName = filt.filter(
    //   item => item.categoryName == undefined && item.categories[0] == undefined
    // )

    // console.log(withoutCatName)

    // const withoutCat = filt.filter(item => item.categories[0] === null)

    // console.log(withoutCat)

    // const body3 = body2.filter(
    //   item => item.categoryName == undefined && item.categories[0] != undefined
    // )
    // console.log(body3)
    // const body4 = body2.filter(item => item.categories[0] === null)
    // console.log(body4)
    // const body3 = body2.slice(0, 1597)
    // const body4 = body3.filter(item => item.categories.length === 0)
    // console.log(body4)
    const res4 = await fetch(
      `https://backend.bayrakparts.com/getProductsByEngine`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          category: 'Двигун/Механізм газорозподілу',
          brand: 'BMW',
          model: '5 (E39)',
          engine: '530 d 184 л.с. (1998-2000)',
        }),
      }
    )
    const body5 = await res4.json()

    console.log(body5)

    // const arr = []
    // let step = 0
    // while (step < body1.length) {
    //   const data = body1.filter(item => item.link === body1[step].link)
    //   if (data.length > 1) {
    //     if (!arr.find(item => item === data[0].link)) {
    //       arr.push(data[0].link)
    //     }
    //   }
    //   step++
    // }
    // console.log(arr)

    // const key = 'link'
    // const arrayUniqueByKey = [
    //   ...new Map(body1.map(item => [item[key], item])).values(),
    // ]

    // console.log(arrayUniqueByKey)

    // const filtered = body1.filter(item => item.link.length === 0)

    // console.log(filtered)
    // const res1 = await fetch(
    //   `http://backend.bayrakparts.com/get_products_by_category`,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     method: 'POST',
    //     body: JSON.stringify({
    //       category: 'Комплект ланцюга привода розподільного валу',
    //     }),
    //   }
    // )
    // const body1 = await res1.json()
    // console.log(body1)
    // let start = 0
    // while (start < filtered.length) {
    //   const res3 = await fetch(
    //     `http://backend.bayrakparts.com/add_cat_to_empty_cat`,
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       method: 'POST',
    //       body: JSON.stringify({ arr: filtered.slice(start, start + 50) }),
    //     }
    //   )
    //   const body3 = await res3.json()
    //   start = start + 50
    // }
    // const res1 = await fetch(`http://backend.bayrakparts.com/get_nodedes`, {
    //   method: 'GET',
    // })
    // const body = await res1.json()
    // console.log(body)
    // const mains = body.filter(cat => cat.fullPath.length === 1)
    // console.log(mains)
    // const art = '9778A64A9648A712438B56CC8166404F'
    // const res1 = await fetch(`https://api.bm.parts/product/${art}?oe=full`, {
    //   method: 'GET',
    //   headers: {
    //     Authorization:
    //       '4b17c6ab-d276-43cb-a6bf-bd041bf7bec8.1oR0k6llb6Wpim03FgaovxLlNhE',
    //   },
    //   'User-Agent':
    //     'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36',
    // })
    // const body = await res1.json()
    // console.log(body)
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
      `https://api.bonapart.pro/bmparts?article1=${encodeURIComponent(
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

    const res = await fetch(`https://api.bonapart.pro/getStock`, {
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

  const getItemm = async () => {
    const res = await fetch(
      `https://backend.bayrakparts.com/get_item_info/0281006101`,
      {
        method: 'GET',
      }
    )
    const body = await res.json()
    return body
    console.log(body)
  }

  const alphavet = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    є: 'ye',
    ж: 'zh',
    з: 'z',
    и: 'y',
    і: 'i',
    ї: 'yi',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'sch',
    ь: '',
    ю: 'yu',
    я: 'ya',
    '/': '-',
    '&': '',
    '(': '',
    ')': '',
  }

  const convertingToLAtin = async data => {
    const stringArr = data.title.split(' ').slice(0, 5)
    const string = stringArr.join(' ') + ' ' + data.brand + ' ' + data.article
    let step = 0
    let newString = ''
    while (step < string.length) {
      let newChart = alphavet[string[step].toLowerCase()]
      if (newChart === undefined) {
        newChart = string[step].toLowerCase()
      }
      newString = newString + newChart
      step++
    }
    const finalUrl = newString.split(' ')
    const finalfinal = finalUrl.join('-')
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.greenwall}></div>
        <div className={styles.upload_price_container}>
          {/* {!loading ? (
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
          ) : null} */}
          <input type="file" onChange={e => setCsvFile(e.target.files[0])} />
          <button onClick={e => test2()}>djskgjsgkjlf</button>
        </div>
        <div className={styles.greenwall}></div>
      </main>
    </>
  )
}

export default AddOrderStatus
