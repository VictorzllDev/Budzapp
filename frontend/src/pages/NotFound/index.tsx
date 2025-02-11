import { Button, Container, Group, Text, Title } from '@mantine/core'
import { Illustration } from './Illustration'
import classes from './style.module.css'
import { Link } from 'react-router'

export function NotFound() {
	return (
		<Container className={classes.root}>
			<div className={classes.inner}>
				<Illustration className={classes.image} />
				<div className={classes.content}>
					<Title className={classes.title}>Nada para ver aqui</Title>
					<Text c="dimmed" size="lg" ta="center" className={classes.description}>
						Página que você está tentando abrir não existe. Você pode ter elogiado o endereço, ou a página foi movida
						para outro URL. Se você acha que isso é um suporte de contato com erro.{' '}
					</Text>
					<Group justify="center">
						<Link to="/">
							<Button size="md">Voltar para a home</Button>
						</Link>
					</Group>
				</div>
			</div>
		</Container>
	)
}
