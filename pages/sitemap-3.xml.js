const EXTERNAL_DATA_URL = 'https://www.bayrakparts.com/'

function generateSiteMap(
  articlesArr12,
  articlesArr13,
  articlesArr14,
  articlesArr15
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${articlesArr12
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
         ${articlesArr13
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
           ${articlesArr14
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
             ${articlesArr15
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
  const articlesArr12 = body2[12].articles
  const articlesArr13 = body2[13].articles
  const articlesArr14 = body2[14].articles
  const articlesArr15 = body2[15].articles

  const sitemap = generateSiteMap(
    articlesArr12,
    articlesArr13,
    articlesArr14,
    articlesArr15
  )

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
