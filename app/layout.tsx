import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "./components/Navbar"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SafeSpace AI - Stress Detection Platform",
  description: "Advanced multimodal stress detection using AI technology",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script src="https://cdn.botpress.cloud/webchat/v3.0/inject.js" strategy="beforeInteractive" />
        <Script
          src="https://files.bpcontent.cloud/2025/07/11/16/20250711160316-693TLH0U.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
