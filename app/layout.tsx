import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'How to Build Your Own App in 5 Minutes',
  description: 'An animated explainer video with AI voiceover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
