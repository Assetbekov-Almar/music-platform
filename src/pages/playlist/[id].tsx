import spotifyApi from '../../../lib/spotify'
import { getSession } from 'next-auth/react'
import styles from '../../styles/Playlist.module.scss'
import Image from 'next/image'
import { convertMsToTime } from '../../utils/convertMsToTime'
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { convertMsToTimeWithoutText } from '../../utils/convertMsToTimeWithoutText'
import { formatDate } from '../../utils/formatDate'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentTrack } from '../../features/playlist/Slice'
import Track from '../../components/Track'

const Playlist = ({ playlist }) => {
	const { images, name, type, owner, tracks } = playlist ?? {}
	const time = tracks.items.reduce((prev: number, curr) => prev + curr.track.duration_ms, 0)
	const [isAccountError, setIsAccountError] = useState(true)
	const [hoveredSongId, setHoveredSongId] = useState('')
	const dispatch = useDispatch()

	const trackPlayHandler = async (uri: string, track) => {
		try {
			await spotifyApi.play({ uris: uri })
			dispatch(setCurrentTrack(track))
			setIsAccountError(true)
		} catch (e) {
			dispatch(setCurrentTrack(null))
			setIsAccountError(false)
			console.log(e)
		}
	}

	return (
		<>
			{!isAccountError && (
				<>
					<div className={styles.backdrop} />
					<div className={styles.premium__error}>
						<FontAwesomeIcon icon={faTimes} className={styles.close__btn} onClick={() => setIsAccountError(true)} />
						You need to have a premium account in order to play a song.
					</div>
				</>
			)}
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
					<div className={styles.playlist}>
						{tracks.items.map((item, index) => {
							const { album, duration_ms, uri, id } = item.track
							return (
								<div
									className={styles.playlist__main}
									key={id}
									onMouseEnter={() => setHoveredSongId(id)}
									onMouseLeave={() => setHoveredSongId('')}
								>
									{hoveredSongId === id ? (
										<FontAwesomeIcon
											icon={faPlay}
											className={styles.play__button}
											onClick={() => trackPlayHandler(uri, item.track)}
										/>
									) : (
										<span>{index + 1}</span>
									)}

									<Track track={item.track} />
									<span>{album.name}</span>
									<span className={styles.track__add_time}>{formatDate(item.added_at)}</span>
									<span>{convertMsToTimeWithoutText(duration_ms)}</span>
								</div>
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
