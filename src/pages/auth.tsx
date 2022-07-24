import { getProviders, signIn } from 'next-auth/react'

const Auth = ({ providers }) => {
	return Object.values(providers).map((provider) => (
		<button key={provider.name} onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
			Login with {provider.name}
		</button>
	))
}

export default Auth

export async function getServerSideProps() {
	const providers = await getProviders()

	return {
		props: {
			providers,
		},
	}
}
