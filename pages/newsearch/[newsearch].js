import { useState } from 'react'
import styles from '../../styles/NewSearch.module.css'
import {
  search,
  heart,
  box2,
  preorder,
  newbasket,
  arrowLeft,
  arrowup,
  arrowDown,
} from '@/components/SVGs/SVGs'
import { useContext } from 'react'
import { ShopContext } from '@/components/contex/contex'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

const SearchedItem = ({ product }) => {
  const [numberPerItem, setNumberPerItem] = useState(1)
  const { addToCart } = useContext(ShopContext)

  const router = useRouter()

  const goToItem = item_article => {
    router.push(`/newitem/${item_article}`)
  }

  let img =
    'https://cdn.bm.parts/photos/' +
    product.default_image.slice(5).replace(/[&\/\\]/g, '/')

  const item = {
    title: product.name,
    price: Math.ceil(product.price * 1.15),
    img: img,
    article: product.article,
    brandName: product.brand,
    lvivStock: product.in_stocks[0].quantity,
    otherStock: product.in_others.quantity,
  }

  const addingToCard = () => {
    let step = 0
    while (step < numberPerItem) {
      addToCart(item)
      step++
    }
  }

  const addNumberPerItem = number => {
    if (numberPerItem + number === 0) {
      return
    } else setNumberPerItem(prev => prev + number)
  }

  const title = `${item.brandName} ${item.article.replace(/[&\/\\ ]/g, '')} ${
    item.title
  }`

  return (
    <div className={styles.searched_item}>
      <div className={styles.img_cont} onClick={() => goToItem(item.article)}>
        <div className={styles.brand_up_photo}>{item.brandName}</div>
        <img src={img} />
      </div>
      <div className={styles.main_info_product}>
        <div
          className={styles.top_name_item}
          onClick={() => goToItem(item.article)}
        >
          {title}
        </div>
        <div className={styles.artilce}>Артикул: {item.article}</div>
        <div className={styles.title_prod_info}>Інформація про продукт:</div>
        <div className={styles.prod_info}>
          <span>Номер запчастини:</span>
          <span>{item.article}</span>
        </div>
        <div className={styles.prod_info}>
          <span>Виробник:</span>
          <span>{item.brandName}</span>
        </div>
        <div className={styles.prod_info}>
          <span>Наша ціна:</span>
          <span>{item.price} UAH</span>
        </div>
        <div className={styles.prod_info}>
          <span>Стан:</span>
          <span>Новий</span>
        </div>
      </div>
      <div className={styles.purchaise_info}>
        <div className={styles.add_to_wish_list}>
          {heart} Додати до відстеження
        </div>
        <div className={styles.price_container}>
          {item.lvivStock === '1' ||
          (item.lvivStock === '-' && item.otherStock === '1') ? (
            <div className={styles.old_price_and_disc_cont}>
              <div className={styles.old_price}>
                {Math.ceil(item.price * 1.25)} UAH
              </div>
              <div className={styles.disc_container}>-20%</div>
            </div>
          ) : null}
          <div className={styles.real_price}>{item.price},00 UAH</div>
          <span className={styles.deliver_cost}> + Вартість доставки</span>
        </div>
        {item.lvivStock === '-' && item.otherStock === '-' ? (
          <div className={styles.aviability_cont_out}>
            {preorder} Під замовлення
          </div>
        ) : (
          <div className={styles.aviability_cont}>{box2} В наявності</div>
        )}
        {item.lvivStock === '1' ||
        (item.lvivStock === '-' && item.otherStock === '1') ? (
          <div className={styles.last_item_cont}>
            <img src="https://bayrakparts.com/media/hot-icon.svg" />
            Остання шт на складі
          </div>
        ) : (
          <div className={styles.how_many_available}>
            {+item.lvivStock > 0 ? item.lvivStock : item.otherStock} шт доступно
          </div>
        )}
        <div className={styles.add_min_btn_cont}>
          <button onClick={() => addNumberPerItem(-1)}>-</button>
          <div>{numberPerItem}</div>
          <button onClick={() => addNumberPerItem(1)}>+</button>
        </div>
        {item.lvivStock === '-' && item.otherStock === '-' ? (
          <button className={styles.ckeck_aviability}>
            Уточнити наявність
          </button>
        ) : (
          <button
            className={styles.byu_btn_search}
            onClick={() => addingToCard()}
          >
            {newbasket}Купити
          </button>
        )}
      </div>
    </div>
  )
}

const SearchedItemMobile = ({ product }) => {
  const [numberPerItem, setNumberPerItem] = useState(1)
  const { addToCart } = useContext(ShopContext)
  const router = useRouter()

  const goToItem = item_article => {
    router.push(`/newitem/${item_article}`)
  }

  let img =
    'https://cdn.bm.parts/photos/' +
    product.default_image.slice(5).replace(/[&\/\\]/g, '/')

  const item = {
    title: product.name,
    price: Math.ceil(product.price * 1.15),
    img: img,
    article: product.article,
    brandName: product.brand,
    lvivStock: product.in_stocks[0].quantity,
    otherStock: product.in_others.quantity,
  }

  const addingToCard = () => {
    let step = 0
    while (step < numberPerItem) {
      addToCart(item)
      step++
    }
  }

  const addNumberPerItem = number => {
    if (numberPerItem + number === 0) {
      return
    } else setNumberPerItem(prev => prev + number)
  }

  const title = `${item.brandName} ${item.article.replace(/[&\/\\ ]/g, '')} ${
    item.title
  }`

  return (
    <div className={styles.separate_item_cont}>
      <div className={styles.top_item}>
        {item.brandName}
        <div className={styles.add_wishlist}>{heart} відстежувати</div>
      </div>
      <div className={styles.main_container_info_mobile}>
        <div className={styles.cont_for_img_and_info}>
          <div
            className={styles.main_img_container}
            onClick={() => goToItem(item.article)}
          >
            <img src={img} />
          </div>
          <div
            className={styles.main_info}
            onClick={() => goToItem(item.article)}
          >
            {title}{' '}
            {item.lvivStock === '-' && item.otherStock === '-' ? (
              <div className={styles.aviability_cont_out}>
                {preorder} Під замовлення
              </div>
            ) : (
              <div className={styles.aviability_cont}>{box2} В наявності</div>
            )}
            {item.lvivStock === '1' ||
            (item.lvivStock === '-' && item.otherStock === '1') ? (
              <div className={styles.last_item_cont}>
                <img src="https://bayrakparts.com/media/hot-icon.svg" />
                Остання шт на складі
              </div>
            ) : (
              <div className={styles.how_many_available}>
                {+item.lvivStock > 0 ? item.lvivStock : item.otherStock} шт
                доступно
              </div>
            )}
            <div className={styles.price_container}>
              {item.lvivStock === '1' ||
              (item.lvivStock === '-' && item.otherStock === '1') ? (
                <div className={styles.old_price_and_disc_cont}>
                  <div className={styles.old_price}>
                    {Math.ceil(item.price * 1.25)} UAH
                  </div>
                  <div className={styles.disc_container}>-20%</div>
                </div>
              ) : null}
              <div className={styles.real_price}>{item.price},00 UAH</div>
              <span className={styles.deliver_cost}> + Вартість доставки</span>
            </div>
          </div>
        </div>
        <div className={styles.buttons_cont}>
          <button className={styles.detail_button}>Деталі</button>
          <div className={styles.add_remove_btns_container}>
            {numberPerItem}
            <div className={styles.add_remove_btns}>
              <button onClick={() => addNumberPerItem(1)}>{arrowup}</button>
              <button onClick={() => addNumberPerItem(-1)}>{arrowDown}</button>
            </div>
          </div>
          <button
            className={styles.byu_btn_mobile}
            onClick={() => addingToCard()}
          >
            {newbasket}
          </button>
        </div>
      </div>
    </div>
  )
}

const NewSearch = ({ productData }) => {
  console.log(productData)
  const {
    selectingBrand,
    selectingModel,
    selectingCaregory,
    selectingPart,
    fromData,
    brandSearch,
    model,
    category,
    part,
    loading,
  } = useContext(ShopContext)
  const [errorForm, setErrorForm] = useState(false)
  const router = useRouter()
  const title = router.query.newsearch
  const submitingSearch = e => {
    e.preventDefault()
    if (!brandSearch || !model || !category || !part) {
      setErrorForm(true)
    } else {
      setErrorForm(false)
      const article = part + ' ' + brandSearch + ' ' + model
      router.push(`/newsearch/${article}`)
    }
  }
  return (
    <div className={styles.whole_search_container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Head>
      <div className={styles.search_container}>
        <div className={styles.search_model_cont}>
          <form
            className={styles.search_form}
            onSubmit={e => submitingSearch(e)}
          >
            <div className={styles.container_search_form}>
              <div className={styles.select_car_title}>
                {search}Виберіть Ваше авто для пошуку запчастин
              </div>
              <div className={styles.select_container}>
                <span className={styles.number}>1</span>
                <select
                  value={brandSearch}
                  onChange={e => selectingBrand(e.target.value)}
                >
                  {!loading ? (
                    <option selected>Оберіть марку</option>
                  ) : (
                    <option selected>Завантаження...</option>
                  )}
                  {fromData
                    ? fromData.brands.map(brand => <option>{brand}</option>)
                    : null}
                </select>
              </div>
              <div className={styles.select_container}>
                <span className={styles.number}>2</span>
                <select
                  value={model}
                  onChange={e => selectingModel(e.target.value)}
                >
                  {!loading ? (
                    <option selected>Оберіть модель</option>
                  ) : (
                    <option selected>Завантаження...</option>
                  )}
                  {brandSearch
                    ? fromData.models
                        .find(product => product.brandName === brandSearch)
                        .Models.map(model1 => (
                          <option value={model1}>{model1}</option>
                        ))
                    : null}
                </select>
              </div>
              <div className={styles.select_container}>
                <span className={styles.number}>3</span>
                <select
                  value={category}
                  onChange={e => selectingCaregory(e.target.value)}
                >
                  {!loading ? (
                    <option selected>Оберіть категорію</option>
                  ) : (
                    <option selected>Завантаження...</option>
                  )}
                  {model
                    ? fromData.categories.map(categori => (
                        <option value={categori}>{categori}</option>
                      ))
                    : null}
                </select>
              </div>
              <div className={styles.select_container}>
                <span className={styles.number}>4</span>
                <select
                  onChange={e => selectingPart(e.target.value)}
                  value={part}
                >
                  {!loading ? (
                    <option selected>Оберіть запчастину</option>
                  ) : (
                    <option selected>Завантаження...</option>
                  )}
                  {category
                    ? fromData.exactParts
                        .find(castogory => castogory.catigory === category)
                        .Models.map(part => (
                          <option value={part}>{part}</option>
                        ))
                    : null}
                </select>
              </div>
              <button type="submit" className={styles.search_button}>
                Пошук
              </button>
            </div>
            {errorForm ? (
              <div className={styles.error_form}>Заповніть усі дані</div>
            ) : null}
            <Link href="/leave_request" className={styles.cannot_find_part}>
              <span className={styles.cannot_find_part_title}>
                Не вдається знайти запчастину? Ми допоможемо!
              </span>
            </Link>
          </form>
        </div>
        <div className={styles.search_result_cont}>
          <h1>{title}</h1>
          {productData ? (
            <div className={styles.search_results}>
              {productData.map(product => (
                <SearchedItem product={product} />
              ))}
            </div>
          ) : (
            <h2>Немає</h2>
          )}
        </div>
        <div className={styles.search_result_cont_mobile}>
          <div className={styles.go_back_cont}>{arrowLeft}</div>
          <div className={styles.search_results_mobile}>
            <h1>{title}</h1>
            {productData.map(product => (
              <SearchedItemMobile product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {
  const data = {
    article1: params.newsearch,
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

  return {
    props: {
      productData: array,
    },
  }
}

export default NewSearch
