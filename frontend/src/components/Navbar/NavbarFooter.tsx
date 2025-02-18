import classes from './style.module.css'

export interface INavbarFooterProps {
	children: React.ReactNode
}

export function NavbarFooter({ children }: INavbarFooterProps) {
	return <div className={classes.footer}>{children}</div>
}
