import React from 'react';
import { useState, useEffect } from 'react'
import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'

const componentName = () => {
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>()

  // Once the wallet is connected the provider will be defined and we'll set the provider value
  // This provider will then be passed to the Uniswap component in the next step.
  useEffect(() => {
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
    } else {
      // Reset the provider back to 'undefined' such that the 
      // connect wallet option will reappear in the uniswap modal
      setProvider(undefined)
    }
  }, [wallet])

  // The connect wallet function which will be based to the Uniswap component in the next step.
  const connectWallet = () => {
    connect()
  }
    return (
        
        <div>
            <button type="button" onClick={connectWallet}>连接钱包</button>
        </div>
    );
};

export default componentName;