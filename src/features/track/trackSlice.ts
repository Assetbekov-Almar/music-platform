import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from '../../app/store'
import { fetchTrack } from './trackAPI'

export interface TrackState {
	value: any
	status: 'idle' | 'loading' | 'failed'
}

const initialState: TrackState = {
	value: {},
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
		getTrack: (state, action: PayloadAction<string>) => {
			state.value = {}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getTrackAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getTrackAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.value = action.payload
			})
	},
})

export const { getTrack } = trackSlice.actions

export const selectTracks = (state: AppState) => state.track.value

export default trackSlice.reducer
