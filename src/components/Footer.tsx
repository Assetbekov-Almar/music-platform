import styles from '../styles/Footer.module.scss'
import { useSelector } from 'react-redux'
import { selectSongId } from '../features/playlist/Slice'
import Track from './Track'

const Footer = () => {
	const track = useSelector(selectSongId)

	return (
		<footer className={styles.container}>
			<div className={styles.track}>
				<Track track={track} />
			</div>
			<div className={styles.player}>asd</div>
			<div className={styles.volume}>asd</div>
		</footer>
	)
}

export default Footer
