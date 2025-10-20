# swiftbridge-miniapp
mini app
# SwiftBridge Mini App

Telegram Mini App for SwiftBridge - Web interface with wallet connection for crypto operations on Base network.

## Features

- 🔗 **Wallet Connection** - Connect via Reown AppKit (WalletConnect)
- 📊 **Dashboard** - View balances and portfolio
- 🔄 **Token Swaps** - Exchange tokens via Uniswap V3
- 📤 **P2P Transfers** - Send to Telegram usernames
- 🎨 **Modern UI** - Beautiful, responsive design
- 📱 **Telegram Integration** - Works as Telegram Mini App

## Setup

### Prerequisites

- Node.js v18+
- Reown Project ID (get from https://cloud.reown.com/)
- Deployed SwiftBridge contracts on Base Sepolia

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local

# Edit .env.local with your values
nano .env.local
```

### Get Reown Project ID

1. Go to https://cloud.reown.com/
2. Sign up / Log in
3. Create a new project
4. Copy the Project ID
5. Add to `.env.local`

### Environment Variables

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

### Running

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
swiftbridge-miniapp/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with providers
│   │   ├── page.tsx         # Main page
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   ├── Providers.tsx    # Wagmi & React Query providers
│   │   ├── WalletConnect.tsx # Wallet connection button
│   │   ├── Dashboard.tsx    # Balance dashboard
│   │   ├── SwapInterface.tsx # Token swap UI
│   │   └── SendInterface.tsx # P2P transfer UI
│   └── config/
│       ├── wagmi.ts         # Wagmi configuration
│       └── contracts.ts     # Contract addresses & ABIs
└── package.json
```

## Integration with Telegram Bot

### Add Mini App to Bot

1. Open @BotFather in Telegram
2. Send `/mybots`
3. Select your bot
4. Click "Bot Settings" → "Menu Button"
5. Set URL to your deployed mini app URL

### Commands in Bot

Add these commands to link to mini app:

```
/app - Open SwiftBridge App
```

In bot code:
```typescript
bot.command('app', async (ctx) => {
  await ctx.reply('Open SwiftBridge App', {
    reply_markup: {
      inline_keyboard: [[
        { text: '🚀 Launch App', web_app: { url: 'https://your-app-url.com' } }
      ]]
    }
  })
})
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Other Platforms

- **Netlify**: Connect GitHub repo, set env vars
- **Railway**: Deploy from GitHub, add env vars
- **Cloudflare Pages**: Connect repo, configure build

## Features Breakdown

### Dashboard
- Total balance in USD and Naira
- Individual token balances
- Username registration status
- Quick action buttons

### Swap Interface
- Token selection
- Amount input
- Live rate preview
- Slippage settings
- Fee display

### Send Interface
- Username input
- Token & amount selection
- Optional message
- Instant or pending transfer
- Transaction confirmation

## Wallet Support

Via Reown AppKit, supports:
- MetaMask
- WalletConnect compatible wallets
- Coinbase Wallet
- Trust Wallet
- Rainbow
- And 300+ other wallets

## Styling

Built with Tailwind CSS:
- Responsive design
- Dark mode support
- Modern gradients
- Smooth animations

## Testing

```bash
# Test in browser
npm run dev

# Test as Telegram Mini App
# 1. Deploy to public URL
# 2. Add to bot via BotFather
# 3. Open bot in Telegram
# 4. Click app button
```

## Troubleshooting

### Wallet not connecting
- Check Reown Project ID is correct
- Verify network is Base Sepolia (84532)
- Try different wallet

### Transactions failing
- Ensure wallet has Base Sepolia ETH for gas
- Check contract addresses are correct
- Verify token approvals

### Mini App not loading in Telegram
- Ensure URL is HTTPS
- Check Telegram WebApp SDK loaded
- Verify URL in BotFather settings

## Security

- ✅ All transactions signed by user's wallet
- ✅ No private keys stored
- ✅ Contract interactions via ethers.js
- ✅ Reown AppKit for secure wallet connection

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## License

MIT License

## Support

- GitHub Issues
- Telegram: @SwiftBridgeSupport

---

Built with ❤️ using Next.js, Reown AppKit, and Wagmi