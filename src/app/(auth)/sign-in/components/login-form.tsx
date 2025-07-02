'use client'

import { useState, FormEvent, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Simular autenticación
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // En un caso real, aquí se llamaría a la API de autenticación
      console.log('Intentando iniciar sesión con:', formData);
      
      if (formData.email === 'demo@example.com' && formData.password === 'password') {
        // Éxito - redirigir o cambiar estado
        console.log('Inicio de sesión exitoso');
        alert('Inicio de sesión exitoso');
      } else {
        // Fallo de autenticación
        setError('Las credenciales no son válidas. Prueba con demo@example.com / password');
      }
    } catch (err) {
      setError('Se produjo un error al intentar iniciar sesión');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium">
          Contraseña
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      {error && (
        <div className="bg-red-50 p-3 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      
      <div className="flex items-center justify-between pt-2">
        <a href="#" className="text-sm text-blue-600 hover:underline">
          ¿Olvidaste tu contraseña?
        </a>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </div>
    </form>
  );
}