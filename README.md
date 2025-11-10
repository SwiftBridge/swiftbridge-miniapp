# SwiftBridge Mini App

Telegram Mini App for **SwiftBridge** — a web-based interface enabling seamless crypto operations on the **Base Network**.
This mini app allows users to connect their wallets, manage balances, perform token swaps, and send peer-to-peer (P2P) transfers directly from Telegram.

---

## Overview

The SwiftBridge Mini App is built with **Next.js**, **Wagmi**, and **Reown AppKit (WalletConnect)** to provide a secure and intuitive decentralized finance experience.
It supports real-time wallet connections, token swaps via **Uniswap V3**, and P2P transfers tied to Telegram usernames, making it a fully integrated Web3 experience inside Telegram.

---

## Features

* **Wallet Connection** — Connect via Reown AppKit (WalletConnect) to supported wallets.
* **Dashboard** — Display token balances, USD/NGN value, and user registration status.
* **Token Swaps** — Swap tokens using the Uniswap V3 protocol.
* **P2P Transfers** — Send tokens to Telegram usernames.
* **Telegram Integration** — Runs as a Telegram Mini App within your existing bot.
* **Modern UI** — Built with Tailwind CSS, offering a fast, responsive, and modern interface.

---

## Prerequisites

Before starting, ensure you have:

* Node.js v18 or later
* A **Reown Project ID** (obtain from [Reown Cloud](https://cloud.reown.com/))
* Deployed **SwiftBridge** smart contracts on **Base Sepolia** network

---

## Installation

```bash
# Install dependencies
npm install

# Copy the environment file
cp .env.local.example .env.local

# Edit environment variables
nano .env.local
```

---

## Reown Project Setup

1. Visit [https://cloud.reown.com/](https://cloud.reown.com/)
2. Log in or create an account
3. Create a new project
4. Copy the **Project ID**
5. Paste it into `.env.local` as `NEXT_PUBLIC_REOWN_PROJECT_ID`

---

## Environment Configuration

Edit the `.env.local` file to include your network and contract details:

```env
NEXT_PUBLIC_REOWN_PROJECT_ID=your_reown_project_id

NEXT_PUBLIC_USER_REGISTRY=0xFaaE04873914c0102B3c1aA5BCE05C51d0BD3667
NEXT_PUBLIC_ESCROW_MANAGER=0xBd5287110A78d32A5435E97449BBA408E4F52568
NEXT_PUBLIC_P2P_TRANSFER=0x2B1160DCAAbFBC21508629425901c809Db923774
NEXT_PUBLIC_SWAP_ROUTER=0xb71A9C877B0C5CFee262E6039be2439964E0DCdf

NEXT_PUBLIC_CHAIN_ID=84532
NEXT_PUBLIC_RPC_URL=https://sepolia.base.org
NEXT_PUBLIC_BOT_USERNAME=swiftbridgebot
```

---

## Running Locally

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
swiftbridge-miniapp/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Main entry page
│   │   └── globals.css        # Global Tailwind styles
│   ├── components/
│   │   ├── Providers.tsx      # Wagmi & React Query providers
│   │   ├── WalletConnect.tsx  # Wallet connection component
│   │   ├── Dashboard.tsx      # User dashboard view
│   │   ├── SwapInterface.tsx  # Token swap functionality
│   │   └── SendInterface.tsx  # P2P transfer UI
│   └── config/
│       ├── wagmi.ts           # Wagmi and chain configuration
│       └── contracts.ts       # Contract addresses and ABIs
└── package.json
```

---

## Telegram Bot Integration

### Adding the Mini App to Your Bot

1. Open **@BotFather** in Telegram
2. Run `/mybots` and select your bot
3. Go to **Bot Settings → Menu Button**
4. Set the URL to your deployed Mini App

### Example Bot Command

In your bot code (Node.js + Telegraf example):

```typescript
bot.command('app', async (ctx) => {
  await ctx.reply('Open SwiftBridge App', {
    reply_markup: {
      inline_keyboard: [[
        { text: 'Launch App', web_app: { url: 'https://your-app-url.com' } }
      ]]
    }
  });
});
```

---

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

After deployment, set your environment variables in the **Vercel dashboard**.

### Alternative Hosting Options

* **Netlify** — Connect via GitHub and set env vars
* **Railway** — Deploy repository and add environment variables
* **Cloudflare Pages** — Configure build command and variables

---

## Functional Overview

### Dashboard

* Displays wallet balances in USD and NGN
* Shows user registry verification status
* Provides shortcuts to send or swap tokens

### Swap Interface

* Token selector with real-time rates
* Adjustable slippage tolerance
* Fee estimation and confirmation modal

### Send Interface

* Input recipient’s Telegram username
* Choose token and amount
* Option to include a message
* Displays pending and confirmed transfers

---

## Wallet Support

Integrated via **Reown AppKit**, supporting:

* MetaMask
* WalletConnect-compatible wallets
* Coinbase Wallet
* Trust Wallet
* Rainbow Wallet
* Over 300 compatible wallets

---

## Styling and UI

The app uses **Tailwind CSS** for styling with:

* Responsive and adaptive design
* Dark mode support
* Modern gradients and animations
* Lightweight and modular UI components

---

## Testing

```bash
# Local testing
npm run dev

# Test inside Telegram
# 1. Deploy to a public HTTPS URL
# 2. Add Mini App to your bot via BotFather
# 3. Open Telegram and access your bot
# 4. Launch the Mini App
```

---

## Troubleshooting

### Wallet Connection Issues

* Verify the **Reown Project ID** is correct
* Ensure the connected network is **Base Sepolia (84532)**
* Try reconnecting or switching wallets

### Transaction Failures

* Check that your wallet has Base Sepolia ETH for gas
* Confirm contract addresses are valid
* Ensure token approvals are granted

### Mini App Not Loading in Telegram

* Verify the app is served over **HTTPS**
* Ensure the **Telegram WebApp SDK** is properly initialized
* Confirm the correct URL is set in BotFather

---

## Security

* All transactions require user wallet signatures
* No private keys or sensitive data are stored
* Contract interactions handled via `ethers.js`
* Secure wallet connections using Reown AppKit
* Verified smart contracts deployed on Base Sepolia

---

## Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to your fork (`git push origin feature-name`)
5. Open a Pull Request for review

---

## License

This project is licensed under the **MIT License**.
You are free to use, modify, and distribute it with proper attribution.

---

## Support

* Report issues on GitHub
* Telegram Support: **@SwiftBridgeSupport**

---

**Built with Next.js, Reown AppKit, and Wagmi — powering the SwiftBridge ecosystem on Base.**
