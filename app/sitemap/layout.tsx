import '../globals.css';
import {Inter} from 'next/font/google';

const inter = Inter({ subsets: ["latin"], fallback: ['sans-serif'] });

export const metadata = {
  title: "Index",
  description: "Een overzicht van de beschikbare paginas",
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
