import { createContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import * as ga from '../lib/gtag'

export const ShopContext = createContext(null)

export const ShopContextProvider = props => {
  const [fromData, setFormData] = useState(null)
  const [brandSearch, setBrandSearch] = useState(null)
  const [model, setModel] = useState(null)
  const [category, setCategory] = useState(null)
  const [part, setPart] = useState(null)
  const [loading, setLoading] = useState(false)

  const [cartItems, setCartItems] = useState([])
  const [itemsNumber, setItemsNumber] = useState(0)
  const [cartsItemsObj, setCartsItemsObj] = useState({})
  const [openCard, setOpenCard] = useState({})
  const [brand, setBrand] = useState(null)
  const [openMenu, setOpenMenu] = useState(false)
  const [openedUserMenu, setOpenUserMenu] = useState(false)
  const [user, setUser] = useState(null)
  const [isMaximumItems, setIsMaksimunItems] = useState({
    active: false,
    article: '',
  })
  const [customerModel, setCustomerModel] = useState({
    brand: '',
    model: '',
  })

  const [openAddedToCard, setOpenAddedToCard] = useState(false)

  useEffect(() => {
    if (
      JSON.parse(sessionStorage.getItem('user')) === null ||
      JSON.parse(sessionStorage.getItem('user')) === {}
    ) {
    } else {
      const coockedUser = JSON.parse(sessionStorage.getItem('user'))
      setUser(prev => (prev = coockedUser))
      if (coockedUser.carInGarage?.model && coockedUser.carInGarage?.brand) {
        setCustomerModel(
          prev =>
            (prev = {
              brand: coockedUser.carInGarage.brand,
              model: coockedUser.carInGarage.model,
            })
        )
      } else {
        if (
          JSON.parse(localStorage.getItem('customerModel')) === null ||
          JSON.parse(localStorage.getItem('customerModel')) ===
            { brand: '', model: '' }
        ) {
        } else {
          const choosedModel = JSON.parse(localStorage.getItem('customerModel'))
          setCustomerModel(
            prev =>
              (prev = {
                brand: choosedModel.brand,
                model: choosedModel.model,
              })
          )
        }
      }
    }
    if (
      JSON.parse(localStorage.getItem('itemsNumber')) === 0 ||
      JSON.parse(localStorage.getItem('itemsNumber')) === null
    ) {
    } else {
      const newNumber = JSON.parse(localStorage.getItem('itemsNumber'))
      setItemsNumber(newNumber)
    }

    if (
      JSON.parse(localStorage.getItem('cartItems')) === [] ||
      JSON.parse(localStorage.getItem('cartItems')) === null
    ) {
    } else {
      const newNumber = JSON.parse(localStorage.getItem('cartItems'))
      setCartItems(newNumber)
    }

    if (
      JSON.parse(localStorage.getItem('cartsItemsObj')) === {} ||
      JSON.parse(localStorage.getItem('cartsItemsObj')) === null
    ) {
    } else {
      const newNumber = JSON.parse(localStorage.getItem('cartsItemsObj'))
      setCartsItemsObj(newNumber)
    }
    // console.log(user)
    // if (user) {
    //   if (user.carInGarage.model && user.carInGarage.brand) {
    //     setCustomerModel(
    //       prev =>
    //         (prev = {
    //           brand: user.carInGarage.brand,
    //           model: user.carInGarage.model,
    //         })
    //     )
    //   } else {
    //   }
    // } else {
    //   if (
    //     JSON.parse(localStorage.getItem('customerModel')) === null ||
    //     JSON.parse(localStorage.getItem('customerModel')) ===
    //       { brand: '', model: '' }
    //   ) {
    //   } else {
    //     const choosedModel = JSON.parse(localStorage.getItem('customerModel'))
    //     setCustomerModel(
    //       prev =>
    //         (prev = {
    //           brand: choosedModel.brand,
    //           model: choosedModel.model,
    //         })
    //     )
    //   }
    // }
  }, [])

  useEffect(() => {
    console.log(user)
    if (user === null) {
      if (
        JSON.parse(localStorage.getItem('customerModel')) === null ||
        JSON.parse(localStorage.getItem('customerModel')) ===
          { brand: '', model: '' }
      ) {
      } else {
        const choosedModel = JSON.parse(localStorage.getItem('customerModel'))
        setCustomerModel(
          prev =>
            (prev = {
              brand: choosedModel.brand,
              model: choosedModel.model,
            })
        )
      }
    } else {
      if (user.carInGarage?.model && user.carInGarage?.brand) {
        setCustomerModel(
          prev =>
            (prev = {
              brand: user.carInGarage.brand,
              model: user.carInGarage.model,
            })
        )
      }
    }
    sessionStorage.setItem('user', JSON.stringify(user))
  }, [user])

  // useEffect(() => {
  //   const abortController = new AbortController()
  //   const { signal } = abortController
  //   const apiCall = async () => {
  //     try {
  //       setLoading(true)
  //       const res = await fetch(`https://api.edetal.store/getSearchCatParts`, {
  //         method: 'GET',
  //         signal: signal,
  //       })

  //       const body = await res.json()
  //       setFormData(body[0].partsData)
  //       setLoading(false)
  //     } catch (error) {
  //       if (!signal?.aborted) {
  //         console.error(error)
  //         setLoading(false)
  //       }
  //     }
  //   }
  //   apiCall()

  //   return () => {
  //     abortController.abort()
  //   }
  // }, [])

  const chooseCustomerModel = (brand1, model1) => {
    setCustomerModel(
      prev =>
        (prev = {
          brand: brand1,
          model: model1,
        })
    )
    localStorage.setItem(
      'customerModel',
      JSON.stringify({
        brand: brand1,
        model: model1,
      })
    )
  }

  function createObj(item) {
    if (typeof cartsItemsObj[item.article] == 'number') {
      cartsItemsObj[item.article] = cartsItemsObj[item.article] + 1
      setCartsItemsObj(cartsItemsObj)
      localStorage.setItem('cartsItemsObj', JSON.stringify(cartsItemsObj))
    } else {
      cartsItemsObj[item.article] = 1
      setCartsItemsObj(cartsItemsObj)
      localStorage.setItem('cartsItemsObj', JSON.stringify(cartsItemsObj))
    }
  }

  const addToCart = item => {
    if (
      cartsItemsObj[item.article] == item.lvivStock ||
      cartsItemsObj[item.article] == item.otherStock
    ) {
      setIsMaksimunItems({
        active: true,
        article: item.article,
        aviability: true,
        quantity: cartsItemsObj[item.article],
      })
      setTimeout(() => {
        setIsMaksimunItems({
          active: false,
          article: item.article,
          aviability: true,
          quantity: cartsItemsObj[item.article],
        })
      }, 3000)
      return
    } else if (
      (item.lvivStock === '-' && item.otherStock === '-') ||
      (item.lvivStock === 0 && item.otherStock === '-')
    ) {
      setIsMaksimunItems({
        active: true,
        article: item.article,
        aviability: false,
        quantity: cartsItemsObj[item.article],
      })
      setTimeout(() => {
        setIsMaksimunItems({
          active: false,
          article: item.article,
          aviability: false,
          quantity: cartsItemsObj[item.article],
        })
      }, 3000)
      return
    }
    if (cartItems.find(product => product.article === item.article)) {
      setItemsNumber(prev => prev + 1)
      localStorage.setItem('itemsNumber', JSON.stringify(itemsNumber + 1))
      createObj(item)
      ga.event({
        action: 'add_to_cart',
      })
      setOpenAddedToCard(true)
    } else {
      cartItems.push(item)
      setCartItems(cartItems)
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      setItemsNumber(prev => prev + 1)
      localStorage.setItem('itemsNumber', JSON.stringify(itemsNumber + 1))
      createObj(item)
      setOpenAddedToCard(true)
      ga.event({
        action: 'add_to_cart',
      })
    }
  }

  const removeOneUnit = article => {
    if (cartsItemsObj[article] === 1) {
      removeFromBusket(article)
    } else {
      setItemsNumber(itemsNumber - 1)
      localStorage.setItem('itemsNumber', JSON.stringify(itemsNumber - 1))
      cartsItemsObj[article] = cartsItemsObj[article] - 1
      setCartsItemsObj(cartsItemsObj)
      localStorage.setItem('cartsItemsObj', JSON.stringify(cartsItemsObj))
    }
  }

  const removeFromBusket = article => {
    setItemsNumber(itemsNumber - cartsItemsObj[article])
    localStorage.setItem(
      'itemsNumber',
      JSON.stringify(itemsNumber - cartsItemsObj[article])
    )
    delete cartsItemsObj[article]
    setCartsItemsObj(cartsItemsObj)
    localStorage.setItem('cartsItemsObj', JSON.stringify(cartsItemsObj))
    const objWithIdIndex = cartItems.findIndex(obj => obj.article === article)

    cartItems.splice(objWithIdIndex, 1)
    setCartItems(cartItems)
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }

  const novaPoshta = async city => {
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
        }
      )

      const body = await res.json()

      return body
    } catch (error) {
      alert('Помилка, спробуйте ще раз')
    }
  }

  const novaPoshtaDepartments = async city => {
    try {
      const data = {
        city1: city,
      }

      const res = await fetch(
        `https://api.edetal.store/novaposhtadepartments?city1=${encodeURIComponent(
          data.city1
        )}`,
        {
          method: 'GET',
        }
      )

      const body = await res.json()

      return body
    } catch (error) {
      alert('Помилка, спробуйте ще раз')
    }
  }

  const authUser = userAuth => {
    setUser(userAuth)
    sessionStorage.setItem('user', JSON.stringify(userAuth))
  }

  const updateUserDetails = (city, department) => {
    setUser(prev => ({ ...prev, npCity: city, npDepartment: department }))
  }

  const updateUserPhone = phone => {
    setUser(prev => ({ ...prev, phone: phone }))
  }

  const deleteCarFromGarage = () => {
    if (user) {
      setUser(prev => ({ ...prev, carInGarage: { brand: '', model: '' } }))
    }
    chooseCustomerModel({ carInGarage: { brand: '', model: '' } })
  }

  const selectingBrand = selected => {
    if (selected === 'Оберіть марку') {
      setModel(null)
      setBrandSearch(null)
      setCategory(null)
      setPart(null)
    } else {
      setBrandSearch(selected)
    }
  }

  const selectingModel = selected => {
    if (selected === 'Оберіть модель') {
      setModel(null)
      setCategory(null)
      setPart(null)
    } else {
      setModel(selected)
    }
  }

  const selectingCaregory = selected => {
    if (selected === 'Оберіть категорію') {
      setCategory(null)
      setPart(null)
    } else {
      setCategory(selected)
    }
  }

  const selectingPart = selected => {
    if (selected === 'Оберіть запчастину') {
      setPart(null)
    } else {
      setPart(selected)
    }
  }

  const contextValue = {
    cartItems,
    addToCart,
    itemsNumber,
    cartsItemsObj,
    removeOneUnit,
    openCard,
    setOpenCard,
    removeFromBusket,
    brand,
    setBrand,
    novaPoshta,
    novaPoshtaDepartments,
    setCartItems,
    setItemsNumber,
    setCartsItemsObj,
    openMenu,
    setOpenMenu,
    isMaximumItems,
    chooseCustomerModel,
    customerModel,
    authUser,
    user,
    setUser,
    openedUserMenu,
    setOpenUserMenu,
    updateUserDetails,
    updateUserPhone,
    deleteCarFromGarage,
    openAddedToCard,
    setOpenAddedToCard,
    selectingBrand,
    selectingModel,
    selectingCaregory,
    selectingPart,
    brandSearch,
    model,
    category,
    part,
    loading,
    setLoading,
    fromData,
    setFormData,
  }

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}
