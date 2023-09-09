import './globals.css'
import { Navbar, Footer } from '@/components'

export const metadata: Metadata = {
  title: 'Cat Hub',
  description: 'Discover the best cats in the world',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
