import Link from "next/link";
import Image from "next/image";
import { getAllUsers, User } from "@/mocks/data/users";

export const metadata = {
  title: "Perfiles de Usuarios | Frontium Videos",
  description: "Explora los perfiles de la comunidad de Frontium Videos.",
};

export default async function ProfilesPage() {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const users = getAllUsers();

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long'
    });
  };

  const getPlanBadge = (plan: string) => {
    const badges = {
      free: { text: 'Gratuito', color: 'bg-gray-100 text-gray-800' },
      premium: { text: 'Premium', color: 'bg-blue-100 text-blue-800' },
      pro: { text: 'Pro', color: 'bg-purple-100 text-purple-800' }
    };
    return badges[plan as keyof typeof badges] || badges.free;
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Comunidad Frontium
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Conoce a los miembros de nuestra comunidad de aprendizaje y 
          descubre sus logros y progreso.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {users.length}
          </div>
          <div className="text-gray-600">Miembros</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {users.reduce((total: number, user: User) => total + user.stats.coursesCompleted, 0)}
          </div>
          <div className="text-gray-600">Cursos Completados</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {Math.round(users.reduce((total: number, user: User) => total + user.stats.totalWatchTime, 0) / 60)}h
          </div>
          <div className="text-gray-600">Horas Estudiadas</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">
            {users.reduce((total: number, user: User) => total + user.achievements.length, 0)}
          </div>
          <div className="text-gray-600">Logros Desbloqueados</div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user: User) => {
          const badge = getPlanBadge(user.subscription.plan);
          
          return (
            <Link
              key={user.id}
              href={`/profile/${user.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                {/* Avatar and Badge */}
                <div className="relative mb-4">
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    <Image
                      src={user.avatar}
                      alt={`Avatar de ${user.fullName}`}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex justify-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                      {badge.text}
                    </span>
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center mb-4">
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                    {user.fullName}
                  </h3>
                  <p className="text-gray-600 text-sm">@{user.username}</p>
                  
                  {user.bio && (
                    <p className="text-gray-500 text-xs mt-2 line-clamp-2">
                      {user.bio}
                    </p>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 text-center text-sm">
                  <div>
                    <div className="font-bold text-blue-600">
                      {user.stats.coursesCompleted}
                    </div>
                    <div className="text-gray-600 text-xs">Completados</div>
                  </div>
                  <div>
                    <div className="font-bold text-green-600">
                      {user.stats.coursesInProgress}
                    </div>
                    <div className="text-gray-600 text-xs">En progreso</div>
                  </div>
                </div>

                {/* Join Date */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 text-center">
                    Miembro desde {formatJoinDate(user.joinedDate)}
                  </p>
                </div>

                {/* Achievements Preview */}
                {user.achievements.length > 0 && (
                  <div className="mt-3 flex justify-center space-x-1">
                    {user.achievements.slice(0, 3).map((achievement) => (
                      <div
                        key={achievement.id}
                        className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center"
                        title={achievement.title}
                      >
                        <span className="text-xs">{achievement.icon}</span>
                      </div>
                    ))}
                    {user.achievements.length > 3 && (
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-xs text-gray-600">+{user.achievements.length - 3}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            ¿Quieres unirte a nuestra comunidad?
          </h2>
          <p className="text-blue-100 mb-6">
            Empieza tu viaje de aprendizaje y conéctate con otros estudiantes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-blue-600 transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors"
            >
              Explorar Cursos
            </Link>
          </div>
        </div>
      </div>

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
