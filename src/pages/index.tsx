import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Track from '../features/track/Track'

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Music Platform</title>
				<meta name='description' content='A unique music app platform' />
			</Head>
			<body>
				<main>
					<Track />
				</main>
			</body>
		</div>
	)
}

export default Home
