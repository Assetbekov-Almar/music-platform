import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { getUserPlaylistsAsync, selectUserPlaylists } from './Slice'
import styles from '../../styles/Sidebar.module.scss'
import logo from '../../assets/images/logo-with-text.svg'
import Image from 'next/image'
import Link from 'next/link'
import { mainList } from './constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Sidebar = () => {
	const dispatch = useAppDispatch()
	const playlists = useAppSelector(selectUserPlaylists)
	console.log(playlists)

	useEffect(() => {
		dispatch(getUserPlaylistsAsync())
	}, [])

	return (
		<div className={styles.container}>
			<Link href={'/'}>
				<a className={styles.logo__link}>
					<Image src={logo} alt={'logo'} className={styles.logo} />
				</a>
			</Link>

			<ul className={styles.main_links}>
				{mainList.map((item) => (
					<li key={item.title}>
						<Link href={item.route}>
							<a>
								<FontAwesomeIcon icon={item.icon} className={styles.link__icon} />
								<span className={styles.link__title}>{item.title}</span>
							</a>
						</Link>
					</li>
				))}
			</ul>

			<hr />

			<ul className={styles.playlist__links}>
				{playlists.map((item) => (
					<li key={item.id}>
						<Link href={`/playlist/${item.id}`}>
							<a>{item.name}</a>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Sidebar
