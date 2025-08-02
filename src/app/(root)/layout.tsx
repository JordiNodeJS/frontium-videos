import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex h-screen" role="application" aria-label="Aplicación Frontium Videos">
        <aside className="flex-shrink-0" aria-label="Navegación principal">
          <AppSidebar />
        </aside>
        <main className="flex-1 overflow-auto" role="main" aria-label="Contenido principal">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}