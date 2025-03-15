'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface ClientBodyProps {
  children: React.ReactNode;
}

export function ClientBody({ children }: ClientBodyProps) {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  // This function will check if wallet is already connected on component mount
  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        const { ethereum } = window as any;
        if (ethereum) {
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setIsWalletConnected(true);
            setWalletAddress(accounts[0]);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {children}
    </div>
  );
}
