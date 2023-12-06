const EXTERNAL_DATA_URL = 'https://www.bayrakparts.com/'

function generateSiteMap(
  articlesArr16,
  articlesArr17,
  articlesArr18,
  articlesArr19
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${articlesArr16
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
         ${articlesArr17
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
           ${articlesArr18
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
             ${articlesArr19
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
  const articlesArr16 = body2[16].articles
  const articlesArr17 = body2[17].articles
  const articlesArr18 = body2[18].articles
  const articlesArr19 = body2[19].articles

  const sitemap = generateSiteMap(
    articlesArr16,
    articlesArr17,
    articlesArr18,
    articlesArr19
  )

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
