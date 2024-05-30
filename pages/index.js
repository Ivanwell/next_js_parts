import styles from '@/styles/Newmainoage.module.css'
import { useEffect, useState } from 'react'
import CategoryInMain from '@/components/category_in_main/category_in_main'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import {
  droplet,
  discbrake,
  fireIgn,
  hodovaa,
  remni,
  accecories,
  electric,
  tiress,
  kuzov,
  plusCircule,
  minus,
} from '@/components/SVGs/SVGs'
import { useDispatch } from 'react-redux'
import { changeLinkPath } from '@/global_state/features/cardata_redux'
import Review from '@/components/review/review'
import Script from 'next/script'

const NewMainPage = ({ running }) => {
  console.log(running)
  const router = useRouter()
  const [opened, setOpened] = useState({
    first: false,
    second: false,
    third: false,
    forth: false,
    fifth: false,
    sixth: false,
  })
  const [reviews, setReviews] = useState([])
  const [pageReview, setPageReview] = useState(1)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeLinkPath(null))
    const abortController = new AbortController()
    const { signal } = abortController
    const getReviews = async () => {
      try {
        const res = await fetch(
          `https://api.bayrakparts.com/api/info/get_reviews?step=${pageReview}`,
          {
            method: 'GET',
            signal: signal,
          }
        )

        const body = await res.json()
        setReviews(body)
      } catch (error) {
        if (!signal?.aborted) {
        }
      }
    }
    getReviews()

    return () => {
      abortController.abort()
    }
  }, [pageReview])

  let titleMeta = 'BayrakParts || Запчастини для авто з гарантією'
  if (router.query.brand && router.query.model && router.query.engine) {
    titleMeta = `Запчастини до ${router.query.brand} ${router.query.model} ${router.query.engine} - BayrakParts`
  }
  return (
    <div className={styles.main_container}>
      <Head>
        <title>{titleMeta}</title>
        <meta
          name="description"
          content="Купити запчастини дешево з гарантією Львів Hyundai/KIA, Хюндай , Toyota/Lexus, Тойота/Лексус, Nissan, Ніссан, Mazda, Мазда, Honda, Хонда, Subaru, Субару, BMW, БМВ,  Volkswagen, Фольксваген. "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f37c2e"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'Organization',
            name: 'BayrakParts',
            telephone: '+380937289485',
            url: 'https://bayrakparts.com',
            description: 'Якісні автозапчастини з уього світу',
          }),
        }}
      />

      <div className={styles.container_for_brands}>
        <h1>Автозапчастини до Вашого авто</h1>
        <CategoryInMain />
        <div className={styles.categories_in_mobile_only}>
          <h2>Інші категорії</h2>
          <div className={styles.category_link_cont}>
            <Link
              className={styles.category_link}
              href="/categories/olyva-zmazka--i-tehnichni"
            >
              {droplet}
              Оливи та рідини
            </Link>
            <Link
              href="/categories/galmivna-systema"
              className={styles.category_link}
            >
              {discbrake}Гальмівна система
            </Link>

            <Link
              href="/categories/systema-zapalyuvannya-rozzharyuvannya"
              className={styles.category_link}
            >
              {fireIgn}Запалення/розжарювання
            </Link>

            <Link
              href="/categories/obigriv-kondytsioner"
              className={styles.category_link}
            >
              {hodovaa}Опалення/кондиціонування
            </Link>

            <Link
              href="/categories/rulova-systema"
              className={styles.category_link}
            >
              {remni}Рульова система
            </Link>

            <Link href="/categories/elektryka" className={styles.category_link}>
              {accecories}Електрика
            </Link>

            <Link
              href="/categories/systema-vypusku-vpusku-povitrya"
              className={styles.category_link}
            >
              {electric}Впуск/випуск
            </Link>

            <Link
              href="/categories/systemy-pidgotovky-podachi-palyva"
              className={styles.category_link}
            >
              {tiress}Подача палива
            </Link>

            <Link
              href="/categories/aksesuary-zasoby-po-doglyadu-dod.tovary"
              className={styles.category_link}
            >
              {kuzov}
              Аксесуари
            </Link>
          </div>
        </div>

        <h2 className={styles.why_we}>Питання - відповідь</h2>
        <div className={styles.new_container_for_question}>
          <div className={styles.cont_for_col_questions}>
            <div
              className={styles.cont_for_question}
              onClick={() =>
                setOpened(prev => ({ ...prev, first: !prev.first }))
              }
            >
              До яких марок авто у Вас є запчастини?{' '}
              {opened.first ? minus : plusCircule}
            </div>
            {opened.first ? (
              <div className={styles.answer_cont}>
                Ми продаємо запчастини до таких марок: Hyundai, Kia, Toyota,
                Lexus, Mazda, Nissan, Opel, Volkswagen, Ford, BMW, Honda,
                General Motors
              </div>
            ) : null}
            <div
              className={styles.cont_for_question}
              onClick={() =>
                setOpened(prev => ({ ...prev, second: !prev.second }))
              }
            >
              Чи можна купити у Вас масло та фільтри?
              {opened.second ? minus : plusCircule}
            </div>
            {opened.second ? (
              <div className={styles.answer_cont}>
                Так звичайно, у нас представлений великий вибір мастил різних
                в'язкостей та допусків, а також комплекти фільтрів на будь-яке
                авто.
              </div>
            ) : null}
            <div
              className={styles.cont_for_question}
              onClick={() =>
                setOpened(prev => ({ ...prev, third: !prev.third }))
              }
            >
              В мене список запчастин від майстра, можете допомогти?{' '}
              {opened.third ? minus : plusCircule}
            </div>
            {opened.third ? (
              <div className={styles.answer_cont}>
                З радістю! Відправте нам список та вінкод Вашого авто, ми
                підберемо потрібні запчастини та запропонуємо Вам різні
                варіанти.
              </div>
            ) : null}
          </div>
          <div className={styles.cont_for_col_questions}>
            <div
              className={styles.cont_for_question}
              onClick={() =>
                setOpened(prev => ({ ...prev, forth: !prev.forth }))
              }
            >
              А що якщо запчастина не підійде, у Вас є повернення?{' '}
              {opened.forth ? minus : plusCircule}
            </div>
            {opened.forth ? (
              <div className={styles.answer_cont}>
                Звичайно! Єдине прохання щоб на запчастині не було слідів
                монтажу. Якщо помилка в підборі з нашого боку - додаткові
                витрати по доставці ми беремо на себе.
              </div>
            ) : null}
            <div
              className={styles.cont_for_question}
              onClick={() =>
                setOpened(prev => ({ ...prev, fifth: !prev.fifth }))
              }
            >
              Які терміни доставки? {opened.fifth ? minus : plusCircule}
            </div>
            {opened.fifth ? (
              <div className={styles.answer_cont}>
                Якщо запчастина на нашому складі - відправимо в день замовлення.{' '}
                <br /> Якщо на віддаленому складі - відправимо на наступний
                день.
                <br /> Якщо запчастина з-за кордону - від 14 до 45 днів
                (залежить від країни)
              </div>
            ) : null}
            <div
              className={styles.cont_for_question}
              onClick={() =>
                setOpened(prev => ({ ...prev, sixth: !prev.sixth }))
              }
            >
              Чи даєте гарантію на запчастини?{' '}
              {opened.sixth ? minus : plusCircule}
            </div>
            {opened.sixth ? (
              <div className={styles.answer_cont}>
                Так, гарантія надається на усі запчастини. Гарантія дійсна 10000
                км або 3 місяці. При умові, що є акт виконаних робіт по
                встановленню запчастини на СТО.
              </div>
            ) : null}
          </div>
        </div>
        <h2 className={styles.why_we}>Відгуки наших покупців</h2>
        <div className={styles.our_descr_for_reviews}>
          {reviews.map(review => (
            <Review key={review.message} details={review} />
          ))}
        </div>
        <div className={styles.bottom_of_reviews}>
          <Link href="/leave_review" className={styles.leave_review_btn}>
            Залишити відгук
          </Link>
          <button
            onClick={e => setPageReview(prev => prev + 1)}
            className={styles.more_review_btn}
          >
            Переглянути ще...
          </button>
        </div>
        <h2 className={styles.why_we}>Вітаємо у світі автозапчастин</h2>
        <div className={styles.text_about_company}>
          Ласкаво просимо до BayrakParts – вашого вірного постачальника
          автозапчастин. Ми - ваш надійний партнер у світі автозапчастин,
          пропонуючи широкий асортимент якісних деталей для автомобілів різних
          марок та моделей. Наша місія - забезпечити наших клієнтів найвищою
          якістю продукції та неперевершеним обслуговуванням. Ми ретельно
          відбираємо кожну запчастину, щоб ви могли бути впевнені в її
          надійності та довговічності.
        </div>
        <h2 className={styles.why_we}>Корисні статті та поради</h2>
        <div className={styles.blog_container}>
          <Link href="articles/yak-pidgotuvaty-avto-do-lita">
            Як підготувати авто до літа
          </Link>
          <Link href="articles/top-vyrobnyky-avtozapchastyn-u-sviti">
            Топ виробники автозапчастин у світі
          </Link>
          <Link href="articles/yak-vyznachyty-polomku-v-mashyni">
            Як визначити поломку в машині
          </Link>
          <Link href="articles">Усі наші статті</Link>
        </div>
        <h2 className={styles.why_we}>Чому запчастини саме у нас</h2>
        <div className={styles.text_about_company}>
          <div>
            <h3>Широкий асортимент товарів</h3>
            BayrakParts пропонує великий вибір автозапчастин для різних марок і
            моделей автомобілів. Ви знайдете все, що потрібно для ремонту або
            підтримки вашого автомобіля, від запчастин двигуна до кузовних
            деталей.
          </div>
          <div>
            <h3>Висока якість продукції</h3>
            Ми працюємо тільки з надійними постачальниками, які гарантують
            якість своєї продукції. Всі запчастини проходять ретельну перевірку
            перед тим, як потрапляти до наших полиць, щоб ви могли мати
            впевненість у їхній надійності.
          </div>
          <div>
            <h3>Конкурентні ціни</h3>
            BayrakParts пропонує конкурентоспроможні ціни на всі свої товари. Ми
            розуміємо, що ремонт автомобіля може бути витратним, тому ми
            намагаємося зробити наші товари доступними для широкого кола
            клієнтів.
          </div>
          <div>
            <h3> Зручний сервіс</h3>
            Наша команда з досвідчених фахівців завжди готова допомогти вам з
            вибором потрібних запчастин або вирішенням будь-яких питань. Ми
            пропонуємо швидку доставку і зручні способи оплати, щоб зробити
            процес покупок максимально комфортним для вас.
          </div>
          <div>
            <h3> Клієнтська підтримка</h3>
            Наша компанія цінує кожного клієнта, тому ми завжди готові надати
            вам найвищий рівень обслуговування. Ми віримо у взаємовигідні
            стосунки з нашими клієнтами і завжди раді відповісти на ваші
            запитання або врахувати ваші побажання.
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ req, query }) => {
  const res = await fetch(
    `https://api.bayrakparts.com/api/info/get_reviews?step=0`,
    {
      method: 'GET',
    }
  )

  const body = await res.json()

  return {
    props: {
      running: body,
    },
  }
}

export default NewMainPage
