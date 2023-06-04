import { Metadata } from 'next'
import './globals.css'
import Navbar from '@mi/app/components/navbar'
import Footer from '@mi/app/components/footer'
import { Poppins, Roboto_Mono } from 'next/font/google'
import ReactQueryProvider from '@mi/app/react-query-provider'
import Toaster from '@mi/app/components/toaster'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: '400',
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export const metadata: Metadata = {
  title: 'Madrasah Islamiyah Purwojati',
  description: 'Madrasah Islamiyah',
  icons: '/images/logo.png',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={`${poppins.variable} ${roboto_mono.variable}`}>
      <body className={`h-full`} id='#top'>
        <ReactQueryProvider>
          <Navbar />
          <div className='mt-14 min-h-full xl:mt-16'>{children}</div>
          <Footer />
        </ReactQueryProvider>
        <Toaster position='bottom-center' />
      </body>
    </html>
  )
}
