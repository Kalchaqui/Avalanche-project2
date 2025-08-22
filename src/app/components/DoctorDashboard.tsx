// FILE: /components/DoctorDashboard.tsx
// --------------------------------------
// Este es el panel de control para el Médico. Desde aquí podrá usar los
// "Recibos de Consentimiento" (Token IDs) que le dieron los pacientes para
// acceder y leer los estudios médicos.

'use client';

import { useState, useEffect } from 'react';
import { useEthersSigner } from '../lib/hooks';
import { ethers, Contract } from 'ethers';
import SaluDataABI from '../lib/abi/SaluData.json'; // Asegúrate de tener el ABI correcto en la raíz

const saluDataAddress = process.env.NEXT_PUBLIC_SALUDATA_CONTRACT_ADDRESS!;

export function DoctorDashboard() {
  const { signer } = useEthersSigner();
  const [saluDataContract, setSaluDataContract] = useState<Contract | null>(null);
  const [consentTokenId, setConsentTokenId] = useState('');
  const [studyData, setStudyData] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (signer) {
      const contract = new Contract(saluDataAddress, SaluDataABI.abi, signer);
      setSaluDataContract(contract);
    }
  }, [signer]);

  const handleReadKeyAndFetch = async () => {
    if (!consentTokenId || !saluDataContract) return alert('Introduce un Token ID.');
    setStatus('Obteniendo acceso con el token...');
    setStudyData('');

    try {
      // 1. Obtener la clave cifrada del contrato usando el token ID
      const encryptedDEK = await saluDataContract.getAccessKey(consentTokenId);
      setStatus('Clave de acceso obtenida. Descifrando...');
      
      // --- SIMULACIÓN DE DESENCRIPTACIÓN E IPFS ---
      const dek = encryptedDEK.replace('ENCRYPTED[', '').split(']')[0];
      const decryptedFileContent = `CONTENIDO_DESCIFRADO_DEL_ESTUDIO (Clave usada: ${dek})`;
      // --------------------------------------------
      
      setStudyData(decryptedFileContent);
      setStatus('¡Estudio descifrado con éxito!');
      
    } catch (error: any) {
      console.error(error);
      setStatus(`Error: ${error.reason || 'No tienes acceso o el token es incorrecto.'}`);
    }
  };

  return (
    <div className="p-6 border border-green-500/50 rounded-lg space-y-4 bg-gray-800/50">
      <h2 className="text-xl font-bold text-green-400">Panel del Médico</h2>
      
      <div className="space-y-2">
        <label className="font-semibold block">Acceder a Estudio con Token</label>
        <input 
          type="text" 
          placeholder="Pegar ID del Token de Consentimiento"
          value={consentTokenId}
          onChange={(e) => setConsentTokenId(e.target.value)}
          className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded"
        />
        <button onClick={handleReadKeyAndFetch} disabled={!consentTokenId} className="w-full px-4 py-2 bg-green-600 rounded disabled:bg-gray-600 hover:bg-green-500 transition-colors">
          Leer Estudio
        </button>
      </div>

      {status && <p className="text-sm text-gray-400 mt-4">{status}</p>}

      {studyData && (
        <div className="p-4 bg-gray-900 rounded mt-4">
          <h4 className="font-bold">Contenido del Estudio:</h4>
          <pre className="whitespace-pre-wrap text-yellow-300">{studyData}</pre>
        </div>
      )}
    </div>
  );
}