import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from '../../app/store'

export interface playlistState {
	track: any
}

const initialState: playlistState = {
	track: null,
}

export const playlistSlice = createSlice({
	name: 'playlist',
	initialState,
	reducers: {
		setCurrentTrack: (state, action: PayloadAction<string>) => {
			state.track = action.payload
		},
	},
})

export const selectSongId = (state: AppState) => state.playlist.track

export const { setCurrentTrack } = playlistSlice.actions

export default playlistSlice.reducer
