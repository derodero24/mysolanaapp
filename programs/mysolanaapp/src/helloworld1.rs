use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;
declare_id!("DaWX1kU8QBQRJGb4g8ib3gLyCqoLwSkyyGTiQjrNS7i6");

#[program]
mod mysolanaapp {
    use super::*;

    pub fn create(ctx: Context<Create>) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        base_account.count = 0;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        base_account.count += 1;
        Ok(())
    }
}

// Transaction instructions
#[derive(Accounts)]
pub struct Create<'info> {
    // init: アカウント初期化
    // payer = user: userがrentを支払うこと
    // space = 16 + 16: 指定のスペースが確保できること。バイト単位。
    #[account(init, payer = user, space = 16 + 16)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)] // payerであるuserがmutableであること
    pub user: Signer<'info>,
    // system_programがSolanaの公式システムプログラムであること
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}

// Transaction instructions
#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)] // base_accountがmutableであること
    pub base_account: Account<'info, BaseAccount>,
}

// An account that goes inside a transaction instruction
#[account]
pub struct BaseAccount {
    pub count: u64,
}
