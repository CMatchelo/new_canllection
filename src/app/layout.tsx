import { AuthProvider } from "../context/AuthContext";
import { CanCollectionProvider } from "../context/CollectionContext";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CanCollectionProvider>{children}</CanCollectionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
