import styles from '../../styles/Related_articles.module.css'

const Question = ({ art, number }) => {
  console.log(art)
  return (
    <div className={styles.question_cont}>
      <h4>
        {number + 1}. {art.title}
      </h4>
      <br />
      <div className={styles.text}>{art.text}</div>
    </div>
  )
}

const Related_articles = ({ relatedArt }) => {
  console.log(relatedArt)
  return (
    <div className={styles.related_articles_cont}>
      <div className={styles.articles_wrapper}>
        <h3>Варто знати:</h3>
        {relatedArt.map((art, index) => (
          <Question key={`article${index}`} art={art} number={index} />
        ))}
      </div>
    </div>
  )
}

export default Related_articles
