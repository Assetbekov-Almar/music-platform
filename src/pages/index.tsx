import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Track from '../features/track/Track'

const CLIENT_ID = '8757a4840e454ead9e0825c449dd79c5'
const REDIRECT_URI = 'http://localhost:3000'
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
const RESPONSE_TYPE = 'token'

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Music Platform</title>
				<meta name='description' content='A unique music app platform' />
			</Head>

			<main>
				<Track />
				<a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
					Log in
				</a>
			</main>
		</div>
	)
}

export default Home
