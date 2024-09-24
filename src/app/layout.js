import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SHAIKH UNITED GROUP",
  description: "Shine like a star",
  icons: "./favicon.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <Providers>
          {" "}
          <ToastContainer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
