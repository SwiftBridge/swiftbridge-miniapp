'use client'

import { useAccount, useBalance, useReadContract } from 'wagmi'
import { CONTRACTS, TOKENS, ERC20_ABI, USER_REGISTRY_ABI } from '@/config/contracts'
import { formatUnits } from 'viem'
import { TrendingUp, Wallet, Users } from 'lucide-react'

export function Dashboard() {
  const { address } = useAccount()

  // Get ETH balance
  const { data: ethBalance } = useBalance({
    address: address,
  })

  // Get USDC balance
  const { data: usdcBalance } = useBalance({
    address: address,
    token: TOKENS.USDC,
  })

  // Check if user has registered username
  const { data: hasUsername } = useReadContract({
    address: CONTRACTS.USER_REGISTRY,
    abi: USER_REGISTRY_ABI,
    functionName: 'hasUsername',
    args: address ? [address] : undefined,
  })

  // Get username if registered
  const { data: username } = useReadContract({
    address: CONTRACTS.USER_REGISTRY,
    abi: USER_REGISTRY_ABI,
    functionName: 'addressToUsername',
    args: address ? [address] : undefined,
    query: {
      enabled: !!hasUsername,
    },
  })

  const totalValue = (
    (parseFloat(ethBalance?.formatted || '0') * 4000) + // ETH price estimate
    parseFloat(usdcBalance?.formatted || '0')
  ).toFixed(2)

  return (
    <div className="space-y-6">
      {/* Total Balance Card */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium opacity-90">Total Balance</h2>
          <TrendingUp className="opacity-75" size={24} />
        </div>
        <div className="text-4xl font-bold mb-2">${totalValue}</div>
        <div className="text-sm opacity-75">≈ ₦{(parseFloat(totalValue) * 1469).toLocaleString()}</div>
      </div>

      {/* Username Card */}
      {hasUsername && username ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Users className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Your Username</div>
              <div className="text-xl font-semibold text-gray-900 dark:text-white">@{username as string}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Users className="text-yellow-600 dark:text-yellow-400 flex-shrink-0" size={24} />
            <div>
              <div className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                Register Your Username
              </div>
              <div className="text-sm text-yellow-800 dark:text-yellow-200 mb-3">
                Register a username to receive P2P transfers from friends
              </div>
              <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-medium transition-all">
                Register Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Token Balances */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Tokens</h3>
        
        {/* ETH Balance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <Wallet className="text-gray-600 dark:text-gray-300" size={20} />
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">ETH</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Ethereum</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-900 dark:text-white">
              {parseFloat(ethBalance?.formatted || '0').toFixed(4)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              ${(parseFloat(ethBalance?.formatted || '0') * 4000).toFixed(2)}
            </div>
          </div>
        </div>

        {/* USDC Balance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Wallet className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">USDC</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">USD Coin</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-900 dark:text-white">
              {parseFloat(usdcBalance?.formatted || '0').toFixed(2)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              ${parseFloat(usdcBalance?.formatted || '0').toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all">
          <div className="text-2xl mb-2">💰</div>
          <div className="font-semibold text-gray-900 dark:text-white text-sm">Buy Crypto</div>
        </button>
        <button className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all">
          <div className="text-2xl mb-2">💸</div>
          <div className="font-semibold text-gray-900 dark:text-white text-sm">Sell Crypto</div>
        </button>
      </div>
    </div>
  )
}