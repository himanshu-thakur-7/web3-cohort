import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { Keypair, Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

const payer = Keypair.fromSecretKey(Uint8Array.from([21, 131, 15, 61, 112, 42, 116, 203, 94, 84, 233, 227, 24, 166, 206, 199, 5, 131, 20, 129, 151, 17, 93, 44, 224, 119, 68, 206, 35, 212, 130, 128, 61, 90, 79, 88, 238, 50, 24, 153, 21, 101, 231, 186, 149, 130, 40, 100, 189, 69, 56, 179, 162, 128, 176, 39, 109, 36, 178, 39, 199, 186, 215, 40]))

const mintAthority = payer;

const connection = new Connection(clusterApiUrl("devnet"));

async function createMintForToken(payer: Keypair, mintAuthority: PublicKey) {
    const mint = await createMint(
        connection,
        payer,
        mintAuthority,
        null,
        0,
    );

    console.log('Mint Created at : ', mint.toBase58());
    return mint;
}

async function mintNewTokens(mint, to, amount) {
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        new PublicKey(to),
    );
    await mintTo(
        connection,
        payer,
        mint,
        tokenAccount.address,
        payer,
        amount,
    );
    console.log('Minted', amount, 'tokens to', tokenAccount.address.toBase58());
}

async function main() {
    const mint = await createMintForToken(payer, mintAthority.publicKey);
    await mintNewTokens(mint, payer.publicKey, 100);
}

main();