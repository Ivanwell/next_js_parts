import '../styles/globals.css'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import * as ga from '../components/lib/gtag'
import Layout from '@/components/layout/layout'
import { SpeedInsights } from '@vercel/speed-insights/react'
import GoogleAnalytics from '@/components/google_analitycs/google_analitycs'
import { SessionProvider } from 'next-auth/react'

function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleStart = url => {
    setLoading(true)
  }
  const handleComplete = url => {
    setLoading(false)
  }

  useEffect(() => {
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routerChangeStart', handleStart)
      router.events.off('routerChangeComplete', handleComplete)
      router.events.off('routerChangeError', handleComplete)
    }
  }, [])

  useEffect(() => {
    const handleRouteChange = url => {
      ga.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <SessionProvider session={session}>
      <Layout>
        <>
          {loading === false ? (
            <>
              <Component {...pageProps} />
              <SpeedInsights />
            </>
          ) : (
            <h1 className="loading_spinner">
              <div className="lds-dual-ring"></div>
            </h1>
          )}
        </>
        <GoogleAnalytics />
      </Layout>
    </SessionProvider>
  )
}

export default App
