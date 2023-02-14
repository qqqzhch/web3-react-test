import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Web3ReactProvider } from "@web3-react/core";
import {ethers} from 'ethers'
import { ToastProvider } from "react-toast-notifications";
import Demo from './demo'
const getLibrary = (provider: any) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Web3ReactProvider getLibrary={getLibrary}>
      <ToastProvider autoDismiss={true} autoDismissTimeout={2000}>
        <Demo></Demo>
      </ToastProvider>
    </Web3ReactProvider>
    </div>
  )
}

export default App
