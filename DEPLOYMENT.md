# Deploying ZNode Rewards to Vercel

This guide explains how to deploy your ZNode Rewards website to Vercel and connect it to a custom domain.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. A [GitHub account](https://github.com/signup) (recommended for easier deployment)
3. A domain name (optional, but recommended for a professional website)

## Step 1: Push Your Code to GitHub

1. Create a new repository on GitHub
2. Push your code to the repository:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/znode-rewards.git
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option 1: Deploy from GitHub

1. Go to the [Vercel dashboard](https://vercel.com/dashboard)
2. Click "Add New..." > "Project"
3. Import your GitHub repository
4. Configure your project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: next build
   - Output Directory: .next
5. Click "Deploy"

### Option 2: Deploy with Vercel CLI

1. Install the Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy your project:
```bash
vercel
```

4. Follow the prompts to configure your deployment.

## Step 3: Connect a Custom Domain

1. Go to your project in the Vercel dashboard
2. Navigate to "Settings" > "Domains"
3. Enter your domain name and click "Add"
4. Follow the instructions to configure your DNS settings:
   - If using Vercel Domains: The setup will be automatic
   - If using an external domain provider: You'll need to configure DNS records

### DNS Configuration Examples

#### Option 1: Using A Records
```
Type: A
Name: @
Value: 76.76.21.21
```

#### Option 2: Using CNAME Records (for subdomains)
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com.
```

## Step 4: Environment Variables

Your environment variables are already configured in the `vercel.json` file. If you need to update the recipient address:

1. Go to your project in the Vercel dashboard
2. Navigate to "Settings" > "Environment Variables"
3. Add or update the `NEXT_PUBLIC_RECIPIENT_ADDRESS` variable

## Step 5: Test Your Deployment

1. Visit your deployment URL or custom domain
2. Ensure the wallet connection works
3. Test the claim functionality with a test wallet

## Troubleshooting

If you encounter issues with your deployment:

1. Check the Vercel deployment logs
2. Verify your environment variables are correctly set
3. Ensure your DNS configuration is correct for custom domains
4. Try a fresh deployment if needed

For more information, refer to [Vercel's documentation](https://vercel.com/docs).
