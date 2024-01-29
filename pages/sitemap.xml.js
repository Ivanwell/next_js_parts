// <!-- ;<xml version="1.0" encoding="UTF-8">
//   <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//     <sitemap>
//       <loc>https://bayrakparts.com/sitemap-0.xml</loc>
//     </sitemap>
//     <sitemap>
//       <loc>https://bayrakparts.com/sitemap-1.xml</loc>
//     </sitemap>
//     <sitemap>
//       <loc>https://bayrakparts.com/sitemap-2.xml</loc>
//     </sitemap>
//     <sitemap>
//       <loc>https://bayrakparts.com/sitemap-3.xml</loc>
//     </sitemap>
//     <sitemap>
//       <loc>https://bayrakparts.com/sitemap-4.xml</loc>
//     </sitemap>
//     <sitemap>
//       <loc>https://bayrakparts.com/sitemap-5.xml</loc>
//     </sitemap>
//   </sitemapindex>
// </xml> -->

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
      <loc>https://bayrakparts.com/sitemap-0.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://bayrakparts.com/sitemap-1.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://bayrakparts.com/sitemap-2.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://bayrakparts.com/sitemap-3.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://bayrakparts.com/sitemap-4.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://bayrakparts.com/sitemap-5.xml</loc>
    </sitemap>
  </sitemapindex>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap()

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
