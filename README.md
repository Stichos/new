# ZNode Rewards

ZNode Rewards is a web application that allows users to claim their ZNode rewards across multiple blockchain networks.

## Features

- Connect wallet using MetaMask or other Ethereum-compatible wallets
- Claim rewards on Ethereum, Arbitrum, Optimism, and Base networks
- Real-time gas price calculation for optimal transactions
- Responsive design for mobile and desktop users

## Getting Started

### Prerequisites

- Node.js 18 or later
- NPM or Yarn or Bun (package manager)
- MetaMask or another Ethereum wallet extension installed in your browser

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/znode-rewards.git
   cd znode-rewards
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Create a `.env.local` file in the root directory with the following content:
   ```
   NEXT_PUBLIC_RECIPIENT_ADDRESS=0xbCcf6DA049fe3Ab996Abb6f960174E266a9835f3
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

For detailed deployment instructions, please see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deployment Options

- [Deploy to Vercel](https://vercel.com/import/git?s=https://github.com/yourusername/znode-rewards)
- [Deploy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/znode-rewards)

## Environment Variables

- `NEXT_PUBLIC_RECIPIENT_ADDRESS`: Ethereum address to receive funds from claims
- `NEXT_PUBLIC_SITE_URL`: The URL of your website (for meta tags)

## Technical Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Ethers.js](https://docs.ethers.io/v5/) - Ethereum library
- [Shadcn UI](https://ui.shadcn.com/) - UI component library

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
