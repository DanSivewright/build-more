import { Toaster } from '@/components/ui/toaster'
import { createPage } from '@/lib/create-page'
import { LivePreviewListener } from '@/components/live-preview-listener'
import { ThemeProvider } from '@/components/providers/theme-provider'

import { Unbounded } from 'next/font/google'

import './globals.css'
import { draftMode } from 'next/headers'
import { AdminBar } from '@/components/admin-bar'
import { mergeOpenGraph } from '@/lib/merge-open-graph'
import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/tailwind-indicator'

const unbounded = Unbounded({
  subsets: ['latin'],
  variable: '--font-unbounded',
})

const { Page, generateMetaData } = createPage({
  metadata: async () => {
    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL as string),
      openGraph: mergeOpenGraph(),
      twitter: {
        card: 'summary_large_image',
        creator: '@ItsDaaaaniel',
      },
    }
  },
  component: ({ children }) => {
    const { isEnabled } = draftMode()
    return (
      <html className={cn(unbounded.variable, 'font-sans')} suppressHydrationWarning lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="relative flex flex-col min-h-screen">
              <AdminBar
                adminBarProps={{
                  preview: isEnabled,
                }}
              />
              {children}
              <TailwindIndicator />
              <Toaster />
              <LivePreviewListener />
            </main>
          </ThemeProvider>
        </body>
      </html>
    )
  },
})

export { generateMetaData }

export default Page

// import type { Metadata } from 'next'

// import { cn } from 'src/utilities/cn'
// import { GeistMono } from 'geist/font/mono'
// import { GeistSans } from 'geist/font/sans'
// import React from 'react'

// import { AdminBar } from '@/components/admin-bar'
// import { Footer } from '@/footer'
// import { Header } from '@/header'
// import { LivePreviewListener } from '@/components/live-preview-listener'
// import { Providers } from '@/providers'
// import { mergeOpenGraph } from '@/utilities/merge-open-graph'
// import './globals.css'
// import { draftMode } from 'next/headers'

// export default async function RootLayout({ children }: { children: React.ReactNode }) {
//   const { isEnabled } = draftMode()

//   return (
//     <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
//       <head>
//         <InitTheme />
//         <link href="/favicon.ico" rel="icon" sizes="32x32" />
//         <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
//       </head>
//       <body>
//         <Providers>
//           <AdminBar
//             adminBarProps={{
//               preview: isEnabled,
//             }}
//           />
//           <LivePreviewListener />

//           <Header />
//           {children}
//           <Footer />
//         </Providers>
//       </body>
//     </html>
//   )
// }

// export const metadata: Metadata = {
//   metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
//   openGraph: mergeOpenGraph(),
//   twitter: {
//     card: 'summary_large_image',
//     creator: '@payloadcms',
//   },
// }
