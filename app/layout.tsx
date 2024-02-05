import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import { ThemeProvider } from "@/components/theme-provider";
import ReduxProvider from '@/client/providers/redux-provider';
import '@/styles/main.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Footer } from "@/components/layout/footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Looney Bin",
  description: "Crazy games for you",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
    <head />
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >   
        <ConvexClientProvider>
          <ReduxProvider>     
					  {children}
				  </ReduxProvider>
        </ConvexClientProvider>
        </ThemeProvider>
        <Footer>Lonely Bin Footer copyright!</Footer>
      </body>
    </html>
  );
}
