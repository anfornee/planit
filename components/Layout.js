import Head from 'next/head'
import Navbar from './Navbar'

import styles from './layout.module.css'

const Layout = ({ children, home }) => (
  <div className={styles.container}>
    <Head>
      <link rel='icon' href='/favicon.ico' />
      <title>PlanIt</title>
    </Head>
    <Navbar />
    <img
      src='/images/color_logo_trans_background.png'
      alt='Alt'
      className={styles.logo}
    />
    {children}
  </div>
)

export default Layout
