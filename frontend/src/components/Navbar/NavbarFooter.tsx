import { IconLogout, IconSettings } from '@tabler/icons-react'
import { Link } from 'react-router'
import { useAuth } from '../../hooks/useAuth'
import classes from './style.module.css'

export function NavbarFooter() {
	const { logout } = useAuth()

	return (
		<div className={classes.footer}>
			<Link to="settings" className={classes.link}>
				<IconSettings className={classes.linkIcon} stroke={1.5} />
				<span>Settings</span>
			</Link>

			<Link to="" onClick={logout} className={classes.link}>
				<IconLogout className={classes.linkIcon} stroke={1.5} />
				<span>Logout</span>
			</Link>
		</div>
	)
}
