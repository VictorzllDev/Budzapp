import {
	ActionIcon,
	Button,
	Card,
	Divider,
	Group,
	Image,
	Modal,
	NumberFormatter,
	Text,
	useModalsStack,
} from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { PageLoader } from '../../../../components/PageLoader'
import { env } from '../../../../env'
import { useDeleteProduct } from '../../hooks/useDeleteProduct'
import classes from './style.module.css'

export interface IProductCardProps {
	id: string
	name: string
	description: string
	price: number
	filePath: string
}

export function ProductCard({ id, name, description, price, filePath }: IProductCardProps) {
	const [isImageLoading, setIsImageLoading] = useState(true)
	const [hasError, setHasError] = useState(false)

	const { mutate, isPending } = useDeleteProduct()

	const stack = useModalsStack(['delete-product'])

	return (
		<>
			<Card withBorder radius="md" p="md" mx="auto" className={classes.card}>
				<Card.Section>
					{isImageLoading && !hasError && (
						<div
							style={{
								height: 180,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<PageLoader />
						</div>
					)}

					<Image
						src={`${env.VITE_URL_BUCKET}/${filePath}`}
						alt={name}
						height={180}
						fit="cover"
						fallbackSrc="https://placehold.co/600x400?text=Error 404"
						onLoad={() => setIsImageLoading(false)}
						onError={() => {
							setIsImageLoading(false)
							setHasError(true)
						}}
						style={{ display: isImageLoading ? 'none' : 'block' }}
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
					<ActionIcon
						onClick={() => stack.open('delete-product')}
						disabled={isPending}
						variant="default"
						radius="md"
						size={36}
					>
						<IconTrash className={classes.like} stroke={1.5} />
					</ActionIcon>
				</Group>
			</Card>

			<Modal.Stack>
				<Modal {...stack.register('delete-product')} title="Excluir este produto?">
					Tem certeza de que deseja excluir este produto? Esta ação não pode ser desfeita.
					<Group mt="lg" justify="flex-end">
						<Button onClick={stack.closeAll} variant="default">
							Cancelar
						</Button>
						<Button onClick={() => mutate(id)} loading={isPending} color="red">
							Deletar
						</Button>
					</Group>
				</Modal>
			</Modal.Stack>
		</>
	)
}
