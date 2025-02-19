import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "./components";
import { Footer } from "./sections";
import { Providers } from "./provider/provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nike Shop",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       
        
        <Providers>
        <Nav/>
        {children}
        </Providers>
        <section className=' bg-black padding-x padding-t pb-8'>
        <Footer />
      </section>
      </body>
     
    </html>
  );
}
