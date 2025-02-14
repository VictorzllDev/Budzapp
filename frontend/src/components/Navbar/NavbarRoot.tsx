import classes from './style.module.css'

interface INavbarRootProps {
	children: React.ReactNode
}

export function NavbarRoot({ children }: INavbarRootProps) {
	return <nav className={classes.navbar}>{children}</nav>
}
