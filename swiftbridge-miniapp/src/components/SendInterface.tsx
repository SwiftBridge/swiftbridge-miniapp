'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACTS, TOKENS, P2P_TRANSFER_ABI, ERC20_ABI } from '@/config/contracts'
import { parseUnits } from 'viem'
import { Send, Loader2, CheckCircle } from 'lucide-react'

const TOKEN_OPTIONS = [
  { symbol: 'USDC', address: TOKENS.USDC, decimals: 6 },
  { symbol: 'WETH', address: TOKENS.WETH, decimals: 18 },
]

export function SendInterface() {
  const { address } = useAccount()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [selectedToken, setSelectedToken] = useState(TOKEN_OPTIONS[0])
  const [isApproving, setIsApproving] = useState(false)

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const handleSend = async () => {
    if (!amount || !recipient || !address) return

    try {
      const amountParsed = parseUnits(amount, selectedToken.decimals)
      const cleanRecipient = recipient.startsWith('@') ? recipient.slice(1) : recipient

      // First approve
      setIsApproving(true)
      await writeContract({
        address: selectedToken.address,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [CONTRACTS.P2P_TRANSFER, amountParsed],
      })

      // Wait for approval
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsApproving(false)

      // Then send
      await writeContract({
        address: CONTRACTS.P2P_TRANSFER,
        abi: P2P_TRANSFER_ABI,
        functionName: 'sendToUsername',
        args: [cleanRecipient, selectedToken.address, amountParsed, message],
      })
    } catch (error) {
      console.error('Send error:', error)
      setIsApproving(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send to Friend</h2>

      <div className="space-y-4">
        {/* Recipient Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Recipient Username
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="@username"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-0 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Amount and Token */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Amount
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-0 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <select
              value={selectedToken.symbol}
              onChange={(e) => setSelectedToken(TOKEN_OPTIONS.find(t => t.symbol === e.target.value)!)}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-0 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {TOKEN_OPTIONS.map(token => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Message (Optional)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a message..."
            rows={3}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-0 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
        </div>

        {/* Send Info */}
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 space-y-2">
          <div className="flex items-start gap-2">
            <CheckCircle className="text-purple-600 dark:text-purple-400 flex-shrink-0" size={20} />
            <div className="text-sm text-purple-900 dark:text-purple-100">
              {recipient && (
                <>
                  Sending <span className="font-semibold">{amount || '0'} {selectedToken.symbol}</span> to{' '}
                  <span className="font-semibold">{recipient}</span>
                </>
              )}
              {!recipient && 'Enter recipient username to continue'}
            </div>
          </div>
          <div className="text-xs text-purple-800 dark:text-purple-200 ml-7">
            Transfer will be instant if recipient is registered, otherwise held until they register
          </div>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!amount || !recipient || isPending || isApproving || isConfirming}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          {(isPending || isApproving || isConfirming) && <Loader2 className="animate-spin" size={20} />}
          {isApproving ? 'Approving...' : isPending ? 'Sending...' : isConfirming ? 'Confirming...' : (
            <>
              <Send size={20} />
              Send
            </>
          )}
        </button>

        {isSuccess && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center">
            <div className="text-green-600 dark:text-green-400 font-semibold mb-1">Transfer Sent! 🎉</div>
            <div className="text-sm text-green-700 dark:text-green-300">
              {recipient} will receive {amount} {selectedToken.symbol}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}