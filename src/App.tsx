import { useState, useEffect } from 'react'

import { ethers } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'
import { Web3OnboardProvider } from '@web3-onboard/react'
import web3Onboard from './web3-onboard'
import Demo2 from './demo2'

export default function App() {


  return (
    <main>
      <h1>Uniswap Swap Widget</h1>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <Demo2></Demo2>
      </Web3OnboardProvider>
    </main>
  )
}