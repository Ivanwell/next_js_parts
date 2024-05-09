import Head from 'next/head'
import { useState, useEffect } from 'react'
import styles from '../styles/Checkout.module.css'
import * as ga from '../components/lib/gtag'
import {
  newpost,
  cuirer,
  cash,
  credit,
  checkedCircule,
} from '@/components/SVGs/SVGs'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  adddToCart,
  removeOneItemRe,
  deleteAllItems,
} from '@/global_state/features/cart_redux'

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
  const sumury1 = useSelector(state => state.cartReducer.value.list)
  const sumury2 = useSelector(state => state.cartReducer.value.sum)

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
  const [deliveryType, setDeliveryType] = useState('Newpost')
  const [paymentType, setPaymentType] = useState('Cash')

  useEffect(() => {
    if (city.length < 3) {
      setCities([])
      setChoosenCity('')
      setVisibility(false)
    } else if (choosenCity.length > 0) {
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
            `https://api.bayrakparts.com/api/info/get_cities?city=${city}`,
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
          const res = await fetch(
            `https://api.bayrakparts.com/api/info/get_departments?cityref=${choosenCity}`,
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

  const submitOrder = async e => {
    e.preventDefault()
    setLoading(true)

    let request = await fetch(
      'https://api.bayrakparts.com/api/info/create_order',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          products: sumury1,
          delivery: {
            city: city,
            department: department,
            pib: pib,
            phone: phone,
          },
        }),
      }
    )

    const orderNumber = await request.json()

    ga.event({
      action: 'purchase',
    })

    dispatch(deleteAllItems())
    setLoading(false)
    console.log(orderNumber)
    // router.push(
    //   { pathname: '/thankyou_for_order', query: { orderNumber: orderNumber } },
    //   'thankyou_for_order'
    // )
  }

  const chooseCity = async (choosencity, cityref) => {
    setChoosenCity(cityref)
    setCity(choosencity)
    setVisibility(false)
  }

  const chooseDepartment = async e => {
    setDepartment(e.target.value)
  }

  const addOneUnit = (item, e) => {
    e.preventDefault()
    const newItem = { ...item, quantity: 1 }
    dispatch(adddToCart(newItem))
  }

  const removOneUnit = (item, e) => {
    e.preventDefault()
    dispatch(removeOneItemRe(item))
  }

  const dispatch = useDispatch()

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
        {sumury1.length === 0 ? (
          <div className={styles.page_container}>
            <div className={styles.cart_container}>
              <h1>Жодного товару не обрано!</h1>
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
                <h1>Ваше замовлення!</h1>

                {sumury1.map(item => (
                  <div className={styles.list_of_products}>
                    <img src={item.img} />
                    <div className={styles.item_title_descr}>{item.title}</div>
                    <span className={styles.amount_cont}>
                      <button
                        className={styles.plus_min_btn}
                        onClick={e => removOneUnit(item, e)}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        className={styles.plus_min_btn}
                        onClick={e => addOneUnit(item, e)}
                      >
                        +
                      </button>
                    </span>
                    {item.price * item.quantity} грн
                  </div>
                ))}
                <div className={styles.general_sum}>
                  До оплати : {sumury2} грн
                </div>
                <div className={styles.container_for_delivery_and_person}>
                  <div className={styles.container_for_input_and_cities}>
                    <div className={styles.container_for_payment}>
                      <h2 className={styles.titles_in_card}>Тип оплати</h2>
                      <div className={styles.contaiern_for_inputs_row}>
                        <div className={styles.check_boxs_cont}>
                          <div className={styles.cont_for_but}>
                            <input
                              type="radio"
                              name="payment"
                              id="cash"
                              value="Cash"
                              checked={paymentType === 'Cash'}
                              onChange={e => setPaymentType(e.target.value)}
                            />
                            <label
                              for="cash"
                              className={
                                paymentType != 'Cash'
                                  ? styles.check_box_cont
                                  : styles.check_box_cont_checked
                              }
                            >
                              {cash}Післяплата у відділенні
                            </label>
                            {paymentType === 'Cash' ? checkedCircule : null}
                          </div>
                          <div className={styles.cont_for_but}>
                            <input
                              type="radio"
                              name="payment"
                              value="Card"
                              id="creditcard"
                              checked={paymentType === 'Card'}
                              onChange={e => setPaymentType(e.target.value)}
                            />
                            <label
                              for="creditcard"
                              className={
                                paymentType != 'Card'
                                  ? styles.check_box_cont
                                  : styles.check_box_cont_checked
                              }
                            >
                              {credit}На безготівкоий рахунок
                            </label>
                            {paymentType === 'Card' ? checkedCircule : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <h2 className={styles.titles_in_card}>Тип доставки</h2>
                    <div className={styles.check_boxs_cont}>
                      <div className={styles.cont_for_but}>
                        <input
                          type="radio"
                          name="delivery"
                          id="newpost"
                          value="Newpost"
                          onChange={e => setDeliveryType(e.target.value)}
                        />
                        <label
                          for="newpost"
                          className={
                            deliveryType != 'Newpost'
                              ? styles.check_box_cont
                              : styles.check_box_cont_checked
                          }
                        >
                          {newpost}У відділення Нової пошти
                        </label>
                        {deliveryType === 'Newpost' ? checkedCircule : null}
                      </div>
                      <div className={styles.cont_for_but}>
                        <input
                          type="radio"
                          name="delivery"
                          id="curierNP"
                          value="Curier"
                          onChange={e => setDeliveryType(e.target.value)}
                        />
                        <label
                          for="curierNP"
                          className={
                            deliveryType != 'Curier'
                              ? styles.check_box_cont
                              : styles.check_box_cont_checked
                          }
                        >
                          {cuirer}Кур'єрська доставка
                        </label>
                        {deliveryType === 'Curier' ? checkedCircule : null}
                      </div>
                    </div>
                    {/* <div className={styles.contaiern_for_inputs_row}>
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
                      {deliveryType === 'Newpost' ? (
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
                    </div> */}
                    <h2 className={styles.titles_in_card}>
                      Місто та відділення
                    </h2>
                    <div className={styles.cont_for_city_and_dep}>
                      <div className={styles.box}>
                        <input
                          maxlength="30"
                          className={styles.input_pass}
                          value={city}
                          onChange={e => setCity(e.target.value)}
                          required
                          placeholder=" "
                        />
                        <label className={styles.label_pass} for="vin">
                          Населений пункт
                        </label>
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
                      {deliveryType === 'Newpost' ? (
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
                      ) : (
                        <div className={styles.box}>
                          <input
                            maxlength="30"
                            className={styles.input_pass}
                            value={department}
                            required
                            placeholder=" "
                            minlength="5"
                            type="text"
                            onChange={e => setDepartment(e.target.value)}
                          />
                          <label className={styles.label_pass} for="vin">
                            Адреса
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles.container_for_input_and_cities}>
                    <h2 className={styles.titles_in_card}>Отримувач</h2>
                    {/* <div className={styles.contaiern_for_inputs_row}>
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
                    </div> */}
                    <div className={styles.cont_for_city_and_dep}>
                      <div className={styles.box}>
                        <input
                          maxlength="30"
                          className={styles.input_pass}
                          value={pib}
                          required
                          placeholder=" "
                          minlength="5"
                          type="text"
                          onChange={e => setPib(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                            }
                          }}
                        />
                        <label className={styles.label_pass} for="vin">
                          Прізвище та ім'я
                        </label>
                      </div>
                      <div className={styles.box}>
                        <input
                          minlength="10"
                          className={styles.input_pass}
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                            }
                          }}
                          required
                          placeholder=" "
                        />
                        <label className={styles.label_pass} for="vin">
                          +380 -- --- ---
                        </label>
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
