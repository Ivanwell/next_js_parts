const EXTERNAL_DATA_URL = 'https://www.bayrakparts.com/'

function generateSiteMap(data1) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${data1
        .map(article => {
          return `
        <url>
            <loc>${`${EXTERNAL_DATA_URL}search/mt_item/${article.article}`}</loc>
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
  const res1 = await fetch(
    `https://masterteile.bayrakparts.com/get_all_artciles`,
    {
      method: 'GET',
    }
  )
  const body = await res1.json()

  const sitemap = generateSiteMap(body.slice(15001, body.length))

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
