import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kallyan Shop',
  description: 'An ecommerce site created with React and Tailwind CSS',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
