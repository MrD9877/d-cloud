import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import CheckLogin from "@/components/CheckLogin";
import QueryProvider from "@/components/providers/QueryProvider";

export const metadata: Metadata = {
  title: "DCloud",
  description: "A app to store your files",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <SidebarProvider>
            <main>
              <AppSidebar />
              {children}
              <CheckLogin />
              <Toaster />
            </main>
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
