import type { Metadata } from "next";
import { Nunito } from 'next/font/google' 
import { ClientOnly } from "./components/ClientOnly";
import "./globals.css";

// custom components
import { Navbar } from "./components/navbar/Navbar";
import { RegisterModal } from "./components/modals/RegisterModal";
import { LogInModal } from "./components/modals/LogInModal";
import { RentModal } from "./components/modals/RentModal";
import { ToastProvider } from "./providers/ToastProvider";
import getCurrentUser from "./actions/getCurrentUser";

const font = Nunito({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToastProvider />
          <RentModal />
          <LogInModal />
          <RegisterModal />
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        { children }
      </body>
    </html>
  );
}
