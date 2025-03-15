'use client';

import { useState } from 'react';
import { CHAIN_IDS, CHAIN_NAMES } from '@/lib/wallet';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface ChainSelectorProps {
  selectedChain: string;
  onSelect: (chainId: string) => void;
}

export function ChainSelector({ selectedChain, onSelect }: ChainSelectorProps) {
  const handleSelect = (chainId: string) => {
    onSelect(chainId);
  };

  return (
    <RadioGroup
      value={selectedChain}
      onValueChange={handleSelect}
      className="flex flex-col space-y-3"
    >
      {Object.entries(CHAIN_NAMES).map(([chainId, name]) => (
        <div
          key={chainId}
          className={`flex items-center space-x-2 bg-[#0C0E12] border border-[#23262E] rounded-lg p-4 cursor-pointer hover:border-[#62e88b]/50 transition-colors ${
            selectedChain === chainId ? 'border-[#62e88b]' : ''
          }`}
          onClick={() => handleSelect(chainId)}
        >
          <RadioGroupItem value={chainId} id={chainId} className="text-[#62e88b]" />
          <Label htmlFor={chainId} className="flex justify-between w-full cursor-pointer">
            <span className="font-medium">{name}</span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
