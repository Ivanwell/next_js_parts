const EXTERNAL_DATA_URL = 'https://www.bayrakparts.com/'

function generateSiteMap(
  articlesArr8,
  articlesArr9,
  articlesArr10,
  articlesArr11
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${articlesArr8
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
         ${articlesArr9
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
           ${articlesArr10
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
             ${articlesArr11
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
  const articlesArr8 = body2[8].articles
  const articlesArr9 = body2[9].articles
  const articlesArr10 = body2[10].articles
  const articlesArr11 = body2[11].articles

  const sitemap = generateSiteMap(
    articlesArr8,
    articlesArr9,
    articlesArr10,
    articlesArr11
  )

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
