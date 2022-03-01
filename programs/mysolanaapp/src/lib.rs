use anchor_lang::prelude::*;

declare_id!("DaWX1kU8QBQRJGb4g8ib3gLyCqoLwSkyyGTiQjrNS7i6");

#[program]
mod mysolanaapp {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, data: String) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        let copy_data = data.clone();
        base_account.data = data;
        base_account.data_list.push(copy_data);
        Ok(())
    }

    pub fn update(ctx: Context<Update>, data: String) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        let copy = data.clone();
        base_account.data = data;
        base_account.data_list.push(copy);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 64 + 64)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

#[account]
pub struct BaseAccount {
    pub data: String,
    pub data_list: Vec<String>,
}
