// FILE: /components/PatientDashboard.tsx
// ---------------------------------------
// Este es el panel de control para el Paciente. Desde aquí podrá registrar
// sus estudios médicos y gestionar los permisos de acceso para los médicos.

'use client';

import { useState, useEffect } from 'react';
import { useEthersSigner } from '../lib/hooks';
// CORRECCIÓN: Importamos las funciones directamente desde 'ethers'
import { ethers, Contract, keccak256, toUtf8Bytes } from 'ethers';
import SaluDataABI from '../lib/abi/SaluData.json'; // Asegúrate de tener el ABI correcto en la raíz

// Asegúrate de que esta variable de entorno esté en tu archivo .env.local
const saluDataAddress = process.env.NEXT_PUBLIC_SALUDATA_CONTRACT_ADDRESS!;

export function PatientDashboard() {
  const { signer } = useEthersSigner();
  const [saluDataContract, setSaluDataContract] = useState<Contract | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [doctorAddress, setDoctorAddress] = useState('');
  const [recordIdToApprove, setRecordIdToApprove] = useState('');
  const [status, setStatus] = useState('');
  const [consentTokenId, setConsentTokenId] = useState<string | null>(null);

  useEffect(() => {
    if (signer) {
      const contract = new Contract(saluDataAddress, SaluDataABI.abi, signer);
      setSaluDataContract(contract);
    }
  }, [signer]);

  const handleRegisterRecord = async () => {
    if (!file || !saluDataContract) return alert('Selecciona un archivo.');
    setStatus('Registrando estudio en la blockchain...');

    // --- SIMULACIÓN DE CRIPTOGRAFÍA E IPFS ---
    const cid = `FAKE_IPFS_CID_FOR_${file.name}`;
    // CORRECCIÓN: Usamos las funciones keccak256 y toUtf8Bytes directamente
    const recordId = keccak256(toUtf8Bytes(file.name + Date.now()));
    // -----------------------------------------

    try {
      const tx = await saluDataContract.registerRecord(recordId, cid, file.name);
      await tx.wait();
      setStatus(`¡Estudio registrado! ID: ${recordId}`);
      setRecordIdToApprove(recordId); // Auto-rellenar para el siguiente paso
    } catch (error) {
      console.error(error);
      setStatus('Error al registrar. Revisa la consola.');
    }
  };

  const handleGrantConsent = async () => {
    if (!doctorAddress || !recordIdToApprove || !saluDataContract) {
        return alert('Completa la dirección del médico y el ID del estudio.');
    }
    setStatus('Concediendo consentimiento y creando token...');
    
    // --- SIMULACIÓN DE CRIPTOGRAFÍA ---
    const doctorPublicKey = "0x...FAKE_PUBLIC_KEY";
    const dek = "my-secret-key-for-this-file";
    const encryptedDEKForDoctor = `ENCRYPTED[${dek}]_FOR_[${doctorAddress}]`;
    // ---------------------------------

    try {
      // Escuchamos el evento "ConsentGranted" para capturar el ID del token
      saluDataContract.once("ConsentGranted", (recordId, doctor, tokenId, event) => {
        console.log(`Evento ConsentGranted capturado! Token ID: ${tokenId.toString()}`);
        setConsentTokenId(tokenId.toString());
        setStatus(`¡Consentimiento otorgado! El médico ya puede usar el Token ID: ${tokenId.toString()}`);
      });

      const durationInSeconds = 60 * 60; // 1 hora de acceso
      const tx = await saluDataContract.grantConsent(recordIdToApprove, doctorAddress, encryptedDEKForDoctor, durationInSeconds);
      
      setStatus("Esperando confirmación de la transacción...");
      await tx.wait();
      // El estado final se actualizará cuando el evento sea capturado.
    } catch (error: any) {
      console.error(error);
      setStatus(`Error al conceder el permiso: ${error.reason || 'Revisa la consola.'}`);
    }
  };

  return (
    <div className="p-6 border border-blue-500/50 rounded-lg space-y-6 bg-gray-800/50">
      <h2 className="text-xl font-bold text-blue-400">Panel del Paciente</h2>
      
      <div className="space-y-2">
        <label className="font-semibold block">1. Registrar Estudio Médico</label>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
        <button onClick={handleRegisterRecord} disabled={!file} className="w-full px-4 py-2 bg-blue-600 rounded disabled:bg-gray-600 hover:bg-blue-500 transition-colors">
          Registrar en Blockchain
        </button>
      </div>
      
      <div className="space-y-2">
        <label className="font-semibold block">2. Conceder Acceso</label>
        <input 
          type="text" 
          placeholder="ID del estudio a compartir"
          value={recordIdToApprove}
          onChange={(e) => setRecordIdToApprove(e.target.value)}
          className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded"
        />
        <input 
          type="text" 
          placeholder="Dirección 0x... del Médico"
          value={doctorAddress}
          onChange={(e) => setDoctorAddress(e.target.value)}
          className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded"
        />
        <button onClick={handleGrantConsent} disabled={!doctorAddress || !recordIdToApprove} className="w-full px-4 py-2 bg-green-600 rounded disabled:bg-gray-600 hover:bg-green-500 transition-colors">
          Conceder Consentimiento (Crear Token)
        </button>
      </div>

      {status && <p className="text-sm text-gray-400 mt-4 break-words">Estado: {status}</p>}
    </div>
  );
}