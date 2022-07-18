import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/store'
import { getUserTracksAsync, selectUserTracks } from '../features/userTracks/Slice'

function UserTracks() {
	const dispatch = useAppDispatch()
	const tracks = useAppSelector(selectUserTracks)

	useEffect(() => {
		dispatch(getUserTracksAsync())
	}, [])

	console.log(tracks)

	return (
		<div>
			{tracks.map((item) => {
				const { track } = item
				const { images, name } = track.album
				const { height, width, url } = images[0]
				return (
					<div key={track.id}>
						<img alt={name} height={height} width={width} src={url} />
					</div>
				)
			})}
		</div>
	)
}

export default UserTracks
