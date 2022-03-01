import '@solana/wallet-adapter-react-ui/styles.css';

import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// import HelloWorld from './HelloWorld1';
import HelloWorld from './HelloWorld2';

export default function App() {
  const network = 'http://127.0.0.1:8899'; // localhost
  // const network = clusterApiUrl('devnet'); // devnet/testnet/mainnet-beta
  console.log(network);
  const wallets = [new PhantomWalletAdapter()]; // 対応ウォレット

  return (
    <ConnectionProvider endpoint={network}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <HelloWorld network={network} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
