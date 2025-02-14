import type { Icon, IconProps } from '@tabler/icons-react'
import { Link, useLocation } from 'react-router'
import classes from './style.module.css'

interface INavbarLinkProps {
	link: string
	label: string
	Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>
}

export function NavbarLink({ link, label, Icon }: INavbarLinkProps) {
	const { pathname } = useLocation()

	return (
		<Link className={classes.link} data-active={link === pathname || undefined} to={link} key={label}>
			<Icon className={classes.linkIcon} stroke={1.5} />
			<span>{label}</span>
		</Link>
	)
}
