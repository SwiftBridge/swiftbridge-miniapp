'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { WalletConnect } from '@/components/WalletConnect'
import { Dashboard } from '@/components/Dashboard'
import { SwapInterface } from '@/components/SwapInterface'
import { SendInterface } from '@/components/SendInterface'
import { Wallet, ArrowLeftRight, Send } from 'lucide-react'

type Tab = 'dashboard' | 'swap' | 'send'

export default function Home() {
  const { isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [isTelegram, setIsTelegram] = useState(false)

  useEffect(() => {
    // Check if running inside Telegram
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      setIsTelegram(true)
      window.Telegram.WebApp.ready()
      window.Telegram.WebApp.expand()
    }
  }, [])

  if (!isConnected) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              SwiftBridge
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Connect your wallet to get started
            </p>
          </div>
          <WalletConnect />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            SwiftBridge
          </h1>
          <WalletConnect />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Wallet size={20} />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('swap')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
              activeTab === 'swap'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <ArrowLeftRight size={20} />
            Swap
          </button>
          <button
            onClick={() => setActiveTab('send')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
              activeTab === 'send'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Send size={20} />
            Send
          </button>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'swap' && <SwapInterface />}
          {activeTab === 'send' && <SendInterface />}
        </div>

        {/* Telegram Notice */}
        {isTelegram && (
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Running inside Telegram Mini App 🎉
          </div>
        )}
      </div>
    </main>
  )
}