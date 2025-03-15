'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface WalletConnectProps {
  onConnect?: (connected: boolean) => void;
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  // Check connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { ethereum } = window as any;
        if (ethereum) {
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnected(true);
            if (onConnect) onConnect(true);
          }
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    };

    checkConnection();

    // Listen for account changes
    const { ethereum } = window as any;
    if (ethereum) {
      ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
          if (onConnect) onConnect(true);
        } else {
          setAccount('');
          setIsConnected(false);
          if (onConnect) onConnect(false);
        }
      });
    }

    return () => {
      if (ethereum) {
        ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, [onConnect]);

  const handleConnect = async () => {
    if (isConnecting) return;

    try {
      setIsConnecting(true);
      const { ethereum } = window as any;

      if (ethereum) {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
          if (onConnect) onConnect(true);
        }
      } else {
        alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const formatAddress = (address: string): string => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <Button
      onClick={isConnected ? undefined : handleConnect}
      className={`h-9 px-4 rounded-[10px] font-medium ${
        isConnected
          ? 'bg-[#0C0E12] border border-[#23262E] text-white hover:bg-[#0C0E12]/80'
          : 'bg-[#62e88b] text-black hover:bg-[#62e88b]/80'
      }`}
      disabled={isConnecting}
    >
      {isConnecting ? (
        'Connecting...'
      ) : isConnected ? (
        formatAddress(account)
      ) : (
        'Connect Wallet'
      )}
    </Button>
  );
}
