import styles from '../../styles/Pagination.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'

const LinkNextPagination = ({ activeIndex }) => {
  const { asPath } = useRouter()

  const next = '>'

  let link = `${asPath.split('?')[0]}?page=${+activeIndex + 1}`

  return (
    <Link className={styles.link_component} href={link}>
      {next}
    </Link>
  )
}

const LinkPrevPagination = ({ activeIndex }) => {
  const { asPath } = useRouter()

  const next = '<'

  let link = `${asPath.split('?')[0]}?page=${
    +activeIndex - 1 === 0 ? '1' : +activeIndex - 1
  }`

  return (
    <Link className={styles.link_component} href={link}>
      {next}
    </Link>
  )
}

const LinkPagination = ({ index, activeIndex }) => {
  const { asPath, query } = useRouter()

  let car = ''

  if (query.brand && query.model && query.engine) {
    car = `&brand=${query.brand}&model=${query.model}&engine=${query.engine}`
  }

  let link = `${asPath.split('?')[0]}?page=${index}${car}`

  return (
    <Link
      className={
        activeIndex == index ? styles.active_link : styles.link_component
      }
      href={link}
    >
      {index}
    </Link>
  )
}

const Pagination = ({ amount }) => {
  const { asPath } = useRouter()
  let activeIndex = 1

  if (asPath.split('page=')[1]) {
    activeIndex = asPath.split('page=')[1]
  }

  const totalLinks = Math.ceil(amount / 20)
  const paginationArr = Array.from(Array(totalLinks), (_, i) => i + 1)

  return (
    <>
      {paginationArr.length > 0 ? (
        <div className={styles.pagination_cont}>
          {paginationArr.length < 8 ? (
            <>
              {paginationArr.map(link => {
                return <LinkPagination index={link} activeIndex={activeIndex} />
              })}
            </>
          ) : (
            <>
              <LinkPrevPagination activeIndex={activeIndex} />
              <LinkPagination index={1} activeIndex={activeIndex} />
              {+activeIndex == 1 ? (
                <>
                  {paginationArr.slice(1, +activeIndex + 2).map(link => {
                    return (
                      <LinkPagination index={link} activeIndex={activeIndex} />
                    )
                  })}
                  ....
                </>
              ) : +activeIndex == 2 || +activeIndex == 3 ? (
                <>
                  {paginationArr.slice(1, +activeIndex + 1).map(link => {
                    return (
                      <LinkPagination index={link} activeIndex={activeIndex} />
                    )
                  })}
                  ....
                </>
              ) : +activeIndex == paginationArr.length ? (
                <>
                  ....
                  {paginationArr
                    .slice(+activeIndex - 4, +activeIndex - 1)
                    .map(link => {
                      return (
                        <LinkPagination
                          index={link}
                          activeIndex={activeIndex}
                        />
                      )
                    })}
                </>
              ) : +activeIndex == paginationArr.length - 1 ? (
                <>
                  ....
                  {paginationArr
                    .slice(+activeIndex - 3, +activeIndex)
                    .map(link => {
                      return (
                        <LinkPagination
                          index={link}
                          activeIndex={activeIndex}
                        />
                      )
                    })}
                </>
              ) : +activeIndex == paginationArr.length - 2 ? (
                <>
                  ....
                  {paginationArr
                    .slice(+activeIndex - 2, +activeIndex + 1)
                    .map(link => {
                      return (
                        <LinkPagination
                          index={link}
                          activeIndex={activeIndex}
                        />
                      )
                    })}
                </>
              ) : (
                <>
                  ....
                  {paginationArr
                    .slice(+activeIndex - 2, +activeIndex + 1)
                    .map(link => {
                      return (
                        <LinkPagination
                          index={link}
                          activeIndex={activeIndex}
                        />
                      )
                    })}
                  ....
                </>
              )}
              <LinkPagination
                index={paginationArr.length}
                activeIndex={activeIndex}
              />
              <LinkNextPagination activeIndex={activeIndex} />
            </>
          )}
        </div>
      ) : null}
    </>
  )
}

export default Pagination
