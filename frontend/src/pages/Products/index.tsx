import { Title, SimpleGrid, Button, Modal, TextInput, NumberInput, FileInput, Grid } from '@mantine/core'
import { BadgeCard } from '../../components/BadgeCard'
import { useDisclosure } from '@mantine/hooks'
import classes from './style.module.css'
import { IconPlus } from '@tabler/icons-react'

export function Products() {
	const [opened, { open, close }] = useDisclosure(false)

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
				<form onSubmit={() => ''}>
					<TextInput label="Nome do Produto" placeholder="Gesso 40kg" required />
					<TextInput label="Descrição do Produto" placeholder="Gesso Facil de revistimento de 40kg." required />
					<Grid>
						<Grid.Col span="auto">
							<NumberInput
								label="Valor do Produto"
								placeholder="R$ 27,00"
								prefix="R$"
								decimalSeparator=","
								decimalScale={2}
								defaultValue={0}
								mb="md"
								required
							/>
						</Grid.Col>
						<Grid.Col span={'content'}>
							<FileInput
								accept="image/png,image/jpeg,image/jpg"
								multiple={false}
								label="Image do Produto"
								placeholder="Escolha uma imagem"
							/>
						</Grid.Col>
					</Grid>
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
