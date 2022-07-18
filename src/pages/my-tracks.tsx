import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/store'
import { getUserTracksAsync, selectUserTracks } from '../features/userTracks/Slice'

function UserTracks() {
	const dispatch = useAppDispatch()
	const tracks = useAppSelector(selectUserTracks)

	useEffect(() => {
		dispatch(getUserTracksAsync())
	}, [])

	return (
		<div>
			{tracks.map((item) => (
				<div key={item.id}></div>
			))}
		</div>
	)
}

export default UserTracks
