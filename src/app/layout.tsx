import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import CheckLogin from "@/components/CheckLogin";
import QueryProvider from "@/components/providers/QueryProvider";
import StoreProvider from "@/components/providers/StoreProvider";
import { SessionProvider } from "@/components/providers/SessionProvider";

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
        <SessionProvider>
          <StoreProvider>
            <QueryProvider>
              <main className="w-screen">
                <SidebarProvider>
                  <AppSidebar />
                  {children}
                  <CheckLogin />
                  <Toaster />
                </SidebarProvider>
              </main>
            </QueryProvider>
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
