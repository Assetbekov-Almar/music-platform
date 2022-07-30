import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { AppState } from '../../app/store'
import { getUserProfile } from './API'

export interface userProfileState {
	value: any
	status: 'idle' | 'loading' | 'failed'
}

const initialState: userProfileState = {
	value: null,
	status: 'idle',
}

export const getUseProfileAsync = createAsyncThunk('userProfile/getUserProfile', async () => {
	return await getUserProfile()
})

export const useProfileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUseProfileAsync.pending, (state) => {
				state.status = 'loading'
				state.value = null
			})
			.addCase(getUseProfileAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.value = action.payload
			})
			.addCase(getUseProfileAsync.rejected, (state, action) => {
				state.status = 'failed'
				state.value = 'error'
			})
	},
})

export const selectUserProfile = (state: AppState) => state.profile.value

export default useProfileSlice.reducer
