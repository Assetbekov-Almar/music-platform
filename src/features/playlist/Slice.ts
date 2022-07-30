import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { AppState } from '../../app/store'
import { getPlaylist } from './API'

export interface playlistState {
	value: any
	status: 'idle' | 'loading' | 'failed'
}

const initialState: playlistState = {
	value: [],
	status: 'idle',
}

export const getPlaylistAsync = createAsyncThunk('playlist/getPlaylist', async (playlistId) => {
	return await getPlaylist(playlistId)
})

export const playlistSlice = createSlice({
	name: 'playlist',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getPlaylistAsync.pending, (state) => {
				state.status = 'loading'
				state.value = []
			})
			.addCase(getPlaylistAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.value = action.payload
			})
			.addCase(getPlaylistAsync.rejected, (state, action) => {
				state.status = 'failed'
				state.value = 'error'
			})
	},
})

export const selectPlaylist = (state: AppState) => state.playlist.value

export default playlistSlice.reducer
