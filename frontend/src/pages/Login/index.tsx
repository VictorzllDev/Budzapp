import {
	Anchor,
	Button,
	Checkbox,
	Container,
	Group,
	Paper,
	PasswordInput,
	Text,
	TextInput,
	Title,
} from '@mantine/core'
import classes from './style.module.css'
import { useForm } from '@mantine/form'
import { handleApiErrorUtil } from '../../utils/error-handler.util'
import { loginAuth } from '../../services/auth.service'

export function Login() {
	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			email: '',
			password: '',
			termsOfService: false,
		},
		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email inválido'),
		},
	})

	const handleLogin = async ({
		email,
		password,
	}: {
		email: string
		password: string
		termsOfService: boolean
	}) => {
		try {
			const { token } = await loginAuth({ email, password })

			sessionStorage.removeItem('token')
			sessionStorage.setItem('token', token)
		} catch (error) {
			console.error(handleApiErrorUtil(error))
		}
	}

	return (
		<Container size={420} my={40}>
			<Title ta="center" className={classes.title}>
				Bem vindo de volta!
			</Title>
			<Text c="dimmed" size="sm" ta="center" mt={5}>
				Ainda não tem uma conta?{' '}
				<Anchor size="sm" component="button">
					Criar uma conta
				</Anchor>
			</Text>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<form onSubmit={form.onSubmit((values) => handleLogin(values))}>
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
					<Group justify="space-between" mt="lg">
						<Checkbox
							label="Lembrar"
							key={form.key('termsOfService')}
							{...form.getInputProps('termsOfService', { type: 'checkbox' })}
						/>
						<Anchor component="button" size="sm">
							esqueceu sua senha?
						</Anchor>
					</Group>
					<Button fullWidth mt="xl" type="submit">
						Entrar
					</Button>
				</form>
			</Paper>
		</Container>
	)
}
