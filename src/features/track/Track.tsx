import { getTrackAsync, selectTracks } from './trackSlice'
import { useAppDispatch, useAppSelector } from '../../app/store'

function Track() {
	const dispatch = useAppDispatch()
	const tracks = useAppSelector(selectTracks)

	return (
		<div>
			<div>
				<button onClick={() => dispatch(getTrackAsync('Running up that hill'))}>Find a track</button>
			</div>
		</div>
	)
}

export default Track
