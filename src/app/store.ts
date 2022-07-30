import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { trackSlice } from '../features/track/Slice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { userTracksSlice } from '../features/userTracks/Slice'
import { useProfileSlice } from '../features/userProfile/Slice'
import { userPlaylistsSlice } from '../features/sidebar/Slice'
import { playlistSlice } from '../features/playlist/Slice'

export function makeStore() {
	return configureStore({
		reducer: {
			track: trackSlice.reducer,
			userTracks: userTracksSlice.reducer,
			profile: useProfileSlice.reducer,
			playlists: userPlaylistsSlice.reducer,
			playlist: playlistSlice.reducer,
		},
	})
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export default store
