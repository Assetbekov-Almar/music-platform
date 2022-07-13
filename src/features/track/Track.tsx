import { getTrackAsync, resetTrack, selectTracks } from './trackSlice'
import { useAppDispatch, useAppSelector } from '../../app/store'
import useDebounce from '../../app/hooks/useDebounce'
import { useEffect, useState } from 'react'

function Track() {
	const dispatch = useAppDispatch()
	const tracks = useAppSelector(selectTracks)
	const [searchVal, setSearchVal] = useState('')
	const debouncedTitle = useDebounce(searchVal, 500)

	useEffect(() => {
		if (debouncedTitle.length > 0) {
			dispatch(getTrackAsync(searchVal))
		} else {
			dispatch(resetTrack())
		}
	}, [debouncedTitle])

	return (
		<div>
			<input type='text' onChange={(e) => setSearchVal(e.target.value)} value={searchVal} />
			{tracks.map((item) => (
				<div key={item.id}>
					<div>{item.name}</div>
					<audio controls>
						<source src={item.preview_url} type='audio/mpeg' />
					</audio>
				</div>
			))}
		</div>
	)
}

export default Track
