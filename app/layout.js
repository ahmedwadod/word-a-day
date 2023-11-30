import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Nav from '@/components/Nav'
import Provider from '@/components/Provider'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Word a Day',
	description: "Share your thoughts on today's word",
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Provider>
					<main className='min-h-screen min-w-full bg-rose-400 bg-opacity-20'>
						<Nav />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	)
}
