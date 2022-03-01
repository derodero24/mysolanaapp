import { useState } from 'react';

import { Idl, Program, Provider, Wallet } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ConfirmOptions, Connection, Keypair, PublicKey, SystemProgram } from '@solana/web3.js';

import idl from './idl.json';

/* 定数定義  */
const baseAccount = Keypair.generate(); // アカウント
const programID = new PublicKey(idl.metadata.address); // プログラムID
const opts = { preflightCommitment: 'processed' as ConfirmOptions };

export default function HelloWorld1(props: { network: string }) {
  const [value, setValue] = useState(null);
  const wallet = useWallet();

  const getProvider = async () => {
    // プロバイダーを準備
    const connection = new Connection(props.network, opts.preflightCommitment);
    const provider = new Provider(
      connection,
      wallet as unknown as Wallet,
      opts.preflightCommitment
    );
    return provider;
  };

  const createCounter = async () => {
    const provider = await getProvider();
    const program = new Program(idl as Idl, programID, provider);

    try {
      // create関数実行
      await program.rpc.create({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });

      // 状態更新
      const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
      console.log('account:', account);
      setValue(account.count.toString());
    } catch (err) {
      console.log('Transaction error:', err);
    }
  };

  const increment = async () => {
    const provider = await getProvider();
    const program = new Program(idl as Idl, programID, provider);

    // increment関数実行
    await program.rpc.increment({ accounts: { baseAccount: baseAccount.publicKey } });

    // 状態更新
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('account:', account);
    setValue(account.count.toString());
  };

  if (!wallet.connected) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <WalletMultiButton />
      </div>
    );
  } else {
    return (
      <div className='App'>
        <div>
          {!value && <button onClick={createCounter}>Create counter</button>}
          {value && <button onClick={increment}>Increment counter</button>}

          {value && value >= Number(0) ? <h2>{value}</h2> : <h3>Please create the counter.</h3>}
        </div>
      </div>
    );
  }
}
