import { Button, FileInput, Flex, Grid, Modal, NumberInput, SimpleGrid, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { IconPlus } from '@tabler/icons-react'
import { BadgeCard } from '../../components/BadgeCard'
import { createProduct, type ICreateProduct } from '../../services/product.service'
import { handleApiErrorUtil } from '../../utils/error-handler.util'
import classes from './style.module.css'

export function Products() {
	const [opened, { open, close }] = useDisclosure(false)

	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			name: '',
			description: '',
			price: 0,
			image: new File([], ''),
		},

		validate: {
			name: (value) => (value.length > 0 ? null : 'Campo obrigatorio'),
			description: (value) => (value.length > 0 ? null : 'Campo obrigatorio'),
			price: (value) => (value > 0 ? null : 'Campo obrigatorio'),
			image: (value) => (value ? null : 'Campo obrigatorio'),
		},
	})

	const handleCreateProduct = async ({ name, description, price, image }: ICreateProduct) => {
		try {
			await createProduct({ name, description, price, image })

			notifications.show({
				message: 'Product criada com sucesso!',
				color: 'green',
			})
		} catch (error) {
			handleApiErrorUtil(error)
		} finally {
			form.reset()
		}
	}

	return (
		<>
			<Title order={1} mb="md">
				Produtos
			</Title>
			<SimpleGrid
				cols={{ base: 1, xs: 2, lg: 3 }}
				spacing={{ base: 10, sm: 'xl' }}
				verticalSpacing={{ base: 'md', sm: 'xl' }}
			>
				<BadgeCard />
				<BadgeCard />
				<BadgeCard />
				<BadgeCard />
				<BadgeCard />
				<BadgeCard />
				<BadgeCard />
			</SimpleGrid>
			<Modal opened={opened} onClose={close} title="Adicionar um novo produto">
				<form onSubmit={form.onSubmit(handleCreateProduct)}>
					<Flex direction="column" gap="md">
						<TextInput
							label="Nome do Produto"
							placeholder="Gesso 40kg"
							key={form.key('name')}
							{...form.getInputProps('name')}
						/>
						<TextInput
							label="Descrição do Produto"
							placeholder="Gesso Facil de revistimento de 40kg."
							key={form.key('description')}
							{...form.getInputProps('description')}
						/>
						<Grid>
							<Grid.Col span="auto">
								<NumberInput
									label="Valor do Produto"
									placeholder="R$ 27,00"
									prefix="R$"
									decimalSeparator=","
									decimalScale={2}
									defaultValue={0}
									min={0}
									mb="md"
									key={form.key('price')}
									{...form.getInputProps('price')}
								/>
							</Grid.Col>
							<Grid.Col span="auto">
								<FileInput
									accept="image/png,image/jpeg,image/jpg"
									multiple={false}
									label="Image do Produto"
									placeholder="Escolha uma imagem"
									key={form.key('image')}
									{...form.getInputProps('image')}
								/>
							</Grid.Col>
						</Grid>
					</Flex>
					<Button fullWidth mt="xl" type="submit">
						Criar
					</Button>
				</form>
			</Modal>
			<Button variant="default" onClick={open} className={classes.buttonOpenModal}>
				<IconPlus size={24} />
			</Button>
		</>
	)
}
