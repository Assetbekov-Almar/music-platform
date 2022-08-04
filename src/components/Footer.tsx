import styles from '../styles/Footer.module.scss'
import { useSelector } from 'react-redux'
import { selectSongId } from '../features/playlist/Slice'
import Track from './Track'
import { faShuffle } from '@fortawesome/free-solid-svg-icons/faShuffle'
import { faBackwardStep } from '@fortawesome/free-solid-svg-icons/faBackwardStep'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons/faCirclePlay'
import { faForwardStep } from '@fortawesome/free-solid-svg-icons/faForwardStep'
import { faRepeat } from '@fortawesome/free-solid-svg-icons/faRepeat'
import { faVolumeLow } from '@fortawesome/free-solid-svg-icons/faVolumeLow'
import { faCircleStop } from '@fortawesome/free-solid-svg-icons/faCircleStop'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import spotifyApi from '../../lib/spotify'

const Footer = () => {
	const track = useSelector(selectSongId)
	const token = spotifyApi.getAccessToken()

	const [is_paused, setPaused] = useState<boolean>(false)
	const [player, setPlayer] = useState<Spotify.Player | null>(null)
	console.log(player)

	useEffect(() => {
		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: 'Web Playback SDK',
				getOAuthToken: (cb) => {
					cb(token)
				},
				volume: 0.5,
			})

			setPlayer(player)

			player.addListener('player_state_changed', (state) => {
				if (!state) {
					return
				}

				setPaused(state.paused)
			})

			player.connect()
		}
	}, [token, track])

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
						<button onClick={() => player.previousTrack()}>
							<FontAwesomeIcon icon={faBackwardStep} />
						</button>
					</div>

					<button className={styles.player__play_btn} onClick={() => player.togglePlay()}>
						<FontAwesomeIcon icon={is_paused ? faCircleStop : faCirclePlay} />
					</button>

					<div className={styles.player__btns_right}>
						<button onClick={() => player.nextTrack()}>
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
			<div className={styles.volume}>
				<button>
					<FontAwesomeIcon icon={faVolumeLow} />
				</button>
			</div>
		</footer>
	)
}

export default Footer
