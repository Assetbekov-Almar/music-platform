import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { AppState } from '../../app/store'
import { fetchTrack } from './trackAPI'

export interface TrackState {
	value: any
	status: 'idle' | 'loading' | 'failed'
}

const initialState: TrackState = {
	value: [],
	status: 'idle',
}

export const getTrackAsync = createAsyncThunk('track/fetchTrack', async (name: string) => {
	const response = await fetchTrack(name)
	return response.tracks
})

export const trackSlice = createSlice({
	name: 'track',
	initialState,
	reducers: {
		resetTrack: (state) => {
			state.value = []
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getTrackAsync.pending, (state) => {
				state.status = 'loading'
				state.value = []
			})
			.addCase(getTrackAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.value = action.payload.items
			})
	},
})

export const { resetTrack } = trackSlice.actions

export const selectTracks = (state: AppState) => state.track.value

export default trackSlice.reducer
