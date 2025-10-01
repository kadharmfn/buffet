import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@buffet/core"
import { BuffetRouterProvider } from "@buffet/core"
import { SharedStateProvider } from "@buffet/core"
import { ThemeProvider } from "@buffet/shared-ui"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Buffet - Microfront-end Architecture",
  description: "A delightful microfront-end architecture framework for Next.js",
  generator: "Buffet v1.0.0",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider>
          <AuthProvider>
            <SharedStateProvider>
              <Suspense fallback={null}>
                <BuffetRouterProvider>{children}</BuffetRouterProvider>
              </Suspense>
            </SharedStateProvider>
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
