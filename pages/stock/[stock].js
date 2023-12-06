import styles from '../../styles/NewItem.module.css'
import {
  returning,
  heart,
  box,
  newbasket,
  preorder,
  car,
  oeNumbers,
  help,
  arrowLeft,
  box2,
  arrowup,
  arrowDown,
  plusCircule,
  minus,
  gear,
} from '@/components/SVGs/SVGs'
import Compatibility from '@/components/compatability/compatabikity'
import Head from 'next/head'
import { useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '@/components/contex/contex'
import * as ga from '../../components/lib/gtag'
import { useRouter } from 'next/router'

const Item = ({ item, productDescription }) => {
  let array
  let array1
  let metateg
  let metateg2
  if (productDescription.details) {
    array = Object.values(productDescription?.details)
    array1 = Object.keys(productDescription?.details)
  }

  if (productDescription.fits.length > 0) {
    metateg = `Придбати за ${item.price} грн ${
      item.title
    } до ${productDescription.fits.map(
      brand => `${brand.models.map(model => `${brand.brand} ${model.model}`)}`
    )}.`

    metateg2 = `✅Підходить до : ${productDescription.fits.map(
      brand => `${brand.models.map(model => `${brand.brand} ${model.model}`)}`
    )}`
  } else {
    metateg = `✅Придбати за ${item.price} грн ${
      item.title
    }. Номери аналогів : ${productDescription.oe
      .slice(0, 10)
      .map(number => `${number.number}`)}.`

    metateg2 = metateg
  }

  const { addToCart, isMaximumItems } = useContext(ShopContext)
  const router = useRouter()
  const [end, setEnd] = useState(10)
  const [numerPerItem, setNumberPerItem] = useState(1)
  const [name, setName] = useState('')
  const [numberPhone, setNumberPhone] = useState('')
  const [vin, setVin] = useState('')
  const [openedDetailsMobile, setOpenedDetailsMobile] = useState(false)
  const [openedFitsMobile, setOpenedFitsMobile] = useState(false)
  const [openOE, setOpenOE] = useState(false)

  const title = `${item.brandName} ${item.article} ${item.title}`

  function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1)
  }

  const addingToCard = () => {
    let step = 0
    while (step < numerPerItem) {
      addToCart(item)
      step++
    }
  }

  const addNumberPerItem = number => {
    if (numerPerItem + number === 0) {
      return
    } else setNumberPerItem(prev => prev + number)
  }

  const check_compatability = e => {
    e.preventDefault()
    router.push(`/`)
    ga.event({
      action: 'generate_lead',
    })
    fetch(
      `https://api.telegram.org/bot6173056848:AAE0eviFsiQtx0CWxEJyBizEdl_zhaJ0P1w/sendMessage?chat_id=@edetalRequests&text=Запит на перевірку BayrakParts Stock! ${
        ' Вінкод : ' +
        vin +
        ' Артикул : ' +
        item.article +
        ' Клієнт ' +
        name +
        ' ' +
        numberPhone
      }`
    )
  }

  const goTopreviousPage = () => {
    router.back()
  }

  const linkToPage = `https://bayrakparts.com/stock/${item.article}`

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

  const finalDate = `${year}-${month}-${date}`

  return (
    <div className={styles.main_item}>
      <Head>
        <title>
          {title.slice(0, 55) + `... купити , ціна ${item.price} грн`}
        </title>
        <meta name="description" content={metateg} />
        <meta property="og:type" content="website"></meta>
        <meta
          property="og:title"
          content={title.slice(0, 55) + `... купити , ціна ${item.price} грн`}
        ></meta>
        <meta property="og:description" content={metateg2}></meta>
      </Head>

      <div className={styles.container_item_desctop} typeof="schema:Product">
        <div rel="schema:aggregateRating" className={styles.nodisplay}>
          <div typeof="schema:AggregateRating">
            <div property="schema:reviewCount" content="4"></div>
            <div property="schema:ratingValue" content="4.9">
              4,4
            </div>{' '}
            stars
          </div>
        </div>
        <div rel="schema:offers" className={styles.nodisplay}>
          <div typeof="schema:Offer">
            <div property="schema:price" content={item.price}></div>
            <div
              property="schema:availability"
              content="https://schema.org/InStock"
            ></div>
            <div property="schema:priceCurrency" content="UAH"></div>
            <div
              property="schema:priceValidUntil"
              datatype="xsd:date"
              content={finalDate}
            ></div>
            <div rel="schema:url" resource={linkToPage}></div>
            <div
              property="schema:itemCondition"
              content="https://schema.org/NewCondition"
            ></div>
          </div>
        </div>
        <div className={styles.container_image}>
          <span className={styles.brand_title}>{item.brandName}</span>
          <img
            rel="schema:image"
            resource={item.img}
            src={item.img}
            alt={item.title}
          />
        </div>
        <div className={styles.informaton_container}>
          <div
            className={styles.main_item_title}
            property="schema:name"
            content={item.title}
          >
            {title}
          </div>
          <div className={styles.main_item_atcile}>
            Артикул : {item.article}
          </div>
          {productDescription.details ? (
            <div className={styles.main_item_details}>
              <span>Характеристики:</span>
              <br />
              {array1.map((key, index) => (
                <span className={styles.item_detail_row}>
                  <>{capitalize(key)}</> : <>{array[index]}</>
                  <br />
                </span>
              ))}
            </div>
          ) : (
            <div className={styles.main_item_details}>
              <span>Характеристики:</span>
              <br />
              <span className={styles.item_detail_row}>
                <>Немає інформації</>
              </span>
            </div>
          )}

          <div className={styles.returning_cont}>
            {returning} 14 днів гарантованого повернення
          </div>
        </div>
        <div className={styles.purchaise_container}>
          <div className={styles.wishlist_and_stock}>
            <div className={styles.svg_and_title}>
              {heart} Додати до відстеження
            </div>
            {item.lvivStock === 0 && item.otherStock === '-' ? (
              <div className={styles.svg_and_title}>
                {preorder} Під замовлення
              </div>
            ) : (
              <div className={styles.svg_and_title}>{box} В наявності</div>
            )}
          </div>
          <div className={styles.price_container_with_disc}>
            {item.lvivStock === 1 ||
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
          <div className={styles.aviability_cont}>
            {isMaximumItems.active ? (
              <div className={styles.cart_full}>
                {isMaximumItems.aviability ? (
                  <>Доступно : {isMaximumItems.quantity} шт</>
                ) : (
                  <>Товар тільки під замовлення.</>
                )}
              </div>
            ) : (
              <>
                {item.lvivStock === 1 ||
                (item.lvivStock === '-' && item.otherStock === '1') ? (
                  <div className={styles.last_item_cont}>
                    <img
                      src="https://bayrakparts.com/media/hot-icon.svg"
                      alt="fire"
                    />
                    Остання шт на складі
                  </div>
                ) : (
                  <div className={styles.how_many_available}>
                    {+item.lvivStock > 0 ? item.lvivStock : item.otherStock} шт
                    доступно
                  </div>
                )}
              </>
            )}
          </div>
          <div className={styles.add_remove_items_container}>
            <button
              className={styles.add_remove_btn}
              onClick={() => addNumberPerItem(-1)}
            >
              -
            </button>
            <div className={styles.added_items}>{numerPerItem}</div>
            <button
              className={styles.add_remove_btn}
              onClick={() => addNumberPerItem(1)}
            >
              +
            </button>
          </div>
          <button className={styles.buy_btn} onClick={() => addingToCard()}>
            {newbasket}Купити
          </button>
        </div>
      </div>
      <div className={styles.container_item_desctop}>
        <div className={styles.cont_for_oem_and_compability}>
          <div className={styles.cont_for_oem_title}>
            {oeNumbers} <>Оригінальні номери</>
          </div>
          <div className={styles.cont_for_oem_numbers}>
            {productDescription.oe.slice(0, end).map(brand => (
              <div className={styles.number_and_brand}>
                <span>{brand.brand?.toUpperCase()}</span>
                <span>{brand.number?.toUpperCase()}</span>
              </div>
            ))}
            {productDescription.oe.length < 10 ? null : end >=
              productDescription.oe.length ? (
              <div className={styles.more_button} onClick={() => setEnd(10)}>
                Згорнути
              </div>
            ) : (
              <div
                className={styles.more_button}
                onClick={() => setEnd(prev => prev + 10)}
              >
                Ще...
              </div>
            )}
          </div>
        </div>
        <div className={styles.cont_for_oem_and_compability}>
          <div className={styles.cont_for_oem_title}>
            {car}Підходить до таких авто
          </div>
          {productDescription.fits.length === 0 ? (
            <div className={styles.non_info}>Немає інформації</div>
          ) : (
            <Compatibility fits={productDescription.fits} />
          )}
        </div>
      </div>
      <div className={styles.container_item_desctop}>
        <div className={styles.container_for_question}>
          <div className={styles.cont_for_oem_title}>
            {help}Безкоштовно перевіримо чи підійде {item.brandName}{' '}
            {item.article} до Вашого авто
          </div>
          <form
            className={styles.request_form_cont}
            onSubmit={e => check_compatability(e)}
          >
            <div className={styles.description_request}>
              1. Для перевірки потрібно лише вінкод та Ваші контактні дані
              <br />
              <div className={styles.description_question}>
                Якщо у Вас є запитання про продукт або потребуєте більш
                детальної інформації, залиште свої побажання у полі нижче та ми
                з радістю надамо усю необхідну інформацію.
              </div>
            </div>
            <div className={styles.row_for_name_numberphone}>
              <input
                className={styles.input_name_phone}
                placeholder="Ім'я *"
                required
                minLength={4}
                onChange={e => setName(e.target.value)}
              />
              <input
                className={styles.input_name_phone}
                placeholder="Телефон *"
                required
                minLength={10}
                onChange={e => setNumberPhone(e.target.value)}
              />
            </div>
            <div className={styles.description_request}>
              2. Вінкод знаходиться у свідоцтві про реєстрацію або у додатку
              'ДІЯ'
            </div>
            <input
              className={styles.input_vin}
              placeholder="VIN *"
              required
              minLength={17}
              onChange={e => setVin(e.target.value)}
            />
            <textarea
              className={styles.input_question}
              type="text"
              placeholder="Ваше запитання до наших спеціалістів"
            />
            <button className={styles.submit_button} type="submit">
              Надіслати запит
            </button>
          </form>
        </div>
      </div>
      <div className={styles.container_item_mobile} typeof="schema:Product">
        <div rel="schema:aggregateRating" className={styles.nodisplay}>
          <div typeof="schema:AggregateRating">
            <div property="schema:reviewCount" content="4"></div>
            <div property="schema:ratingValue" content="4.9">
              4,4
            </div>{' '}
            stars
          </div>
        </div>
        <div rel="schema:offers" className={styles.nodisplay}>
          <div typeof="schema:Offer">
            <div property="schema:price" content={item.price}></div>
            <div
              property="schema:availability"
              content="https://schema.org/InStock"
            ></div>
            <div property="schema:priceCurrency" content="UAH"></div>
            <div
              property="schema:priceValidUntil"
              datatype="xsd:date"
              content={finalDate}
            ></div>
            <div rel="schema:url" resource={linkToPage}></div>
            <div
              property="schema:itemCondition"
              content="https://schema.org/NewCondition"
            ></div>
          </div>
        </div>
        <div className={styles.go_back_cont} onClick={() => goTopreviousPage()}>
          {arrowLeft}
        </div>
        <h1
          className={styles.top_info_mobile}
          property="schema:name"
          content={item.title}
        >
          {title}
        </h1>
        <div className={styles.article_mobile}>Артикул : {item.article}</div>
        <img
          className={styles.image_mobile}
          src={item.img}
          alt={item.title}
          rel="schema:image"
          resource={item.img}
        />
        <div className={styles.price_info_cont}>
          <div className={styles.stock_info_cont}>
            {isMaximumItems.active ? (
              <div className={styles.cart_full}>
                {isMaximumItems.aviability ? (
                  <>Доступно на складі {isMaximumItems.quantity} шт</>
                ) : (
                  <>Товар під замовлення</>
                )}
              </div>
            ) : item.lvivStock === 1 ||
              (item.lvivStock === '-' && item.otherStock === '1') ? (
              <div className={styles.last_item_cont}>
                <img
                  src="https://bayrakparts.com/media/hot-icon.svg"
                  alt="fire"
                />
                Остання шт на складі
              </div>
            ) : (
              <div className={styles.how_many_available}>
                {+item.lvivStock > 0 ? item.lvivStock : item.otherStock} шт
                доступно
              </div>
            )}
            {item.lvivStock === 0 && item.otherStock === '-' ? (
              <div className={styles.out_stock_info}>
                {preorder} Під замовлення
              </div>
            ) : (
              <div className={styles.in_stock_info}>{box2} В наявності</div>
            )}
          </div>
          <div className={styles.price_container_with_disc}>
            {item.lvivStock === 1 ||
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
        <div className={styles.buttons_container}>
          <div className={styles.add_remove_btns_container}>
            {numerPerItem}
            <div className={styles.add_remove_btns}>
              <button onClick={() => addNumberPerItem(1)}>{arrowup}</button>
              <button onClick={() => addNumberPerItem(-1)}>{arrowDown}</button>
            </div>
          </div>
          <button
            className={styles.buy_button_mobile}
            onClick={() => addingToCard()}
          >
            {newbasket}Купити
          </button>
        </div>
        <div className={styles.return_container}>
          14 днів гарантованого повернення
          <div className={styles.returning_mobile}>{returning}</div>
        </div>
        <div className={styles.detail_cont_mobile}>
          <div
            className={styles.detal_title_mobile}
            onClick={() => setOpenedDetailsMobile(prev => !prev)}
          >
            <div className={styles.icon_and_name}>{gear}Деталі</div>
            <div className={styles.center}>
              {!openedDetailsMobile ? plusCircule : minus}
            </div>
          </div>
          {openedDetailsMobile ? (
            <div className={styles.info_container}>
              {productDescription.details ? (
                <>
                  {array1.map((key, index) => (
                    <span className={styles.item_detail_row}>
                      <span className={styles.detail_key}>
                        {capitalize(key)}:
                      </span>{' '}
                      <span className={styles.detail_value}>
                        {array[index]}
                      </span>
                      <br />
                    </span>
                  ))}
                </>
              ) : (
                <span className={styles.item_detail_row}>
                  <>Немає інформації</>
                </span>
              )}
            </div>
          ) : null}
        </div>
        <div className={styles.detail_cont_mobile}>
          <div
            className={styles.detal_title_mobile}
            onClick={() => setOpenedFitsMobile(prev => !prev)}
          >
            {' '}
            <div className={styles.icon_and_name}>
              {car}Підходить до таких авто
            </div>
            <div className={styles.center}>
              {!openedFitsMobile ? plusCircule : minus}
            </div>
          </div>
          {openedFitsMobile ? (
            <div className={styles.info_container}>
              {productDescription.fits.length === 0 ? (
                <div className={styles.non_info}>Немає інформації</div>
              ) : (
                <Compatibility fits={productDescription.fits} />
              )}
            </div>
          ) : null}
        </div>
        <div className={styles.detail_cont_mobile}>
          <div
            className={styles.detal_title_mobile}
            onClick={() => setOpenOE(prev => !prev)}
          >
            <div className={styles.icon_and_name}>
              {oeNumbers}Оригінальні номери
            </div>
            <div className={styles.center}>{!openOE ? plusCircule : minus}</div>
          </div>
          {openOE ? (
            <div className={styles.info_container}>
              {productDescription.oe.slice(0, end).map(brand => (
                <div className={styles.number_and_brand}>
                  <span>{brand.brand.toUpperCase()}</span>
                  <span>{brand.number.toUpperCase()}</span>
                </div>
              ))}
              {productDescription.oe.length < 10 ? null : end >=
                productDescription.oe.length ? (
                <div className={styles.more_button} onClick={() => setEnd(10)}>
                  Згорнути
                </div>
              ) : (
                <div
                  className={styles.more_button}
                  onClick={() => setEnd(prev => prev + 10)}
                >
                  Ще...
                </div>
              )}
            </div>
          ) : null}
        </div>
        <div className={styles.detail_cont_mobile}>
          <div className={styles.detal_title_mobile}>
            <div className={styles.icon_and_name}>
              {help}Безкоштовно перевіримо
            </div>
          </div>
          <form
            className={styles.request_form_cont}
            onSubmit={e => check_compatability(e)}
          >
            <span>
              Залиште вінкод Вашого авто, та ми безкоштовно перевіримо чи
              підійде дана запчастина до нього
            </span>
            <input
              className={styles.input_name_phone}
              placeholder="Ім'я *"
              required
              minLength={4}
              onChange={e => setName(e.target.value)}
            />
            <input
              className={styles.input_name_phone}
              placeholder="Телефон *"
              required
              minLength={10}
              onChange={e => setNumberPhone(e.target.value)}
            />
            <input
              className={styles.input_vin_mobile}
              placeholder="VIN *"
              required
              minLength={17}
              onChange={e => setVin(e.target.value)}
            />
            <button className={styles.submit_button_mobile} type="submit">
              Надіслати запит
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {
  const article = params.stock
  const res = await fetch(`https://api.edetal.store/findProduct/${article}`, {
    method: 'GET',
  })

  const body = await res.json()

  if (!body) {
    return null
  }

  const item = {
    title: body.name,
    price: Math.ceil(body.price * 1.15),
    img: body.image,
    article: body.article,
    brandName: body.brand,
    lvivStock: body.amount,
    otherStock: '-',
  }

  let fit = body.fit

  if (!fit) {
    fit = []
  }

  const productDescription = {
    fits: fit,
    details: null,
    oe: [{ brand: item.brandName, number: item.article }],
  }

  return {
    props: {
      item,
      productDescription,
    },
  }
}

export default Item
