import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="uk">
      <Head>
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
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
