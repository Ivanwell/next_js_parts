import Navbar from '../navbar/navbar'
import NewNavbar from '../newnavbar/newnavbar'
import NewFooter from '../newfooter/newfooter'
import Footer from '../footer/footer'
import styles from '../../styles/Layuot.module.css'

const Layout = ({ children }) => {
  return (
    <>
      <NewNavbar />
      <div className={styles.main_root}>{children}</div>
      <NewFooter />
    </>
  )
}

export default Layout
