import styles from '../../styles/userProfile.module.scss'
import { signOut } from 'next-auth/react'

const Dropdown = () => {
	return (
		<ul className={styles.dropdown}>
			<li onClick={() => signOut()}>Sign out</li>
		</ul>
	)
}

export default Dropdown
