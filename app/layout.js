import { Inter } from 'next/font/google'
import '@styles/globals.css'
import Nav from '@components/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Word a Day',
	description: "Share your thoughts based on today's word",
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<main className='min-h-screen min-w-full bg-rose-400 bg-opacity-20'>
					<Nav />
					{children}
				</main>
			</body>
		</html>
	)
}
