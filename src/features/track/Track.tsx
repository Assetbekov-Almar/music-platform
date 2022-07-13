import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { getTrackAsync, selectTracks } from './trackSlice'

function Track() {
	const dispatch = useAppDispatch()
	const tracks = useAppSelector(selectTracks)
	console.log(tracks)

	return (
		<div>
			<div>
				<button onClick={() => dispatch(getTrackAsync('Running up that hill'))}>Find a track</button>
			</div>
		</div>
	)
}

export default Track
