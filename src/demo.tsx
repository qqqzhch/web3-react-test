import React from 'react';
import { accountDataType } from "./types";
import { useState } from "react";


import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { ethers } from "ethers";

import connectors from "./connectors";
import { useToasts } from "react-toast-notifications";
import { useWeb3React } from "@web3-react/core";

const componentName = () => {
    const { addToast } = useToasts();
    const { library, chainId, account, activate, deactivate, active, error } =
      useWeb3React();

    const [accountData, setAccountData] = useState<null | accountDataType>(null);
    const connectMetaMask = useCallback(async () => {
        let status = false;
        await activate(connectors.metamask, (err: any) => {
          addToast(err.message, { appearance: "error" });
          status = true;
        });
    
        if (!status) {
          localStorage.setItem("walletIsConnectedTo", "metamask");
          addToast("Connected to MetaMask", { appearance: "success" });
        }
      }, [activate, addToast]);
      const connectWalletConnect = useCallback(async () => {
        let status = false;
        await activate(connectors.walletConnect, (err: any) => {
          addToast(err.message, { appearance: "error" });
          status = true;
        });
    
        if (!status) {
          localStorage.setItem("walletIsConnectedTo", "walletConnect");
          addToast("Connected to Wallet Connect", { appearance: "success" });
        }
      }, [activate, addToast]);
      const disConnect = async () => {
        deactivate();
    
        localStorage.removeItem("walletIsConnectedTo");
    
        setAccountData(null);
      };

        // connect on load
  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage.getItem("walletIsConnectedTo") === "metamask") {
        await connectMetaMask();
      }

      if (localStorage.getItem("walletIsConnectedTo") === "walletConnect") {
        await connectWalletConnect();
      }
    };

    connectWalletOnPageLoad();
  }, [connectMetaMask, connectWalletConnect]);
  const walletsToDisplay = [
    { id: 1, title: "MetaMask", imgSrc: "", fn: connectMetaMask },
    { id: 3, title: "WalletConnect", imgSrc: "", fn: connectWalletConnect },
  ];

    //get account data
    useEffect(() => {
        if (active) {
          const checkMetaMaskConnected = async () => {
            const accounts = await library.listAccounts();
    
            const walletAddress = accounts[0];
            const hexBalance = await library.getBalance(walletAddress);
            const balance = ethers.utils.formatEther(hexBalance);
            const network = await library.getNetwork();
            const transactionCount = await library.getTransactionCount(
              walletAddress
            );
            setAccountData({
              accounts,
              walletAddress,
              balance,
              transactionCount,
              network,
            });
          };
    
          checkMetaMaskConnected();
        }
      }, [setAccountData, active, library]);
    
    return (
        <div>
        {walletsToDisplay.map((el) => (
                <button
                    key={el.id}
                    onClick={el.fn}
                    className="px-4 py-2 rounded-full ring-2 ring-green-300"
                >
                    {el.title}
                </button>
                ))}
        </div>
        
    );
};

export default componentName;