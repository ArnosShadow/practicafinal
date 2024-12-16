import localFont from "next/font/local";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import "./estilos/global-componentes.css";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Practica Final",
  description: "Practica Final de WEB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      
      <div className="flex flex-col w-full lg:flex-row bg-gray-100 h-full">
        <div className="w-full lg:max-w-[15rem] bg-gray-800 text-white lg:static top-0">
          <Navbar />
        </div>
        {children}
      </div>
      <Footer></Footer>
      </body>
    </html>
  );
}
