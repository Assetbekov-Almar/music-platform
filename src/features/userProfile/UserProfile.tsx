import React, { useEffect, useState } from 'react'
import styles from '../../styles/userProfile.module.scss'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { getUseProfileAsync, selectUserProfile } from './Slice'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Dropdown from './Dropdown'
import classNames from 'classnames'

const UserProfile = () => {
	const dispatch = useAppDispatch()
	const profileData = useAppSelector(selectUserProfile)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const { images, display_name } = profileData ?? {}
	console.log(profileData)
	useEffect(() => {
		dispatch(getUseProfileAsync())
	}, [])

	return (
		<div className={styles.container}>
			<div
				className={classNames(styles.profile, { [styles.profile_active]: isDropdownOpen })}
				onClick={() => setIsDropdownOpen((prevState) => !prevState)}
			>
				<div className={styles.profile__picture}>
					{images?.length > 0 ? (
						<Image alt={'profile-picture'} src={images[0].url} height={30} width={30} />
					) : (
						<FontAwesomeIcon icon={faUser} />
					)}
				</div>
				{display_name && <span className={styles.profile__name}>{display_name}</span>}
				<FontAwesomeIcon icon={faCaretDown} className={styles.profile__arrow} />
				{isDropdownOpen && <Dropdown />}
			</div>
		</div>
	)
}

export default UserProfile
