import Script from 'next/script'
import './globals.css'
import { Inter } from 'next/font/google'
import ReactGA from 'react-ga4'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Failcat - Kia Telluride Vin Tracker',
  description: 'A place for desperate kia telluride seekers to find their car',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  ReactGA.initialize('G-DJE0ZYCWJE');
  return (

    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
