'use client'

import { Button } from "@/components/ui/button";

export default function SubscribeButton() {
  const handleSubscribe = () => {
    console.log("Suscripción iniciada");
    // Aquí puedes añadir lógica de suscripción, abrir modal, etc.
    alert("¡Gracias por suscribirte al Plan Pro!");
  };

  return (
    <Button onClick={handleSubscribe} className="w-full">
      Comenzar ahora
    </Button>
  );
}