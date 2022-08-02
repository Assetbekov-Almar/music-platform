import styles from '../styles/Footer.module.scss'
import { useSelector } from 'react-redux'
import { selectSongId } from '../features/playlist/Slice'
import Track from './Track'
import { faShuffle } from '@fortawesome/free-solid-svg-icons/faShuffle'
import { faBackwardStep } from '@fortawesome/free-solid-svg-icons/faBackwardStep'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons/faCirclePlay'
import { faForwardStep } from '@fortawesome/free-solid-svg-icons/faForwardStep'
import { faRepeat } from '@fortawesome/free-solid-svg-icons/faRepeat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
	const track = useSelector(selectSongId)

	return (
		<footer className={styles.container}>
			<div className={styles.track}>
				<Track track={track} />
			</div>
			<div className={styles.player}>
				<div className={styles.player__btns}>
					<div className={styles.player__btns_left}>
						<button>
							<FontAwesomeIcon icon={faShuffle} />
						</button>
						<button>
							<FontAwesomeIcon icon={faBackwardStep} />
						</button>
					</div>

					<button className={styles.player__play_btn}>
						<FontAwesomeIcon icon={faCirclePlay} />
					</button>

					<div className={styles.player__btns_right}>
						<button>
							<FontAwesomeIcon icon={faForwardStep} />
						</button>
						<button>
							<FontAwesomeIcon icon={faRepeat} />
						</button>
					</div>
				</div>
				<div className={styles.playback__bar}>
					<div className={styles.playback__progress_time}></div>
					<div className={styles.playback__progress_bar}>
						<label>
							<input type={'range'} min={'0'} max={'220'} step={'5'} />
						</label>
						<div className={styles.progress_bar}>
							<div className={styles.progress_bar__background}>
								<div className={styles.progress_bar_active}>
									<div />
								</div>
								<div className={styles.progress_bar__circle} />
							</div>
						</div>
					</div>
					<div className={styles.playback__duration_time}></div>
				</div>
				<div />
			</div>
			<div className={styles.volume}>asd</div>
		</footer>
	)
}

export default Footer
