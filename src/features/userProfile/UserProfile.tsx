import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { getUseProfileAsync, selectUserProfile } from './Slice'

const UserProfile = () => {
	const dispatch = useAppDispatch()
	const profileData = useAppSelector(selectUserProfile)
	useEffect(() => {
		dispatch(getUseProfileAsync())
	}, [])

	if (!profileData) return <div>loading...</div>
	console.log(profileData)
	return <div>{profileData.display_name}</div>
}

export default UserProfile
