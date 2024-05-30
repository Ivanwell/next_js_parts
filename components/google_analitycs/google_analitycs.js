'use client'
import Script from 'next/script'

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-6SSFMSDB43"
      ></Script>
      <Script strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6SSFMSDB43');`}
      </Script>
    </>
  )
}

export default GoogleAnalytics
