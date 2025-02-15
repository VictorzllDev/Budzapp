import { AppShell, Burger, Flex, Text, Container } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconReceipt2, IconShoppingCart } from '@tabler/icons-react'
import { Outlet } from 'react-router'
import { Navbar } from '../../../components/Navbar'
import classes from './style.module.css'
import iconSvg from '/icon.svg'

const data = [
	{ link: '/', label: 'Dashboard', Icon: IconReceipt2 },
	{ link: '/products', label: 'Produtos', Icon: IconShoppingCart },
]

export function AutenticatedLayout() {
	const [opened, { toggle }] = useDisclosure()

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
			padding="sm"
		>
			<AppShell.Header className={classes.header}>
				<span>
					<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" />
				</span>
				<Flex gap="xs" align="center">
					<Text fw={700}>Budzapp</Text>
					<img src={iconSvg} alt="Budzapp" />
				</Flex>
			</AppShell.Header>
			<AppShell.Navbar>
				<Navbar.Root>
					<Navbar.Main>
						<Navbar.Header />
						{data.map((link) => (
							<Navbar.Link key={link.label} {...link} />
						))}
					</Navbar.Main>
					<Navbar.Footer />
				</Navbar.Root>
			</AppShell.Navbar>
			<AppShell.Main>
				<Container>
					<Outlet />
				</Container>
			</AppShell.Main>
		</AppShell>
	)
}
