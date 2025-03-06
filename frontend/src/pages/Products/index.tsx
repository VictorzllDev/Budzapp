import { Button, Container, Modal, SimpleGrid, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPlus } from '@tabler/icons-react'
import { PageLoader } from '../../components/PageLoader'
import { ProductCard } from './components/ProductCard'
import { ProductForm } from './components/ProductForm'
import { useGetProducts } from './hooks/useGetProducts'
import classes from './style.module.css'

export function Products() {
	const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(false)
	const { data, isPending, isSuccess } = useGetProducts()

	if (isPending || !isSuccess || !data) return <PageLoader />

	return (
		<>
			<Title order={1}>Produtos</Title>

			<Container pt="xl" px="0">
				<SimpleGrid
					cols={{ base: 1, xs: 2, sm: 1, md: 2, lg: 3 }}
					spacing={{ base: 10, sm: 'xl' }}
					verticalSpacing={{ base: 'md', sm: 'xl' }}
				>
					{data
						.slice(0)
						.reverse()
						.map(({ id, name, description, price, filePath }) => {
							return <ProductCard key={id} name={name} description={description} price={price} filePath={filePath} />
						})}
				</SimpleGrid>
			</Container>

			<Modal opened={openedModal} onClose={closeModal} title="Criar produto">
				<ProductForm onCloseModal={closeModal} />
			</Modal>

			<Button variant="default" onClick={openModal} className={classes.buttonOpenModal}>
				<IconPlus />
			</Button>
		</>
	)
}
