import './globals.css';
import {Inter} from 'next/font/google';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BAGGER",
  description: "De website van Studenten Dispuut Voor Alle Studies Maar Vooral Voor Informatie en Communicatie Technologische Soorten Studies BAGGER",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
