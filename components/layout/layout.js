import NewNavbar from '../newnavbar/newnavbar'
import NewFooter from '../newfooter/newfooter'
import styles from '../../styles/Layuot.module.css'
import { ReduxProvider } from '@/global_state/provider'

const Layout = ({ children, breakpoint }) => {
  return (
    <>
      <ReduxProvider>
        <NewNavbar breakpoint={breakpoint} />
        <main className={styles.main_root}>{children}</main>
        <NewFooter />
      </ReduxProvider>
    </>
  )
}

export default Layout
