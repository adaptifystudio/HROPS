export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full bg-neutral-950 overflow-hidden">
      {children}
    </main>
  );
}
