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
  // We make an API call to gather the URLs for our site
  const res1 = await fetch(`https://backend.bayrakparts.com/getLinks/200000`, {
    method: 'GET',
  })

  const body1 = await res1.json()

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(body1)

  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
