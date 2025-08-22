// FILE: /app/page.tsx
// -------------------
// Esta es la página principal que une todo. Gestiona el login/logout
// y muestra los paneles del paciente y del médico cuando el usuario está autenticado.

'use client';

import { usePrivy } from '@privy-io/react-auth';
import { PatientDashboard } from './components/PatientDashboard';
import { DoctorDashboard } from './components/DoctorDashboard';

export default function Home() {
  const { ready, authenticated, login, logout, user } = usePrivy();

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Cargando SaluData...</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-700">
        <h1 className="text-3xl font-bold text-blue-400">SaluData</h1>
        {authenticated ? (
          <div className="flex items-center gap-4">
             <p className="text-sm text-gray-400 hidden md:block">
                {user?.wallet?.address.substring(0, 6)}...{user?.wallet?.address.substring(user.wallet.address.length - 4)}
             </p>
            <button onClick={logout} className="px-4 py-2 bg-red-600 rounded hover:bg-red-500 font-semibold transition-colors">
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <button onClick={login} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 font-semibold transition-colors">
            Iniciar Sesión
          </button>
        )}
      </header>

      {authenticated && user?.wallet ? (
        <div>
          <p className="mb-8 text-center text-gray-300">
            Bienvenido. Ahora puedes actuar como <span className="font-bold text-blue-400">Paciente</span> para subir tus datos o como <span className="font-bold text-green-400">Médico</span> para leerlos con un permiso.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <PatientDashboard />
            <DoctorDashboard />
          </div>
        </div>
      ) : (
        <div className="text-center p-10 bg-gray-800 rounded-lg mt-10">
          <h2 className="text-2xl font-semibold mb-4">Soberanía de tus Datos de Salud</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Por favor, inicia sesión para registrar tus estudios médicos de forma segura y gestionar quién puede acceder a ellos.
          </p>
        </div>
      )}
    </main>
  );
}