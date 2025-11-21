// ✅ No Navbar / No Footer / No Providers
export default function PdfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          background: "#fff",
          color: "#000",
          fontFamily:
            "Inter, Arial, Helvetica, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
