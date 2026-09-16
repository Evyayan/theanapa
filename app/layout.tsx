import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "The Anapa — Medius & Verax",
  description:
    "Independent, source-first journalism from The Anapa."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">

      <body>

        <Header />

        {children}

      </body>

    </html>
  );
}
