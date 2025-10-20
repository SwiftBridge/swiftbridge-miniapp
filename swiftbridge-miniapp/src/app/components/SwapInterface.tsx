'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACTS, TOKENS, SWAP_ROUTER_ABI, ERC20_ABI } from '@/config/contracts'
import { parseUnits } from 'viem'
import { ArrowDown, Loader2 } from 'lucide-react'

const TOKEN_OPTIONS = [
  { symbol: 'USDC', address: TOKENS.USDC, decimals: 6 },
  { symbol: 'WETH', address: TOKENS.WETH, decimals: 18 },
]

export function SwapInterface() {
  const { address } = useAccount()
  const [fromToken, setFromToken] = useState(TOKEN_OPTIONS[0])
  const [toToken, setToToken] = useState(TOKEN_OPTIONS[1])
  const [amount, setAmount] = useState('')
  const [isApproving, setIsApproving] = useState(false)

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const handleSwap = async () => {
    if (!amount || !address) return

    try {
      const amountParsed = parseUnits(amount, fromToken.decimals)
      
      // First approve
      setIsApproving(true)
      await writeContract({
        address: fromToken.address,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [CONTRACTS.SWAP_ROUTER, amountParsed],
      })

      // Wait a bit for approval
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsApproving(false)

      // Then swap
      await writeContract({
        address: CONTRACTS.SWAP_ROUTER,
        abi: SWAP_ROUTER_ABI,
        functionName: 'swapExactTokensForTokens',
        args: [
          fromToken.address,
          toToken.address,
          amountParsed,
          BigInt(0), // Min amount out (0 for demo, should calculate with slippage)
          3000, // 0.3% pool fee
        ],
      })
    } catch (error) {
      console.error('Swap error:', error)
      setIsApproving(false)
    }
  }

  const switchTokens = () => {
    setFromToken(toToken)
    setToToken(fromToken)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Swap Tokens</h2>

      <div className="space-y-4">
        {/* From Token */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">From</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Balance: 0</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="flex-1 bg-transparent text-2xl font-semibold text-gray-900 dark:text-white outline-none"
            />
            <select
              value={fromToken.symbol}
              onChange={(e) => setFromToken(TOKEN_OPTIONS.find(t => t.symbol === e.target.value)!)}
              className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg font-semibold text-gray-900 dark:text-white"
            >
              {TOKEN_OPTIONS.map(token => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Switch Button */}
        <div className="flex justify-center">
          <button
            onClick={switchTokens}
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
          >
            <ArrowDown className="text-gray-600 dark:text-gray-300" size={20} />
          </button>
        </div>

        {/* To Token */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">To</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Balance: 0</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="0.0"
              readOnly
              className="flex-1 bg-transparent text-2xl font-semibold text-gray-900 dark:text-white outline-none"
            />
            <select
              value={toToken.symbol}
              onChange={(e) => setToToken(TOKEN_OPTIONS.find(t => t.symbol === e.target.value)!)}
              className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg font-semibold text-gray-900 dark:text-white"
            >
              {TOKEN_OPTIONS.map(token => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Rate</span>
            <span className="font-medium text-gray-900 dark:text-white">1 {fromToken.symbol} = ~ {toToken.symbol}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Fee</span>
            <span className="font-medium text-gray-900 dark:text-white">0.3%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Slippage</span>
            <span className="font-medium text-gray-900 dark:text-white">1%</span>
          </div>
        </div>

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          disabled={!amount || isPending || isApproving || isConfirming}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          {(isPending || isApproving || isConfirming) && <Loader2 className="animate-spin" size={20} />}
          {isApproving ? 'Approving...' : isPending ? 'Swapping...' : isConfirming ? 'Confirming...' : 'Swap'}
        </button>

        {isSuccess && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center">
            <div className="text-green-600 dark:text-green-400 font-semibold mb-1">Swap Successful! 🎉</div>
            <div className="text-sm text-green-700 dark:text-green-300">
              Transaction confirmed
            </div>
          </div>
        )}
      </div>
    </div>
  )
}