import "./globals.css";

export const metadata = {
  title: "IMSS NSS",
  description: "Automatizador personal de NSS"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
