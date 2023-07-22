import '../globals.css';
import {Inter} from 'next/font/google';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Turflijst",
  description: "Hier kun je bijhouden wat je besteld hebt!",
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
