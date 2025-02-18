import classes from './style.module.css'

export interface INavbarMainProps {
	children: React.ReactNode
}

export function NavbarMain({ children }: INavbarMainProps) {
	return <div className={classes.navbarMain}>{children}</div>
}
