import { Geist_Mono, Outfit } from "next/font/google"

import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { SmoothScrollProvider } from "@/components/molecules/SmoothScroll"
import { Navbar } from "@/components/organisms/Navbar"
import { Metadata } from "next"
import { ScrollToTop } from "@/components/molecules/ScrollToTop"
import { Footer } from "@/components/organisms/Footer"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Siloam Raniban Church",
  description: "A place of worship, community, and grace.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        outfit.variable
      )}
    >
      <body>
        <ThemeProvider>
          <Navbar />
          <SmoothScrollProvider>
            {children}
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
