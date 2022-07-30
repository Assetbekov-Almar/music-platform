import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { AppState } from '../../app/store'
import { getUserPlaylists } from './API'

export interface userPlaylistsState {
	value: any
	status: 'idle' | 'loading' | 'failed'
}

const initialState: userPlaylistsState = {
	value: [],
	status: 'idle',
}

export const getUserPlaylistsAsync = createAsyncThunk('userPlaylists/getUserPlaylists', async () => {
	return await getUserPlaylists()
})

export const userPlaylistsSlice = createSlice({
	name: 'playlists',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUserPlaylistsAsync.pending, (state) => {
				state.status = 'loading'
				state.value = []
			})
			.addCase(getUserPlaylistsAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.value = action.payload
			})
			.addCase(getUserPlaylistsAsync.rejected, (state, action) => {
				state.status = 'failed'
				state.value = 'error'
			})
	},
})

export const selectUserPlaylists = (state: AppState) => state.playlists.value

export default userPlaylistsSlice.reducer
