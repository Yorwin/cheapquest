import React from "react";

/* Global Styles */
import "@/app/globals.scss";

/* Fonts */
import { gontSerrat, timeLess } from "@/lib/fonts";

/* Bootstrap */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

/* Layout */
import Header from "@/layout/header/header"
import Footer from "@/layout/footer/footer"

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${gontSerrat.variable} ${timeLess.variable}`}>
        <header className="header">
          <Header />
        </header>
        <main className="contenedor-principal">
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;