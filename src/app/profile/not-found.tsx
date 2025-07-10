import Link from "next/link"

function NotFount() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">404 - Página no encontrada</h1>
        <p className="text-lg">La página que estás buscando no existe.</p>
        <Link href="/" className="text-blue-500 hover:text-blue-700">Volver al inicio</Link>
    </div>
  )
}

export default NotFount