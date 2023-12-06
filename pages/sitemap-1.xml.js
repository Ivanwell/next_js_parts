const EXTERNAL_DATA_URL = 'https://www.bayrakparts.com/'

function generateSiteMap(
  articlesArr4,
  articlesArr5,
  articlesArr6,
  articlesArr7
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${articlesArr4
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
         ${articlesArr5
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
           ${articlesArr6
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
             ${articlesArr7
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
  const articlesArr4 = body2[4].articles
  const articlesArr5 = body2[5].articles
  const articlesArr6 = body2[6].articles
  const articlesArr7 = body2[7].articles

  const sitemap = generateSiteMap(
    articlesArr4,
    articlesArr5,
    articlesArr6,
    articlesArr7
  )

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
