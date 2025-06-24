"use client";

import { useTheme } from "next-themes";
import { Toaster as SonnerToaster, ToasterProps } from "sonner";

const CustomToaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <SonnerToaster
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      closeButton={false} // 👈 ADD THIS LINE TO OVERRIDE DEFAULT
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      style={
        {
          "--toast-bg": "var(--background)",
          "--toast-color": "var(--foreground)",
          "--toast-border": "var(--border)",
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          border: "1px solid var(--border)",
          borderRadius: "0.5rem",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        } as React.CSSProperties
      }
      {...props} 
    />
  );
};

export { CustomToaster as Toaster };
