import spotifyApi from '../../../lib/spotify'
import { getSession } from 'next-auth/react'
import styles from '../../styles/Playlist.module.scss'
import Image from 'next/image'
import { convertMsToTime } from '../../utils/convertMsToTime'

const Playlist = ({ playlist }) => {
	console.log(playlist)
	const { images, name, type, owner, tracks } = playlist ?? {}
	const time = tracks.items.reduce((prev, curr) => prev + curr.track.duration_ms, 0)

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				{images?.length > 0 && (
					<div className={styles.image__wrapper}>
						<Image src={images[0].url} layout={'fill'} alt={name} />
					</div>
				)}
				<div className={styles.header__info}>
					<h2>{type}</h2>
					<h1>{name}</h1>
					<div>
						<span className={styles.owner_name}>{owner.display_name}</span>
						<span className={styles.header__tracks}>
							{tracks.total} song{tracks.total !== 1 && 's'},
						</span>
						<span className={styles.tracks__duration}> {convertMsToTime(time)}</span>
					</div>
				</div>
			</div>
			<div>asd</div>
		</div>
	)
}

export default Playlist

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req })
	if (!session?.user) return
	spotifyApi.setAccessToken(session.user.accessToken)
	const playlistId = context.params.id
	const result = await spotifyApi.getPlaylist(playlistId)

	return {
		props: {
			playlist: result.body,
		},
	}
}
