import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import { ThemeProvider } from "@/components/theme-provider";
import ReduxProvider from '@/client/providers/redux-provider';
import '@/styles/tailwind.css';
import type { Metadata } from 'next';
import { Roboto_Flex } from 'next/font/google'
import { Footer } from "@/components/layout/footer";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "react-hot-toast";

const roboto_flex = Roboto_Flex({
  weight: '400',
  subsets: ['latin'],
})
export const metadata: Metadata = {
  title: "Looney Bin",
  description: "Looney times here at the bin of games ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
    <head />
      <body className="bg-neutral-n12">
      <NextTopLoader />
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >   
        <ConvexClientProvider>
          <ReduxProvider>     
					  {children}
            <Toaster />
				  </ReduxProvider>
        </ConvexClientProvider>
        </ThemeProvider>
        <Footer>looney bin</Footer>
      </body>
    </html>
  );
}
