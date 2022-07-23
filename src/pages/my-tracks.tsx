import styles from '../styles/my-tracks.module.scss'
import Image from 'next/image'
import { fetchUserTracks } from '../features/userTracks/API'

function UserTracks({ tracks }) {
	return (
		<div className={styles.container}>
			{tracks.map((item) => {
				const { track } = item
				const { preview_url, artists } = track
				const { images, name } = track.album
				const { height, width, url } = images[0]
				return (
					<div key={track.id} className={styles.track}>
						<Image alt={name} height={height} width={width} src={url} />
						{artists.map((artist) => (
							<div key={artist.id} className={styles.track__artist}>
								{artist.name}
							</div>
						))}
						<div className={styles.track__name}>{track.name}</div>
						{preview_url && (
							<audio controls>
								<source src={preview_url} type='audio/mpeg' />
							</audio>
						)}
					</div>
				)
			})}
		</div>
	)
}

export default UserTracks

export async function getStaticProps() {
	const result = await fetchUserTracks()
	const tracks = result.items

	return {
		props: {
			tracks,
		},
	}
}
