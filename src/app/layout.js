import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import { MatchProvider } from "./context/MatchContext";
import { ModalProvider } from "./context/ModalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tournament Tracker",
  description: "Keep track of your matches!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script src="https://kit.fontawesome.com/09c2dac4bc.js" crossOrigin="anonymous" />
      <body className={inter.className}>
        <ModalProvider>
          <MatchProvider>
            {children}
          </MatchProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
