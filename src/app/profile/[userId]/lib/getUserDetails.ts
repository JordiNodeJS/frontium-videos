import { getUserById, User } from "@/mocks/data/users";

export async function getUserDetails(userId: string): Promise<User | null> {
  try {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Obtener usuario por ID
    const user = getUserById(userId);
    
    return user;
  } catch (error) {
    console.error('Error al obtener detalles del usuario:', error);
    return null;
  }
} 