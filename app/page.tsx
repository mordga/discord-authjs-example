'use client';

import { useState, useEffect } from 'react';
import { signIn } from "next-auth/react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(10); // ← Cambia este número según quieras (segundos)
  const [canVerify, setCanVerify] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanVerify(true);
    }
  }, [timeLeft]);

  return (
    <div className="min-h-screen bg-[#36393f] flex flex-col items-center justify-center p-6 text-white">
      
      {/* Imagen arriba */}
      <div className="mb-10">
        <img 
          src=https://www.google.com/imgres?q=fotos%20de%20animales%20gatos%20random%20pinterest&imgurl=https%3A%2F%2Fi.pinimg.com%2F236x%2Fc6%2F26%2F8f%2Fc6268f6ea32c231f9f1134ee3821dc2b.jpg&imgrefurl=https%3A%2F%2Fes.pinterest.com%2Fideas%2Fimagenes-random-gatos%2F900904094393%2F&docid=67AIczHGDLnfvM&tbnid=rnP5wQY6kjjCsM&vet=12ahUKEwiUuYDi89uTAxVUPbkGHdtxHWgQnPAOegQISRAB..i&w=236&h=341&hcb=2&ved=2ahUKEwiUuYDi89uTAxVUPbkGHdtxHWgQnPAOegQISRAB 
          alt="Logo de tu servidor"
          className="w-56 h-56 object-contain rounded-3xl shadow-2xl"
        />
      </div>

      {/* Título y texto */}
      <h1 className="CNZ DUCALE">
        Verificación del Servidor
      </h1>
      
      <p className="text-xl text-gray-300 text-center max-w-md mb-8">
        Inicia sesión con Discord para desbloquear <span className="text-white">todos los canales</span> ocultos
      </p>

      {/* Reglas (obligatorio leer) */}
      <div className="max-w-md w-full bg-[#2f3136] p-6 rounded-2xl mb-10 text-sm text-gray-300 border border-gray-600">
        <p className="font-semibold text-white mb-3">📜 Unicas 6 reglas:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>No spam ni flood</li>
          <li>Respeta a los demás miembros</li>
          <li>No compartir contenido NSFW</li>
          <li>No hacer publicidad sin permiso</li>
          <li>Usa los canales correctamente</li>
          {/* Agrega aquí todas las reglas que quieras */}
        </ul>
        <p className="mt-3 text-xs text-gray-400">
        Lo q sucede en CNZ DUCALE se queda en CNZ DUCALE
        </p>
        <p className="mt-4 text-xs text-gray-400">
          Al verificar aceptas automáticamente estas reglas.
        </p>
      </div>

      {/* Botón con tiempo de espera */}
      <button
        onClick={() => canVerify && signIn("discord")}
        disabled={!canVerify}
        className={`w-full max-w-xs font-semibold text-xl py-5 px-10 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 ${
          canVerify 
            ? 'bg-[#5865F2] hover:bg-[#4752C4] text-white' 
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
      >
        {canVerify ? (
          <>
            <span className="text-3xl">🔑</span>
            Verificar con Discord
          </>
        ) : (
          <>
            <span className="text-2xl">⏳</span>
            Espera {timeLeft} segundos para verificar...
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 mt-12 text-center">
        Seguro • Rápido • Solo necesitas tu cuenta de Discord
      </p>
    </div>
  );
}
