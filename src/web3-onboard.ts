import { init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import {AccountCenter} from '@web3-onboard/core'

const INFURA_KEY = ''

const ethereumRopsten = {
  id: '0x3',
  token: 'rETH',
  label: 'Ethereum Ropsten',
  rpcUrl: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
}

const polygonMainnet = {
  id: '0x89',
  token: 'MATIC',
  label: 'Polygon',
  rpcUrl: 'https://matic-mainnet.chainstacklabs.com',
}

const chains = [ethereumRopsten, polygonMainnet]

const wallets = [injectedModule()]

const appMetadata = {
  name: 'Uniswap Widget Example',
  icon: '<svg>My App Icon</svg>',
  logo:"https://app.safe.global/images/safe-logo-green.png",
  description:
    'Example showcasing how to integrate web3-onboard with uniswap widget.',
  recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' },
    { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
  ],
}

let config:AccountCenter={
  enabled:false
}
// initialize and export Onboard
export default init({
  wallets,
  chains,
  appMetadata,
  accountCenter:{
    desktop:config,
    mobile:config
  }
})