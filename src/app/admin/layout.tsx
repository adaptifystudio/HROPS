
import React from "react";
import 'react-quill/dist/quill.snow.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      
      {children}
    </div>
  );
}
