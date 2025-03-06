import { ActionIcon, Button, Card, Divider, Group, Image, NumberFormatter, Text } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import { env } from '../../../../env'
import classes from './style.module.css'

export interface IProductCardProps {
	name: string
	description: string
	price: number
	filePath: string
}

export function ProductCard({ name, description, price, filePath }: IProductCardProps) {
	return (
		<Card withBorder radius="md" p="md" mx="auto" className={classes.card}>
			<Card.Section>
				<Image
					src={`${env.VITE_URL_BUCKET}/${filePath}`}
					alt={name}
					height={180}
					fit="fill"
					fallbackSrc="https://placehold.co/600x400?text=Error 404"
				/>
				<Divider />
			</Card.Section>

			<Card.Section h="100%" className={classes.section} mt="md">
				<Group justify="apart">
					<Text fz="lg" fw={500}>
						{name}
					</Text>
				</Group>

				<Text lineClamp={2} fz="sm" mt="xs">
					{description}
				</Text>
			</Card.Section>

			<Card.Section className={classes.section}>
				<Text mt="md" className={classes.label} c="dimmed">
					<NumberFormatter
						prefix="R$ "
						thousandSeparator="."
						decimalSeparator=","
						value={price.toFixed(2)}
						decimalScale={2}
					/>
				</Text>
			</Card.Section>

			<Group mt="xs">
				<Button radius="md" style={{ flex: 1 }} disabled>
					Edit details
				</Button>
				<ActionIcon variant="default" radius="md" size={36}>
					<IconTrash className={classes.like} stroke={1.5} />
				</ActionIcon>
			</Group>
		</Card>
	)
}
