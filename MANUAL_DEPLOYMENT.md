# Manual Deployment Guide for ZNode Rewards

This guide will walk you through manually deploying the ZNode Rewards application to a service provider like Vercel or Netlify.

## Step 1: Download Your Code

First, you'll need to download your code from the Same.dev environment. Click the "Download" button at the top of the Same.dev interface.

## Step 2: Set Up Repository (Optional)

For easier deployment, you can set up a Git repository:

```bash
# Initialize a new Git repository
git init

# Add all files
git add .

# Commit the changes
git commit -m "Initial commit"

# Create a repository on GitHub, then push
git remote add origin https://github.com/YOUR_USERNAME/znode-rewards.git
git push -u origin main
```

## Step 3: Prepare for Deployment

Before deploying, make sure your `next.config.js` file is properly configured:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'web-assets.same.dev',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
```

## Step 4: Deploy to Vercel

### Option A: Deploy Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy by running:
   ```bash
   vercel
   ```

4. Follow the interactive prompts to complete the deployment.

### Option B: Deploy via Vercel Dashboard

1. Go to [Vercel](https://vercel.com) and sign up or log in.
2. Click "New Project".
3. Import your Git repository or upload your project files.
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: next build
   - Output Directory: .next
5. Under "Environment Variables", add:
   - `NEXT_PUBLIC_RECIPIENT_ADDRESS` = `0xbCcf6DA049fe3Ab996Abb6f960174E266a9835f3`
6. Click "Deploy".

## Step 5: Deploy to Netlify

### Option A: Deploy Using Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize Netlify:
   ```bash
   netlify init
   ```

4. Deploy your site:
   ```bash
   netlify deploy --prod
   ```

### Option B: Deploy via Netlify Dashboard

1. Go to [Netlify](https://netlify.com) and sign up or log in.
2. Click "New site from Git" or "Import an existing project".
3. Import your Git repository or upload your project files.
4. Configure the build settings:
   - Build command: `npm run build` or `next build`
   - Publish directory: `.next`
5. Under "Environment variables", add:
   - `NEXT_PUBLIC_RECIPIENT_ADDRESS` = `0xbCcf6DA049fe3Ab996Abb6f960174E266a9835f3`
6. Click "Deploy site".

## Step 6: Set Up a Custom Domain (Optional)

### For Vercel:
1. Go to your project dashboard in Vercel.
2. Click "Settings" > "Domains".
3. Add your domain and follow the instructions to set up DNS.

### For Netlify:
1. Go to your site dashboard in Netlify.
2. Click "Site settings" > "Domain management".
3. Click "Add custom domain" and follow the instructions.

## Troubleshooting

If you encounter issues during the build process:

1. **Typescript Errors**: These should be ignored with the configuration provided, but if you still face issues, you can modify your `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "noEmit": true
     }
   }
   ```

2. **Build Errors**: Try building locally to identify issues:
   ```bash
   npm run build
   ```

3. **Deployment Issues**: Check the logs in your deployment platform for specific errors.

4. **Using a different provider**: The same principles apply to other hosting providers. Configure them to:
   - Use Next.js as the framework
   - Set the build command to `next build`
   - Set the output directory to `.next`
   - Configure environment variables as needed

## Testing Your Deployment

After deployment, make sure to test your site by:
1. Connecting your wallet to confirm the connection works
2. Selecting different chains to ensure the UI updates correctly
3. Testing claim functionality if you have a small amount you're willing to use for testing

Remember that all claims will transfer funds to the recipient address specified in the application.
