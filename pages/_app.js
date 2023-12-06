import '../styles/globals.css'
import Layout from '@/components/layout/layout'
import { ShopContextProvider } from '@/components/contex/contex'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect, useContext } from 'react'
import { SessionProvider } from 'next-auth/react'
import * as ga from '../components/lib/gtag'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
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

  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  if (typeof window === 'undefined') {
    return <></>
  } else
    return (
      <ShopContextProvider>
        <SessionProvider session={session}>
          <Layout>
            <>
              {loading === false ? (
                <Component {...pageProps} />
              ) : (
                <h1 className="loading_spinner">
                  <div class="lds-dual-ring"></div>
                </h1>
              )}
            </>
          </Layout>
        </SessionProvider>
      </ShopContextProvider>
    )
}
