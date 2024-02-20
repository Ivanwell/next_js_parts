const EXTERNAL_DATA_URL = 'https://bayrakparts.com/'

function generateSiteMap(links) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${links
       .map(link => {
         return `
       <url>
          <loc>${`${EXTERNAL_DATA_URL}product/${link.link}`}</loc>
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
  const res1 = await fetch(`https://backend.bayrakparts.com/getLinks/100000`, {
    method: 'GET',
  })

  const body1 = await res1.json()

  // const res2 = await fetch(`https://backend.bayrakparts.com/get_categories`, {
  //   method: 'GET',
  // })
  // const body2 = await res2.json()

  const sitemap = generateSiteMap(body1)

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap

//    ${categories
//      .map(link => {
//        return `
//    <url>
//       <loc>${`${EXTERNAL_DATA_URL}categories/${link.link}`}</loc>
//       <changefreq>weekly</changefreq>
//       <priority>0.9</priority>
//    </url>
//  `
//      })
//      .join('')}
