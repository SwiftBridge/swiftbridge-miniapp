'use client'

import { useAppKit } from '@reown/appkit/react'
import { useAccount, useDisconnect } from 'wagmi'
import { Wallet, LogOut } from 'lucide-react'

export function WalletConnect() {
  const { open } = useAppKit()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => open()}
          className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
        >
          <Wallet size={18} />
          {address.slice(0, 6)}...{address.slice(-4)}
        </button>
        <button
          onClick={() => disconnect()}
          className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
          title="Disconnect"
        >
          <LogOut size={18} />
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => open()}
      className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all flex items-center justify-center gap-2"
    >
      <Wallet size={20} />
      Connect Wallet
    </button>
  )
}