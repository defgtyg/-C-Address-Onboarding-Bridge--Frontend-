"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { connectWallet, checkConnection, getWalletAddress, getCurrentNetwork } from "@/lib/stellar";

const APP_NETWORK_KEY = "stellar_app_network";

function getEnvNetwork(): "PUBLIC" | "TESTNET" {
  const v = process.env.NEXT_PUBLIC_STELLAR_NETWORK?.toUpperCase();
  return v === "PUBLIC" ? "PUBLIC" : "TESTNET";
}

function loadPersistedNetwork(): "PUBLIC" | "TESTNET" {
  if (typeof window === "undefined") return getEnvNetwork();
  const stored = localStorage.getItem(APP_NETWORK_KEY);
  return stored === "PUBLIC" || stored === "TESTNET" ? stored : getEnvNetwork();
}

interface WalletContextType {
  address: string | null;
  publicKey: string | null;
  network: "PUBLIC" | "TESTNET";
  walletNetwork: "PUBLIC" | "TESTNET";
  appNetwork: "PUBLIC" | "TESTNET";
  isNetworkMismatched: boolean;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchNetwork: (net: "PUBLIC" | "TESTNET") => void;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  publicKey: null,
  network: "TESTNET",
  walletNetwork: "TESTNET",
  appNetwork: "TESTNET",
  isNetworkMismatched: false,
  isConnected: false,
  isConnecting: false,
  connect: async () => {},
  disconnect: () => {},
  switchNetwork: () => {},
});

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [walletNetwork, setWalletNetwork] = useState<"PUBLIC" | "TESTNET">("TESTNET");
  const [appNetwork, setAppNetwork] = useState<"PUBLIC" | "TESTNET">(() => loadPersistedNetwork());
  const [isConnecting, setIsConnecting] = useState(false);

  const switchNetwork = useCallback((net: "PUBLIC" | "TESTNET") => {
    setAppNetwork(net);
    localStorage.setItem(APP_NETWORK_KEY, net);
  }, []);

  const updateConnection = useCallback(async () => {
    const isConnected = await checkConnection();
    if (isConnected) {
      const pk = await getWalletAddress();
      const net = await getCurrentNetwork();
      setAddress(pk);
      setWalletNetwork(net);
    } else {
      setAddress(null);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(updateConnection, 0);
    const interval = setInterval(updateConnection, 3000);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, [updateConnection]);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    try {
      const pk = await connectWallet();
      if (pk) {
        setAddress(pk);
        const net = await getCurrentNetwork();
        setWalletNetwork(net);
      }
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
  }, []);

  const isNetworkMismatched = !!address && walletNetwork !== appNetwork;
  const network = appNetwork;

  return (
    <WalletContext.Provider
      value={{
        address,
        publicKey: address,
        network,
        walletNetwork,
        appNetwork,
        isNetworkMismatched,
        isConnected: !!address,
        isConnecting,
        connect,
        disconnect,
        switchNetwork,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
