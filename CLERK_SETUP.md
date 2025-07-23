# 🚀 Configuración Rápida de Clerk

## Pasos para Configurar Autenticación

### 1. Crear Cuenta en Clerk
1. Ve a [https://clerk.com](https://clerk.com)
2. Crea una cuenta gratuita
3. Crea una nueva aplicación

### 2. Configurar Variables de Entorno
1. Copia `.env.example` a `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. En el Dashboard de Clerk, ve a **API Keys**
3. Copia las claves y reemplaza en `.env.local`:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_tu_clave_aqui
   CLERK_SECRET_KEY=sk_test_tu_clave_secreta_aqui
   ```

### 3. Configurar Dominios Permitidos
En el Dashboard de Clerk:
1. Ve a **Domains**
2. Agrega estos dominios:
   - `http://localhost:3000` (desarrollo)
   - Tu dominio de producción

### 4. Configurar Proveedores de Autenticación (Opcional)
1. Ve a **User & Authentication > Social Connections**
2. Habilita los proveedores que desees:
   - Google
   - GitHub
   - Discord
   - Facebook
   - etc.

### 5. Personalizar Emails (Opcional)
1. Ve a **Messaging > Email Templates**
2. Personaliza los templates de:
   - Verificación de email
   - Invitaciones
   - Recuperación de contraseña

### 6. Probar la Implementación
1. Inicia el servidor:
   ```bash
   pnpm dev
   ```

2. Visita estas URLs:
   - `http://localhost:3000/sign-in` - Iniciar sesión
   - `http://localhost:3000/sign-up` - Registrarse
   - `http://localhost:3000/dashboard` - Página protegida
   - `http://localhost:3000/demo/auth` - Demo interactivo

## 🎯 URLs Importantes

### Desarrollo
- **App:** http://localhost:3000
- **Demo:** http://localhost:3000/demo/auth
- **Sign In:** http://localhost:3000/sign-in
- **Sign Up:** http://localhost:3000/sign-up
- **Dashboard:** http://localhost:3000/dashboard

### Clerk Dashboard
- **Dashboard:** https://dashboard.clerk.com/
- **Documentación:** https://clerk.com/docs

## 📋 Checklist de Configuración

- [ ] Cuenta de Clerk creada
- [ ] Aplicación creada en Clerk
- [ ] Variables de entorno configuradas en `.env.local`
- [ ] Dominios agregados en Clerk Dashboard
- [ ] Servidor de desarrollo funcionando
- [ ] Rutas de autenticación probadas
- [ ] Demo interactivo visitado

## 🔧 Comandos Útiles

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Construir para producción
pnpm build

# Iniciar servidor de producción
pnpm start
```

## 📚 Recursos Adicionales

- **Guía Completa:** `docs/guides/clerk-authentication-guide.md`
- **Componentes:** `src/components/auth/README.md`
- **Reglas del Proyecto:** `.github/prompts/nextjs15-coding.prompt.md`
- **Documentación de Clerk:** https://clerk.com/docs/quickstarts/nextjs

## 🆘 Troubleshooting

### Error: "Missing publishable key"
- Verifica que `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` esté en `.env.local`
- Reinicia el servidor después de agregar variables de entorno

### Error: "Clerk: Invalid publishable key"
- Verifica que la clave sea correcta en el Dashboard de Clerk
- Asegúrate de usar la clave del entorno correcto (test/production)

### Redirección infinita
- Verifica que las rutas de auth no estén en `isProtectedRoute` del middleware
- Revisa las URLs de redirección en las variables de entorno

### Estilos no se aplican
- Asegúrate de que Tailwind procese las clases de Clerk
- Verifica que `./node_modules/@clerk/nextjs/**/*.js` esté en `tailwind.config.js`

---

¿Necesitas ayuda? Visita el demo interactivo en `/demo/auth` o consulta la documentación completa.
