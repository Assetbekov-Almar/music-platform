import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { AppState } from '../../app/store'
import { fetchUserTracks } from './API'

export interface TrackState {
	value: any
	status: 'idle' | 'loading' | 'failed'
}

const initialState: TrackState = {
	value: [],
	status: 'idle',
}

export const getUserTracksAsync = createAsyncThunk('userTracks/fetchUserTracks', async () => {
	const response = await fetchUserTracks()
	return response.items
})

export const userTracksSlice = createSlice({
	name: 'userTracks',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUserTracksAsync.pending, (state) => {
				state.status = 'loading'
				state.value = []
			})
			.addCase(getUserTracksAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.value = action.payload
			})
	},
})

export const selectUserTracks = (state: AppState) => state.userTracks.value

export default userTracksSlice.reducer
