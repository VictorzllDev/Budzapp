import { Button, Modal, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPlus } from '@tabler/icons-react'
import { ProductForm } from './components/ProductForm'
import classes from './style.module.css'

export function Products() {
	const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(false)

	return (
		<>
			<Title order={1}>Produtos</Title>

			<Modal opened={openedModal} onClose={closeModal} title="Criar produto">
				<ProductForm onCloseModal={closeModal} />
			</Modal>

			<Button variant="default" onClick={openModal} className={classes.buttonOpenModal}>
				<IconPlus />
			</Button>
		</>
	)
}
