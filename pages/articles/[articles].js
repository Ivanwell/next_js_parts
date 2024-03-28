import styles from '@/styles/Articles.module.css'
import Link from 'next/link'
import Head from 'next/head'

const Article = ({ article }) => {
  return (
    <div className={styles.main_article_page}>
      <Head>
        <title>{article.title + ` - BAYRAKPARTS`}</title>
        <meta name="description" content={article.text.slice(0, 159)} />
        <meta property="og:type" content="website"></meta>
        <meta
          property="og:url"
          content={`https://bayrakparts.com/articles/${article.link}`}
        ></meta>
      </Head>
      <h1>{article.title}</h1>
      <section className={styles.text_of_article}>
        <span className={styles.date_article}>{article.date}</span>
        {article.text}
      </section>
      <di className={styles.cont_for_buttons}>
        <Link className={styles.link_to_main} href="/articles">
          Усі статті
        </Link>
        <Link className={styles.link_to_main} href="/">
          Підібрати запчастину
        </Link>
      </di>
    </div>
  )
}

export const getServerSideProps = async ({ req, params }) => {
  const fullLink = params.articles

  const res = await fetch(
    `https://update.bayrakparts.com/getArticleByLink?link=${fullLink}`,
    {
      method: 'GET',
    }
  )

  const body = await res.json()

  return {
    props: {
      article: body,
    },
  }
}

export default Article
