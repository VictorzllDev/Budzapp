import { AppShell, Burger, Container, Group, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconFileCheck, IconLogout, IconReceipt2, IconSettings, IconShoppingCart } from '@tabler/icons-react'
import { Outlet } from 'react-router'
import { Navbar } from '../../../components/Navbar'
import { useAuth } from '../../../hooks/useAuth'

const data = [
	{ link: '/', label: 'Dashboard', Icon: IconReceipt2 },
	{ link: '/products', label: 'Produtos', Icon: IconShoppingCart },
]

export function PrivateLayout() {
	const [opened, { toggle, close }] = useDisclosure()
	const { logout } = useAuth()

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: 'sm',
				collapsed: { mobile: !opened },
			}}
			padding="md"
		>
			<AppShell.Header p={6}>
				<Group justify="space-between" align="center" h="100%">
					<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" />
					<Group h="100%" gap={0}>
						<IconFileCheck size={32} />
						<Text size="xl" fw="bold">
							Budzapp
						</Text>
					</Group>
				</Group>
			</AppShell.Header>

			<AppShell.Navbar bd={0}>
				<Navbar.Root>
					<Navbar.Main>
						<Navbar.Header />
						{data.map((LinkProps) => (
							<Navbar.Link key={LinkProps.label} {...LinkProps} onClick={close} />
						))}
					</Navbar.Main>
					<Navbar.Footer>
						<Navbar.Link label="Settings" link="/settings" Icon={IconSettings} onClick={close} />
						<Navbar.Link label="Logout" link="" Icon={IconLogout} onClick={logout} />
					</Navbar.Footer>
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
