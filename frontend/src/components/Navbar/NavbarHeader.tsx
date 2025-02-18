import { Avatar, Code, Group, Text } from '@mantine/core'
import classes from './style.module.css'

export function NavbarHeader() {
	return (
		<Group className={classes.header} justify="space-between">
			<Group gap={8}>
				<Avatar size={28} radius="xl" />
				<Text>Jonh Doe</Text>
			</Group>
			<Code fw={700}>v0.0.0</Code>
		</Group>
	)
}
