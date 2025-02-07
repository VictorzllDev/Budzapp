import {
	Anchor,
	Button,
	Container,
	Paper,
	PasswordInput,
	Text,
	TextInput,
	Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { Link, useNavigate } from 'react-router'
import { registerAuth } from '../../services/auth.service'
import { handleApiErrorUtil } from '../../utils/error-handler.util'
import classes from './style.module.css'

export function Register() {
	const navigate = useNavigate()

	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			email: '',
			password: '',
		},

		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email inválido'),
			password: (value) =>
				value.length >= 6 && value.length <= 20 ? null : 'Senha inválida',
		},
	})

	const handleSubmit = async ({
		email,
		password,
	}: { email: string; password: string }) => {
		try {
			await registerAuth({ email, password })

			navigate('/login')

			notifications.show({
				message: 'Conta criada com sucesso!',
				color: 'green',
			})
		} catch (error) {
			handleApiErrorUtil(error)
		}
	}

	return (
		<Container size={420} my={40}>
			<Title ta="center" className={classes.title}>
				Crie sua conta
			</Title>
			<Text c="dimmed" size="sm" ta="center" mt={5}>
				Já tem uma conta?{' '}
				<Anchor size="sm" component="button">
					<Link to="/login">Login</Link>
				</Anchor>
			</Text>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
					<TextInput
						label="Email"
						placeholder="you@example.com"
						required
						key={form.key('email')}
						{...form.getInputProps('email')}
					/>
					<PasswordInput
						label="Senha"
						placeholder="******"
						required
						mt="md"
						key={form.key('password')}
						{...form.getInputProps('password')}
					/>
					<Button fullWidth mt="xl" type="submit">
						Criar
					</Button>
				</form>
			</Paper>
		</Container>
	)
}
