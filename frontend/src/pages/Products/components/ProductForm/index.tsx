import { Button, FileInput, Group, NumberInput, Space, TextInput } from '@mantine/core'
import { useCreateProduct } from '../../hooks/useCreateProduct'
import { useEffect } from 'react'

export interface IProductFormProps {
	onCloseModal: () => void
}

export function ProductForm({ onCloseModal }: IProductFormProps) {
	const { form, mutate, isPending, isSuccess } = useCreateProduct()

	useEffect(() => {
		if (isSuccess) {
			onCloseModal()
		}
	}, [isSuccess, onCloseModal])

	return (
		<form onSubmit={form.onSubmit((values) => mutate(values))}>
			<TextInput
				withAsterisk
				label="Nome do produto"
				maxLength={100}
				key={form.key('name')}
				{...form.getInputProps('name')}
			/>
			<Space h="md" />
			<TextInput
				withAsterisk
				label="Descrição do produto"
				maxLength={255}
				key={form.key('description')}
				{...form.getInputProps('description')}
			/>
			<Space h="md" />
			<Group justify="center" grow>
				<NumberInput
					label="Preço do produto"
					placeholder="R$ 0,00"
					prefix="R$"
					allowNegative={false}
					decimalScale={2}
					fixedDecimalScale
					decimalSeparator=","
					thousandSeparator="."
					min={0}
					clampBehavior="strict"
					key={form.key('price')}
					{...form.getInputProps('price')}
				/>
				<FileInput
					label="Imagem do produto"
					placeholder="Selecione uma imagem"
					multiple={false}
					accept="image/png,image/jpeg,image/jpg"
					clearable
					key={form.key('image')}
					{...form.getInputProps('image')}
				/>
			</Group>
			<Group justify="flex-end" mt="lg">
				<Button type="submit" loading={isPending} w={100}>
					Criar
				</Button>
			</Group>
		</form>
	)
}
