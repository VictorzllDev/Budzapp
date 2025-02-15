import { Button, Card, Group, Image, Text } from '@mantine/core'
import classes from './style.module.css'

const mockdata = {
	image:
		'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.leroymerlin.com.br%2Fproducts%2Fgesso_revestimento_40kg_gesso_facil_91060634_960b_300x300.jpg&f=1&nofb=1&ipt=92b01c307616f650b1fb2724709ed3ebb7c7eec8ba2131b90039e0d2ec1b2d17&ipo=images',
	title: 'Gesso 40kg',
	description: 'Gesso Facil de revistimento de 40kg.',
}

export function BadgeCard() {
	const { image, title, description } = mockdata

	return (
		<Card withBorder radius="md" p="md" className={classes.card}>
			<Card.Section>
				<Image src={image} alt={title} height={180} fit="contain" />
			</Card.Section>

			<Card.Section className={classes.section} mt="md">
				<Group justify="apart">
					<Text fz="lg" fw={500}>
						{title}
					</Text>
				</Group>
				<Text fz="sm" mt="xs">
					{description}
				</Text>
			</Card.Section>

			<Card.Section className={classes.section}>
				<Text mt="md" className={classes.label} c="dimmed">
					R$ 27,00
				</Text>
			</Card.Section>

			<Group mt="xs">
				<Button radius="md" color="red" fullWidth>
					Deletar
				</Button>
			</Group>
		</Card>
	)
}
