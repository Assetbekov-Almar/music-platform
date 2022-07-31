import spotifyApi from '../../../lib/spotify'
import { getSession } from 'next-auth/react'
import styles from '../../styles/Playlist.module.scss'
import Image from 'next/image'
import { convertMsToTime } from '../../utils/convertMsToTime'
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { convertMsToTimeWithoutText } from '../../utils/convertMsToTimeWithoutText'
import { formatDate } from '../../utils/formatDate'

const Playlist = ({ playlist }) => {
	console.log(playlist)
	const { images, name, type, owner, tracks } = playlist ?? {}
	const time = tracks.items.reduce((prev, curr) => prev + curr.track.duration_ms, 0)

	return (
		<>
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
			<div className={styles.main}>
				<div className={styles.background} />
				<div className={styles.playlist__container}>
					<div className={styles.playlist__header}>
						<div className={styles.header__grid}>
							<span>#</span>
							<span>title</span>
							<span>album</span>
							<span>date added</span>
							<div>
								<FontAwesomeIcon icon={faClock} />
							</div>
						</div>
					</div>
					<div className={styles.playlist__main}>
						{tracks.items.map((item, index) => {
							const { album, name, explicit, artists, duration_ms } = item.track
							const { url, width, height } = album.images[0]
							return (
								<>
									<span>{index + 1}</span>
									<span className={styles.track__container}>
										<div className={styles.track__cover}>
											<Image src={url} width={width} height={height} />
										</div>
										<div className={styles.track}>
											<div className={styles.track__name}>{name}</div>
											{explicit && <span className={styles.track__explicit}>E</span>}
											<span className={classNames(styles.track__artists, { [styles.track_inexplicit]: !explicit })}>
												{artists.map((artist, index) => (
													<span key={artist.id}>
														{index !== 0 && ', '}
														{artist.name}
													</span>
												))}
											</span>
										</div>
									</span>
									<span>{album.name}</span>
									<span className={styles.track__add_time}>{formatDate(item.added_at)}</span>
									<span>{convertMsToTimeWithoutText(duration_ms)}</span>
								</>
							)
						})}
					</div>
				</div>
			</div>
		</>
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
