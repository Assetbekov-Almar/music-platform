import styles from '../styles/Playlist.module.scss'
import Image from 'next/image'
import classNames from 'classnames'

const Track = ({ track }) => {
	if (!track) return <></>

	const { album, explicit, artists, name } = track
	const { url, width, height } = album.images[0]

	return (
		<span className={styles.track__container}>
			<div className={styles.track__cover}>
				<Image src={url} width={width} height={height} alt={name} />
			</div>
			<div className={styles.track}>
				<div className={styles.track__name}>{name}</div>
				{explicit && <span className={styles.track__explicit}>E</span>}
				<span className={classNames(styles.track__artists, { [styles.track_inexplicit]: !explicit })}>
					{artists.map((artist, index) => (
						<span key={artist.id}>
							{index !== 0 && ', '}
							{artist.name}
						</span>
					))}
				</span>
			</div>
		</span>
	)
}

export default Track
