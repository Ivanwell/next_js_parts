import styles from '../../styles/NewSearch.module.css'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import Pagination from '../pagination_in_search/pagination'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { adddToCart } from '@/global_state/features/cart_redux'
import { useUserAgent } from 'next-useragent'
import { showFullImage } from '@/global_state/features/cart_redux'
import {
  heart,
  box2,
  preorder,
  newbasket,
  arrowLeft,
  arrowup,
  arrowDown,
} from '../SVGs/SVGs'

const NoSearchResult = () => {
  return (
    <div className={styles.nosearch_container}>
      <div className={styles.no_search_result}>
        <div className={styles.img_container}>
          <img src="https://backend.bayrakparts.com/images/media/pngegg.png" />
        </div>
        <div className={styles.no_res_description}>
          <span>Упс... система не знайшла потрібної запчастини</span>
          <span>
            Проте Ви можете залишити заявку і ми пошукаємо запчастину вручну
          </span>
          <Link href="/leave_request">Залишити заявку</Link>
        </div>
      </div>
    </div>
  )
}

const SearchedItem = ({ product }) => {
  const [numberPerItem, setNumberPerItem] = useState(1)

  const dispatch = useDispatch()
  const router = useRouter()

  const filteredPrice = product.supliers.filter(
    item => +item.amount > 0 || item.amount === '> 10'
  )

  let price

  if (filteredPrice.length === 0) {
    price = product.supliers.reduce((acc, loc) =>
      +acc.price < +loc.price ? acc : loc
    )
  } else {
    price = filteredPrice.reduce((acc, loc) =>
      +acc.price < +loc.price ? acc : loc
    )
  }

  let thumbImage
  if (product.image === '-' || product.image === null) {
    product.image =
      'https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
    thumbImage =
      'https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
  } else if (product.image.includes('https://cdn.bm.parts/')) {
    thumbImage =
      product.image.slice(0, 26) + 's/320x320/' + product.image.slice(26)
  } else {
    thumbImage = product.image
  }

  const item = {
    title: product.title,
    price: price.price,
    img: thumbImage,
    article: product.article,
    brandName: product.brand,
    lvivStock: price.amount,
    lastUpdate: price.lastDate,
    otherStock: '-',
  }

  const adddingToCard = item => {
    const newItem = { ...item, quantity: numberPerItem }
    dispatch(adddToCart(newItem))
  }

  let link = `/product/${product.link[0]?.link}`

  if (router.query.brand && router.query.model && router.query.engine) {
    link = `/product/${product.link[0]?.link}?brand=${router.query.brand}&model=${router.query.model}&engine=${router.query.engine}`
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
      <div className={styles.img_cont}>
        <div className={styles.brand_up_photo}>{item.brandName}</div>
        <img
          src={item.img}
          onClick={() => dispatch(showFullImage(product.image))}
          alt={item.title}
          loading="lazy"
        />
      </div>
      <div className={styles.main_info_product}>
        <Link className={styles.top_name_item} href={link}>
          {title}
        </Link>
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
        {item.lvivStock == 0 && item.otherStock === '-' ? (
          <div className={styles.aviability_cont_out}>
            {preorder} Під замовлення
          </div>
        ) : (
          <div className={styles.aviability_cont}>{box2} В наявності</div>
        )}
        {item.lvivStock === '1' ||
        (item.lvivStock === '-' && item.otherStock === '1') ? (
          <div className={styles.last_item_cont}>
            <img src="https://backend.bayrakparts.com/images/media/hot-icon.svg" />
            Остання шт на складі
          </div>
        ) : item.lvivStock == 0 ? (
          <div className={styles.how_many_available}>На складі 0 шт</div>
        ) : (
          <div className={styles.how_many_available}>
            {+item.lvivStock > 0 || item.lvivStock === '> 10'
              ? item.lvivStock
              : item.otherStock}{' '}
            шт доступно
          </div>
        )}
        <div className={styles.add_min_btn_cont}>
          <button onClick={() => addNumberPerItem(-1)}>-</button>
          <div>{numberPerItem}</div>
          <button onClick={() => addNumberPerItem(1)}>+</button>
        </div>
        {item.lvivStock == 0 && item.otherStock === '-' ? (
          <button disabled className={styles.ckeck_aviability}>
            Немає в наявності
          </button>
        ) : (
          <button
            className={styles.byu_btn_search}
            onClick={() => adddingToCard(item)}
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
  const dispatch = useDispatch()

  // const filteredPrice = product.supliers.filter(
  //   item => +item.amount > 0 || item.amount === '> 10'
  // )
  // const price = filteredPrice.reduce((acc, loc) =>
  //   +acc.price < +loc.price ? acc : loc
  // )

  const filteredPrice = product.supliers.filter(
    item => +item.amount > 0 || item.amount === '> 10'
  )

  let price

  if (filteredPrice.length === 0) {
    price = product.supliers.reduce((acc, loc) =>
      +acc.price < +loc.price ? acc : loc
    )
  } else {
    price = filteredPrice.reduce((acc, loc) =>
      +acc.price < +loc.price ? acc : loc
    )
  }

  // let thumbImage
  // if (product.image === '-' || product.image === null) {
  //   product.image =
  //     'https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
  //   thumbImage =
  //     'https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
  // } else {
  //   thumbImage =
  //     product.image.slice(0, 26) + 's/320x320/' + product.image.slice(26)
  // }

  let thumbImage
  if (product.image === '-' || product.image === null) {
    product.image =
      'https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
    thumbImage =
      'https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
  } else if (product.image.includes('https://cdn.bm.parts/')) {
    thumbImage =
      product.image.slice(0, 26) + 's/320x320/' + product.image.slice(26)
  } else {
    thumbImage = product.image
  }

  const item = {
    title: product.title,
    price: price.price,
    img: thumbImage,
    article: product.article,
    brandName: product.brand,
    lvivStock: price.amount,
    lastUpdate: price.lastDate,
    otherStock: '-',
  }

  const adddingToCard = item => {
    const newItem = { ...item, quantity: numberPerItem }
    dispatch(adddToCart(newItem))
  }

  const link = `/product/${product.link[0]?.link}`

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
          <div className={styles.main_img_container}>
            <img
              src={item.img}
              onClick={() => dispatch(showFullImage(product.image))}
              alt={item.title}
              loading="lazy"
            />
          </div>
          <Link className={styles.main_info} href={link}>
            {title}{' '}
            {item.lvivStock == 0 && item.otherStock === '-' ? (
              <div className={styles.aviability_cont_out}>
                {preorder} Під замовлення
              </div>
            ) : (
              <div className={styles.aviability_cont}>{box2} В наявності</div>
            )}
            {item.lvivStock === '1' ||
            (item.lvivStock === '-' && item.otherStock === '1') ? (
              <div className={styles.last_item_cont}>
                <img src="https://backend.bayrakparts.com/images/media/hot-icon.svg" />
                Остання шт на складі
              </div>
            ) : item.lvivStock == 0 ? null : (
              <div className={styles.how_many_available}>
                {+item.lvivStock > 0 || item.lvivStock === '> 10'
                  ? item.lvivStock
                  : item.otherStock}{' '}
                шт доступно
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
          </Link>
        </div>
        <div className={styles.buttons_cont}>
          <Link href={link} className={styles.detail_button}>
            Деталі
          </Link>
          <div className={styles.add_remove_btns_container}>
            {numberPerItem}
            <div className={styles.add_remove_btns}>
              <button onClick={() => addNumberPerItem(1)}>{arrowup}</button>
              <button onClick={() => addNumberPerItem(-1)}>{arrowDown}</button>
            </div>
          </div>
          {item.lvivStock == 0 ? (
            <button className={styles.byu_btn_mobile_dis}>
              Немає в наявності
            </button>
          ) : (
            <button
              className={styles.byu_btn_mobile}
              onClick={() => adddingToCard(item)}
            >
              {newbasket}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const NewSearchByCategory = ({
  productData,
  userAgent,
  amount,
  brand,
  model,
  engine,
  finalTitle,
}) => {
  let ua

  if (userAgent.uaString) {
    ua = useUserAgent(userAgent.uaString)
  } else {
    ua = useUserAgent(window.navigator.userAgent)
  }

  // let title = `Знайдено ${amount} шт`

  // if (brand && model && engine) {
  //   title = `Знайдено ${amount} шт для ${brand} ${model} ${engine}`
  // }

  return (
    <div className={styles.whole_search_container}>
      <div className={styles.search_container}>
        {!ua.isMobile ? (
          <div className={styles.search_result_cont}>
            {productData.length > 0 ? <h1>{finalTitle}</h1> : null}
            <div className={styles.search_results}>
              {productData.length > 0 ? (
                productData.map(product => <SearchedItem product={product} />)
              ) : (
                <NoSearchResult />
              )}
            </div>
            <Pagination amount={amount} />
          </div>
        ) : null}
        {ua.isMobile ? (
          <div className={styles.search_result_cont_mobile}>
            <div className={styles.search_results_mobile}>
              {productData.length > 0 ? (
                <h1>{finalTitle}</h1>
              ) : (
                <h1>Не знайдено</h1>
              )}
              {productData.length > 0 ? (
                productData.map(product => (
                  <SearchedItemMobile product={product} />
                ))
              ) : (
                <NoSearchResult />
              )}
            </div>
            <Pagination amount={amount} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default NewSearchByCategory
