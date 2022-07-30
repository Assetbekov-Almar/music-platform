import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { getUserPlaylistsAsync, selectUserPlaylists } from './Slice'

const Sidebar = () => {
	const dispatch = useAppDispatch()
	const playlists = useAppSelector(selectUserPlaylists)

	useEffect(() => {
		dispatch(getUserPlaylistsAsync())
	}, [])

	console.log(playlists)

	return (
		<div>
			{playlists.map((item) => (
				<div key={item.id}>{item.name}</div>
			))}
		</div>
	)
}

export default Sidebar
