import Head from 'next/head'
import { useContext, useState, useEffect } from 'react'
import { ShopContext } from '@/components/contex/contex'
import { useRouter } from 'next/router'
import styles from '../styles/Checkout.module.css'
import * as ga from '../components/lib/gtag'
import { newpost, cuirer, cash, credit } from '@/components/SVGs/SVGs'

const Spiner = () => {
  return (
    <div className={styles.lds_facebook}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

const CheckOut = () => {
  const router = useRouter()
  const { asPath } = useRouter()

  const {
    cartItems,
    cartsItemsObj,
    addToCart,
    removeOneUnit,
    setCartItems,
    setItemsNumber,
    setCartsItemsObj,
    user,
    updateUserDetails,
    updateUserPhone,
  } = useContext(ShopContext)

  const [city, setCity] = useState('')
  const [cities, setCities] = useState([])
  const [visibility, setVisibility] = useState(false)
  const [choosenCity, setChoosenCity] = useState('')
  const [department, setDepartment] = useState('')
  const [departments, setDepartments] = useState([])
  const [pib, setPib] = useState('')
  const [phone, setPhone] = useState('')
  const [loadingDepartments, setLoadingDepartments] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deliveryType, setDeliveryType] = useState('NewPost')

  const articlesToSend = `Артикули : ${cartItems.map(
    product =>
      `${product.article + 'к-сть : ' + cartsItemsObj[product.article]} `
  )}`

  useEffect(() => {
    if (city.length < 3) {
      setCities([])
      setChoosenCity('')
      setVisibility(false)
    } else if (choosenCity.length > 0 || city === user?.npCity) {
      return
    } else {
      const abortController = new AbortController()
      const { signal } = abortController

      const apiCall = async () => {
        try {
          const data = {
            city1: city,
          }
          const res = await fetch(
            `https://api.edetal.store/novaposhta?city1=${encodeURIComponent(
              data.city1
            )}`,
            {
              method: 'GET',
              signal: signal,
            }
          )

          const body = await res.json()
          setCities(body.data[0]?.Addresses)
          setVisibility(true)
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
  }, [city])

  useEffect(() => {
    if (choosenCity === '') {
      return
    } else {
      setLoadingDepartments(true)
      const abortController = new AbortController()
      const { signal } = abortController
      const apiCall = async () => {
        try {
          const data = {
            city1: choosenCity,
          }

          const res = await fetch(
            `https://api.edetal.store/novaposhtadepartments?city1=${encodeURIComponent(
              data.city1
            )}`,
            {
              method: 'GET',
              signal: signal,
            }
          )

          const body = await res.json()
          setLoadingDepartments(false)
          setDepartments(body.data)
          if (body.data.length === 1) {
            setDepartment(body.data[0].Description)
          }
        } catch (error) {
          if (!signal?.aborted) {
            setLoadingDepartments(false)
            console.error(error)
          }
        }
      }

      apiCall()

      return () => {
        abortController.abort()
      }
    }
  }, [choosenCity])

  useEffect(() => {
    if (user) {
      setCity(user.npCity)
      setDepartment(user.npDepartment)
      setDepartments([{ Description: user.npDepartment }])
      setPib(user.name)
      setPhone(user.phone)
    }
  }, [])

  const submitOrder = async e => {
    e.preventDefault()
    setLoading(true)
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
    const hour = date.getHours()
    let minutes = date.getMinutes()
    if (minutes < 10) {
      minutes = `0${minutes}`
    }

    const finalDate = `${day}.${month}.${year}, ${hour}:${minutes}`

    let userId = 'Роздрібний клієнт'

    const res = await fetch(`https://api.edetal.store/getOrders`, {
      method: 'GET',
    })

    const body = await res.json()
    const orderNumber = +body[body.length - 1].order_id + 1
    let token = await fetch('https://api.edetal.store/create_order_status', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        order_id: orderNumber,
        status: 'Замовлення створене, та ще не обробилось нашою системою',
        lastUpdateTime: finalDate,
        createdTime: finalDate,
        order_items: cartItems,
        items_amount: cartsItemsObj,
        delivery_info: {
          city: city,
          department: department,
          pib: pib,
          phone: phone,
        },
        user_id: userId,
      }),
    })
    ga.event({
      action: 'purchase',
      params: {
        page_location: `https://www.bayrakparts.com${asPath}`,
      },
    })
    setCartItems([])
    localStorage.setItem('cartItems', JSON.stringify([]))
    setItemsNumber(0)
    localStorage.setItem('itemsNumber', JSON.stringify(0))
    setCartsItemsObj({})
    localStorage.setItem('cartItemsObj', JSON.stringify({}))
    fetch(
      `https://api.telegram.org/bot6173056848:AAE0eviFsiQtx0CWxEJyBizEdl_zhaJ0P1w/sendMessage?chat_id=@edetalRequests&text=Нове замовлення ${orderNumber} BayrakParts! ${
        city + ' ' + department + ' ' + pib + ' ' + phone + ' ' + articlesToSend
      }`
    )
    setLoading(false)
    router.push(
      { pathname: '/thankyou_for_order', query: { orderNumber: orderNumber } },
      'thankyou_for_order'
    )
  }

  const chooseCity = async (choosencity, cityref) => {
    setChoosenCity(cityref)
    setCity(choosencity)
    setVisibility(false)
  }

  const chooseDepartment = async e => {
    setDepartment(e.target.value)
    if (user) {
      let updateUserDeliveryDetails = await fetch(
        `https://api.edetal.store/update_user_delivery_details/${user?.email}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PATCH',
          body: JSON.stringify({
            npCity: city,
            npDepartment: e.target.value,
          }),
        }
      )
      updateUserDetails(city, e.target.value)
    }
  }

  const addOneUnit = (item, e) => {
    e.preventDefault()
    addToCart(item)
  }

  const removOneUnit = (item, e) => {
    e.preventDefault()
    removeOneUnit(item)
  }

  var total = 0

  var sum = cartItems.reduce(function (accumulator, currentValue) {
    return (
      accumulator + currentValue.price * cartsItemsObj[currentValue.article]
    )
  }, total)

  return (
    <>
      <Head>
        <title>BayrakParts || Запчастини до твого авто</title>
        <meta
          name="description"
          content="Оформлення замовлення. Запчатини Hyundai/KIA , Toyota/Lexus, Nissan, Mazda, Honda, Subaru, BMW, Volkswagen. У нас Ви можете купити запчастини до ходової частини, двигуна, кузову, трансмісії, комплекти для ТО, комплекти ГРМ, водяні помпи, масла, фільтра, амортизатори, сайлентблоки. В наявності більше 50000 запчастин. Відправляємо в день замовлення. "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main onClick={() => setVisibility(false)}>
        {cartItems.length === 0 ? (
          <div className={styles.page_container}>
            <div className={styles.cart_container}>
              <h1>Жодного товару не обрано</h1>
            </div>
          </div>
        ) : (
          <div className={styles.page_container}>
            {loading ? (
              <Spiner />
            ) : (
              <form
                className={styles.cart_container}
                onSubmit={e => {
                  submitOrder(e)
                }}
              >
                <h1>Ваше замовлення</h1>

                {cartItems.map(item => (
                  <div className={styles.list_of_products}>
                    <img src={item.img} />
                    <div className={styles.item_title_descr}>{item.title}</div>
                    <span className={styles.amount_cont}>
                      <button
                        className={styles.plus_min_btn}
                        onClick={e => removOneUnit(item.article, e)}
                      >
                        -
                      </button>
                      {cartsItemsObj[item.article]}
                      <button
                        className={styles.plus_min_btn}
                        onClick={e => addOneUnit(item, e)}
                      >
                        +
                      </button>
                    </span>
                    {item.price * cartsItemsObj[item.article]} грн
                  </div>
                ))}
                <div className={styles.general_sum}>До оплати : {sum} грн</div>
                <div className={styles.container_for_delivery_and_person}>
                  <div className={styles.container_for_input_and_cities}>
                    <h2 className={styles.titles_in_card}>
                      Оберіть тип доставки
                    </h2>
                    <div className={styles.check_boxs_cont}>
                      <div className={styles.check_box_cont}>
                        <input
                          type="radio"
                          name="delivery"
                          id="newpost"
                          checked="checked"
                          onChange={() => setDeliveryType('NewPost')}
                        />
                        <label for="newpost" className={styles.check_box_cont}>
                          {newpost}У відділення чи поштомат Нової пошти
                        </label>
                      </div>
                      <div className={styles.check_box_cont}>
                        <input
                          type="radio"
                          name="delivery"
                          id="curierNP"
                          onChange={() => setDeliveryType('curier')}
                        />
                        <label for="curierNP" className={styles.check_box_cont}>
                          {cuirer}Кур'єрська доставка
                        </label>
                      </div>
                    </div>
                    <div className={styles.contaiern_for_inputs_row}>
                      <div className={styles.contaiern_for_input_row}>
                        <label>Місто</label>
                        <input
                          className={styles.new_post_input_city}
                          value={city}
                          onChange={e => setCity(e.target.value)}
                          required
                        ></input>
                        {!visibility ? null : (
                          <div className={styles.fetched_cities}>
                            {cities?.map(city => (
                              <span
                                className={styles.fetched_city}
                                onClick={() =>
                                  chooseCity(city.Present, city.DeliveryCity)
                                }
                              >
                                {city.Present}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      {deliveryType === 'NewPost' ? (
                        <div className={styles.contaiern_for_input_row}>
                          <label>Відділення</label>

                          <select
                            className={styles.new_post_input_city}
                            value={department}
                            onChange={e => chooseDepartment(e)}
                          >
                            {loadingDepartments === true ? (
                              <option className={styles.loading}>
                                Завантажуємо відділення...
                              </option>
                            ) : (
                              departments.map(city => (
                                <option>{city.Description}</option>
                              ))
                            )}
                          </select>
                        </div>
                      ) : (
                        <div className={styles.contaiern_for_input_row}>
                          <label>Вулиця/ Будинок/ Квартира</label>

                          <input
                            className={styles.new_post_input_city}
                            value={department}
                            onChange={e => setDepartment(e.target.value)}
                            required
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.container_for_payment}>
                    <h2 className={styles.titles_in_card}>Тип оплати</h2>
                    <div className={styles.contaiern_for_inputs_row}>
                      <div className={styles.check_boxs_cont}>
                        <div className={styles.check_box_cont}>
                          <input
                            type="radio"
                            name="payment"
                            id="cash"
                            checked="checked"
                          />
                          <label for="cash" className={styles.check_box_cont}>
                            {cash}Післяплата у відділенні
                          </label>
                        </div>
                        <div className={styles.check_box_cont}>
                          <input type="radio" name="payment" id="creditcard" />
                          <label
                            for="creditcard"
                            className={styles.check_box_cont}
                          >
                            {credit}На безготівкоий рахунок
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.container_for_input_and_cities}>
                    <h2 className={styles.titles_in_card}>Отримувач</h2>
                    <div className={styles.contaiern_for_inputs_row}>
                      <div className={styles.contaiern_for_input_row}>
                        <label>Прізвище та ім'я</label>
                        <input
                          value={pib}
                          className={styles.new_post_input_city}
                          required
                          minlength="5"
                          type="text"
                          onChange={e => setPib(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                            }
                          }}
                        ></input>
                      </div>
                      <div className={styles.contaiern_for_input_row}>
                        <label>Телефон</label>
                        <input
                          className={styles.new_post_input_city}
                          placeholder="+380 -- --- ---"
                          required
                          value={phone}
                          minlength="10"
                          onChange={e => setPhone(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                            }
                          }}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" className={styles.submit_order_btn}>
                  Замовити
                </button>
              </form>
            )}
          </div>
        )}
      </main>
    </>
  )
}

export default CheckOut
