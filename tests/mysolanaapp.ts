import assert from 'assert';

import * as anchor from '@project-serum/anchor';

import { Mysolanaapp } from '../target/types/mysolanaapp';

describe('mysolanaapp', () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Mysolanaapp as anchor.Program<Mysolanaapp>;
  const baseAccount = anchor.web3.Keypair.generate(); // Keypair生成

  // it('Creates a counter', async () => {
  //   // create関数実行
  //   await program.rpc.create({
  //     accounts: {
  //       baseAccount: baseAccount.publicKey,
  //       user: provider.wallet.publicKey,
  //       systemProgram: anchor.web3.SystemProgram.programId,
  //     },
  //     signers: [baseAccount],
  //   });

  //   // 状態確認
  //   const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  //   console.log('Count 0:', account.count.toString());
  //   assert.ok(account.count.toString() === '0');
  // });

  // it('Increments the counter', async () => {
  //   // create関数実行
  //   await program.rpc.increment({
  //     accounts: { baseAccount: baseAccount.publicKey },
  //   });

  //   // 状態確認
  //   const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  //   console.log('Count 1:', account.count.toString());
  //   assert.ok(account.count.toString() === '1');
  // });

  it('It initializes the account', async () => {
    // initialize関数実行
    await program.rpc.initialize('Hello World!', {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    // 状態確認
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Data:', account.data);
    assert.ok(account.data === 'Hello World!');
  });

  it('Updates a previously created account', async () => {
    // update関数実行
    await program.rpc.update('Something', {
      accounts: { baseAccount: baseAccount.publicKey },
    });

    // 状態確認
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Updated data:', account.data);
    assert.ok(account.data === 'Something');
    console.log('Datalist: ', account.dataList);
    assert.ok(account.dataList.length === 2);
  });
});
