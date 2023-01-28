import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<RecoilRoot>
				<ThemeProvider attribute="class" defaultTheme="dark">
					<Component {...pageProps} />
				</ThemeProvider>
			</RecoilRoot>
		</SessionProvider>
	);
}
