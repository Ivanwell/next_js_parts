const EXTERNAL_DATA_URL = 'https://www.bayrakparts.com/'

function generateSiteMap(searches) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${searches
         .map(article => {
           return `
        <url>
            <loc>${`${EXTERNAL_DATA_URL}search/${article}`}</loc>
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
  const res1 = await fetch(`https://api.edetal.store/models`, {
    method: 'GET',
  })
  const body1 = await res1.json()

  const res2 = await fetch(`https://api.edetal.store/exact_parts`, {
    method: 'GET',
  })

  const body2 = await res2.json()

  const brandsAndModelsAndParts = body1.map(brand =>
    brand.Models.map(model =>
      body2.map(category =>
        category.Models.map(part => `${brand.brandName} ${model} ${part}`)
      )
    )
  )

  const newArr = brandsAndModelsAndParts.flat().flat().flat()

  const newArr1 = newArr.slice(85, newArr.lehgth)

  const sitemap = generateSiteMap(newArr1)

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
