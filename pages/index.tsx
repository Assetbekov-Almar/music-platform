import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Music Platform</title>
        <meta name="description" content="A unique music app platform" />
      </Head>
    </div>
  )
}

export default Home
