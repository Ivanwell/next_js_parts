const EXTERNAL_DATA_URL = 'https://www.bayrakparts.com/'

function generateSiteMap(
  articlesArr20,
  articlesArr21,
  articlesArr22,
  articlesArr23,
  articlesArr24,
  stockArr
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${articlesArr20
         .map(article => {
           return `
        <url>
            <loc>${`${EXTERNAL_DATA_URL}search/item/${article}`}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.9</priority>
        </url>
      `
         })
         .join('')}
         ${articlesArr21
           .map(article => {
             return `
        <url>
            <loc>${`${EXTERNAL_DATA_URL}search/item/${article}`}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.9</priority>
        </url>
      `
           })
           .join('')}
           ${articlesArr22
             .map(article => {
               return `
        <url>
            <loc>${`${EXTERNAL_DATA_URL}search/item/${article}`}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.9</priority>
        </url>
      `
             })
             .join('')}
             ${articlesArr23
               .map(article => {
                 return `
        <url>
            <loc>${`${EXTERNAL_DATA_URL}search/item/${article}`}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.9</priority>
        </url>
      `
               })
               .join('')}
               ${articlesArr24
                 .map(article => {
                   return `
        <url>
            <loc>${`${EXTERNAL_DATA_URL}search/item/${article}`}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.9</priority>
        </url>
      `
                 })
                 .join('')}
           ${stockArr
             .map(product => {
               return `
        <url>
            <loc>${`${EXTERNAL_DATA_URL}stock/${product.article}`}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.9</priority>
        </url>
      `
             })
             .join('')}

         
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const res2 = await fetch(`https://merchant.bayrakparts.com/get_articles`, {
    method: 'GET',
  })

  const body2 = await res2.json()
  const articlesArr20 = body2[20].articles
  const articlesArr21 = body2[21].articles
  const articlesArr22 = body2[22].articles
  const articlesArr23 = body2[23].articles
  const articlesArr24 = body2[24].articles

  const resStock = await fetch(`https://api.edetal.store/getStock`, {
    method: 'GET',
  })

  const stockArr = await resStock.json()

  const sitemap = generateSiteMap(
    articlesArr20,
    articlesArr21,
    articlesArr22,
    articlesArr23,
    articlesArr24,
    stockArr
  )

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
