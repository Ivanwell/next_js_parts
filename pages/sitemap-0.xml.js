const EXTERNAL_DATA_URL = 'https://www.bayrakparts.com/'

function generateSiteMap(
  brands,
  articlesArr0,
  articlesArr1,
  articlesArr2,
  articlesArr3
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://www.bayrakparts.com/</loc>
       <changefreq>weekly</changefreq>
     </url>
     <url>
       <loc>https://www.bayrakparts.com/contacts</loc>
       <changefreq>weekly</changefreq>
     </url>
     <url>
       <loc>https://www.bayrakparts.com/aboutus</loc>
       <changefreq>weekly</changefreq>
     </url>
     ${brands
       .map(brand => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}brand/${brand.brandName}`}</loc>
           <changefreq>weekly</changefreq>
                    <priority>0.9</priority>
       </url>
     `
       })
       .join('')}

       ${articlesArr0
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
         ${articlesArr1
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
           ${articlesArr2
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
             ${articlesArr3
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
  // We make an API call to gather the URLs for our site
  const res1 = await fetch(`https://api.edetal.store/models`, {
    method: 'GET',
  })

  const body1 = await res1.json()

  const res2 = await fetch(`https://merchant.bayrakparts.com/get_articles`, {
    method: 'GET',
  })

  const body2 = await res2.json()
  const articlesArr0 = body2[0].articles
  const articlesArr1 = body2[1].articles
  const articlesArr2 = body2[2].articles
  const articlesArr3 = body2[3].articles

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(
    body1,
    articlesArr0,
    articlesArr1,
    articlesArr2,
    articlesArr3
  )

  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
