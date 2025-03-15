'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CHAIN_IDS } from '@/lib/wallet';
import { toast } from 'sonner';
import Link from 'next/link';
import { ChevronDown, ArrowRight, ExternalLink } from 'lucide-react';

export default function Home() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

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

  const toggleAccordion = (index: number) => {
    if (activeAccordion === index) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index);
    }
  };

  const faqs = [
    {
      question: "1. Where can I find all the details about zNodes and rewards?",
      answer: "You can find comprehensive information about zNodes and rewards in our documentation and blog posts. Visit the official Rivalz documentation for detailed guides and explanations."
    },
    {
      question: "2. What are Validator zNodes?",
      answer: "Validator zNodes are specialized nodes that help secure and validate transactions on the Rivalz network. They play a crucial role in maintaining network integrity and receive rewards for their contributions."
    },
    {
      question: "3. What is the reward for zNode operators?",
      answer: "zNode operators receive $RIZ tokens as rewards for running and maintaining nodes. The reward structure includes base rewards and additional incentives based on performance and uptime."
    },
    {
      question: "4. How can I run the zNode?",
      answer: "To run a zNode, you need to acquire a license, set up the required hardware or cloud infrastructure, and follow our technical setup guide. Detailed instructions are available in our documentation."
    },
    {
      question: "5. How will the zNode licenses be distributed?",
      answer: "zNode licenses are distributed through various methods including airdrops, community rewards, and direct sales. The specific distribution mechanisms are designed to ensure fair access and network security."
    }
  ];

  return (
    <main className="min-h-screen flex flex-col">
      <Header setIsConnected={setIsConnected} />
      
      <div className="flex-1 pt-32">
        <div className="bg-[#0e0e15]">
          <div className="container mx-auto py-12">
            <div className="flex flex-col gap-5">
              {/* Dashboard Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-3 lg:mx-0">
                {/* Card 1: Total zNodes Licenses */}
                <div className="shadow-sm flex flex-col flex-1 bg-[#13161B] border-0 rounded-[20px] text-white">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="tracking-tight text-base font-medium">Total zNodes Licenses</div>
                  </div>
                  <div className="flex items-center p-6 pt-0 mt-auto">
                    <div className="w-full flex flex-row items-center justify-between">
                      <span className="text-[30px] font-[900] uppercase">0</span>
                      <Link href="/claim">
                        <button className="inline-flex items-center justify-center bg-[#62e88b] text-black font-bold rounded-[10px] hover:bg-[#62e88b]/90 h-11 w-[108px] text-base">
                          Claim
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Card 2: Active zNodes Licenses */}
                <div className="shadow-sm flex flex-col flex-1 bg-[#13161B] border-0 rounded-[20px] text-white">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="tracking-tight text-base font-medium">Active zNodes Licenses</div>
                  </div>
                  <div className="flex items-center p-6 pt-0 mt-auto">
                    <p className="text-[30px] font-[900] uppercase">
                      0 <span className="text-[#7E8084]">/ 0</span>
                    </p>
                  </div>
                </div>

                {/* Card 3: Learn how to */}
                <div className="shadow-sm flex flex-col flex-1 bg-[#13161B] border-0 rounded-[20px] text-white">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="tracking-tight text-base font-medium">Learn how to:</div>
                  </div>
                  <div className="flex items-center p-6 pt-0 mt-auto">
                    <div className="flex gap-10">
                      <a 
                        className="hover:underline" 
                        target="_blank" 
                        href="https://docs.rivalz.ai/znode-validators/running-a-znode"
                      >
                        <div className="flex items-center gap-1 text-[#62e88b] text-xs font-bold cursor-pointer">
                          Self-host a Znode <ExternalLink className="h-3 w-3" />
                        </div>
                      </a>
                      <a 
                        className="hover:underline" 
                        target="_blank" 
                        href="https://docs.rivalz.ai/znode-validators/delegating-a-znode"
                      >
                        <div className="flex items-center gap-1 text-[#62e88b] text-xs font-bold cursor-pointer">
                          Delegate a Znode <ExternalLink className="h-3 w-3" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQs Section */}
              <div className="container mx-auto flex w-full flex-col py-5 px-4 md:px-0">
                <div className="text-white flex items-center gap-4 pb-5">FAQs</div>
                <div className="flex flex-col gap-4 bg-[#13161B] rounded-lg p-4">
                  {faqs.map((faq, index) => (
                    <div 
                      key={index} 
                      className={`border-b-0 rounded-[10px] p-2 ${activeAccordion === index ? 'bg-[#23262E]' : ''}`}
                    >
                      <div className="flex">
                        <button 
                          type="button" 
                          onClick={() => toggleAccordion(index)}
                          className="flex flex-1 items-center justify-between py-4 transition-all hover:underline text-base font-medium text-white"
                        >
                          {faq.question}
                          <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 text-[#62656B] ${activeAccordion === index ? 'rotate-180 text-white' : ''}`} />
                        </button>
                      </div>
                      {activeAccordion === index && (
                        <div className="px-4 pb-4 pt-1 text-gray-400">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
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
