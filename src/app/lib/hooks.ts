// FILE: /lib/hooks.ts
// --------------------
// Este es un "hook" personalizado que nos facilita obtener un "signer" de Ethers.js
// a partir de la wallet conectada con Privy. Lo usaremos en nuestros componentes
// para firmar y enviar transacciones al smart contract.

'use client';

// Importamos 'useWallets' que es el hook recomendado para interactuar con las wallets.
import { useWallets } from '@privy-io/react-auth';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import { useState, useEffect } from 'react';

export function useEthersSigner() {
  // 'useWallets' nos da un array de todas las wallets que el usuario ha conectado.
  const { wallets } = useWallets();
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

  useEffect(() => {
    // Buscamos la primera wallet que esté conectada y activa.
    const connectedWallet = wallets.find((wallet) => wallet.isConnected());

    if (connectedWallet) {
      const setupSigner = async () => {
        // Obtenemos el provider EIP-1193 de la wallet conectada.
        const provider = new BrowserProvider(await connectedWallet.getEthereumProvider());
        const signer = await provider.getSigner();
        setSigner(signer);
      };
      setupSigner();
    } else {
      setSigner(null);
    }
  }, [wallets]);

  return { signer };
}