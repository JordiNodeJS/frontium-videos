import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getUserDetails } from "./lib/getUserDetails";
import { ProfileProvider } from "./context/ProfileContext";
import { ProfileInfoSkeleton } from "./components/profile-info-skeleton";
import { ProfileActivitySkeleton } from "./components/profile-activity-skeleton";
import ProfileInfo from "./components/ProfileInfo";
import ProfileActivity from "./components/ProfileActivity";

export const metadata = {
  title: "Perfil de Usuario | Frontium Videos",
  description: "Perfil del usuario con información personal, progreso y logros.",
};

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  
  // Validación única a nivel de página
  const user = await getUserDetails(userId);

  if (!user) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Link
          href="/profile"
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Volver a perfiles
        </Link>
      </div>

      {/* 
        👤 PATRÓN: Context Provider Wrapping
        
        El ProfileProvider envuelve solo los componentes que necesitan
        acceso a los datos del usuario. Esto es una best practice porque:
        
        1. ✅ Scope limitado: Solo los componentes que realmente necesitan 
           los datos tienen acceso a ellos
        2. ✅ Performance: Re-renders se limitan al árbol del Provider
        3. ✅ Claridad: Es evidente qué componentes dependen del contexto
      */}
      <ProfileProvider user={user}>
        <Suspense fallback={<ProfileInfoSkeleton />}>
          <ProfileInfo />
        </Suspense>

        <Suspense fallback={<ProfileActivitySkeleton />}>
          <ProfileActivity />
        </Suspense>
      </ProfileProvider>

      <footer className="mt-16 pt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <div className="mb-4 md:mb-0">
            © {new Date().getFullYear()} Frontium Videos. By PETRONINI.
          </div>
          <div className="flex space-x-4">
            <Link href="/terms" className="hover:text-blue-600">
              Términos de uso
            </Link>
            <Link href="/privacy" className="hover:text-blue-600">
              Política de privacidad
            </Link>
            <Link href="/contact" className="hover:text-blue-600">
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
