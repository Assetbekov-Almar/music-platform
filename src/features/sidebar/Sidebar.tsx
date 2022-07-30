import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { getUserPlaylistsAsync, selectUserPlaylists } from './Slice'
import styles from '../../styles/Sidebar.module.scss'
import logo from '../../assets/images/logo-with-text.svg'
import Image from 'next/image'
import Link from 'next/link'

const Sidebar = () => {
	const dispatch = useAppDispatch()
	const playlists = useAppSelector(selectUserPlaylists)

	useEffect(() => {
		dispatch(getUserPlaylistsAsync())
	}, [])

	console.log(playlists)

	return (
		<div className={styles.container}>
			<Link href={'/'}>
				<a>
					<Image src={logo} alt={'logo'} className={styles.logo} />
				</a>
			</Link>

			{playlists.map((item) => (
				<div key={item.id}>{item.name}</div>
			))}
		</div>
	)
}

export default Sidebar
