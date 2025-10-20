export const CONTRACTS = {
  USER_REGISTRY: process.env.NEXT_PUBLIC_USER_REGISTRY as `0x${string}`,
  ESCROW_MANAGER: process.env.NEXT_PUBLIC_ESCROW_MANAGER as `0x${string}`,
  P2P_TRANSFER: process.env.NEXT_PUBLIC_P2P_TRANSFER as `0x${string}`,
  SWAP_ROUTER: process.env.NEXT_PUBLIC_SWAP_ROUTER as `0x${string}`,
}

export const TOKENS = {
  USDC: '0x036CbD53842c5426634e7929541eC2318f3dCF7e' as `0x${string}`,
  WETH: '0x4200000000000000000000000000000000000006' as `0x${string}`,
}

// Minimal ABIs for read/write operations
export const USER_REGISTRY_ABI = [
  {
    inputs: [{ name: 'username', type: 'string' }],
    name: 'registerUsername',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'username', type: 'string' }],
    name: 'isUsernameRegistered',
    outputs: [{ type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'hasUsername',
    outputs: [{ type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'addressToUsername',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export const P2P_TRANSFER_ABI = [
  {
    inputs: [
      { name: 'toUsername', type: 'string' },
      { name: 'token', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'message', type: 'string' }
    ],
    name: 'sendToUsername',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'username', type: 'string' }],
    name: 'getPendingTransferCount',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export const SWAP_ROUTER_ABI = [
  {
    inputs: [
      { name: 'tokenIn', type: 'address' },
      { name: 'tokenOut', type: 'address' },
      { name: 'amountIn', type: 'uint256' },
      { name: 'amountOutMinimum', type: 'uint256' },
      { name: 'poolFee', type: 'uint24' }
    ],
    name: 'swapExactTokensForTokens',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'tokenIn', type: 'address' },
      { name: 'tokenOut', type: 'address' },
      { name: 'amountIn', type: 'uint256' },
      { name: 'poolFee', type: 'uint24' }
    ],
    name: 'getQuote',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

export const ERC20_ABI = [
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const