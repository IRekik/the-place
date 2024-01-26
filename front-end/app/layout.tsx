import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Footer from '@/components/home/Footer'

import '../styles/globals.css'
import Navbar from '@/components/home/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Blog',
    description: 'A general blog to post and interact',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <main className='relative overflow-hidden'>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
