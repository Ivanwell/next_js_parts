import styles from '@/styles/Articles.module.css'
import Link from 'next/link'
import Head from 'next/head'

const Articles = ({ articles }) => {
  return (
    <div className={styles.main_article_page}>
      <Head>
        <title>`Наші статті та корисні поради - BAYRAKPARTS`</title>
      </Head>
      <h1>Наші статті та корисні поради</h1>
      <div className={styles.articles_container}>
        {articles.map(article => (
          <Link
            className={styles.link_for_article}
            href={`/articles/${article.link}`}
          >
            {article.title}
            <div className={styles.date_article_for_list}>{article.date}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ req, params }) => {
  const res = await fetch(`https://update.bayrakparts.com/getArticlesAi`, {
    method: 'GET',
  })

  const body = await res.json()

  return {
    props: {
      articles: body,
    },
  }
}

export default Articles
