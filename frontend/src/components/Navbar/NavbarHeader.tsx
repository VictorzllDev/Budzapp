import { Avatar, Code, Flex, Group, Text } from '@mantine/core'
import classes from './style.module.css'

export function NavbarHeader() {
	return (
		<Group className={classes.header} justify="space-between">
			<Flex justify="flex-start" align="center" gap="sm">
				<Avatar size={28} radius="xl" />
				<Text fw={700}>John Doe</Text>
			</Flex>
			<Code fw={700}>v0.0.0</Code>
		</Group>
	)
}
