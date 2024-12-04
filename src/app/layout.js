import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../providers/AuthProvider'
import { Navbar } from '@/components/ui/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BeFit - Your Fitness Journey Starts Here',
  description: 'Track your fitness journey, get personalized meal plans, and achieve your health goals with BeFit.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
