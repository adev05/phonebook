import type { Metadata } from 'next'
import './globals.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['cyrillic', 'latin'], weight: '400' })

export const metadata: Metadata = {
	title: 'Phone Book',
	description: 'Phone Book Mai',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${montserrat.className} antialiased`}>{children}</body>
		</html>
	)
}
