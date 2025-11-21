// ✅ Isolated layout for all PDF routes
export default function PdfIsolatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        style={{
          background: "#fff",
          color: "#000",
          margin: 0,
          fontFamily: "Inter, Arial, Helvetica, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
