import AuthProvider from "@/hooks/Auth";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="w-screen h-screen">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
