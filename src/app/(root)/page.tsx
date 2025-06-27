import SubscribeButton from "@/components/root/subscribe-button";

export default function Home() {
  return (
    <div>
      <div className="max-w-sm mx-auto my-20 rounded-xl shadow-lg border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-bold mb-2">Pro Plan</h2>
        <p className="text-4xl font-extrabold mb-2">$19<span className="text-base font-medium">/mes</span></p>
        <ul className="mb-4 space-y-1 text-gray-700">
          <li>✔️ Acceso ilimitado a videos</li>
          <li>✔️ Descargas sin conexión</li>
          <li>✔️ Soporte prioritario</li>
        </ul>
        <SubscribeButton />
      </div>
    </div>
  );
}
