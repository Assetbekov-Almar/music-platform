import { useEffect } from 'react'
import styles from '../styles/my-tracks.module.scss'
import { useAppDispatch, useAppSelector } from '../app/store'
import { getUserTracksAsync, selectUserTracks } from '../features/userTracks/Slice'
import Image from 'next/image'

function UserTracks() {
	const dispatch = useAppDispatch()
	const tracks = useAppSelector(selectUserTracks)

	useEffect(() => {
		dispatch(getUserTracksAsync())
	}, [])

	console.log(tracks)
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
