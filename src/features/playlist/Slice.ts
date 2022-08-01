import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from '../../app/store'

export interface playlistState {
	id: string
	isPlaying: boolean
}

const initialState: playlistState = {
	id: '',
	isPlaying: false,
}

export const playlistSlice = createSlice({
	name: 'playlist',
	initialState,
	reducers: {
		play: (state) => {
			state.isPlaying = true
		},
		pause: (state) => {
			state.isPlaying = false
		},
		setCurrentSongId: (state, action: PayloadAction<string>) => {
			state.id = action.payload
		},
	},
})

export const selectSongId = (state: AppState) => state.playlist.id
export const selectIsPlaylistPlaying = (state: AppState) => state.playlist.isPlaying

export const { play, pause, setCurrentSongId } = playlistSlice.actions

export default playlistSlice.reducer
