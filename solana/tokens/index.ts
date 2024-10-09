import { Connection, LAMPORTS_PER_SOL, clusterApiUrl, PublicKey } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

async function airdrop(publicKey: PublicKey, amount: number) {
    const airdropSignature = await connection.requestAirdrop(publicKey, amount);
    await connection.confirmTransaction(airdropSignature);
}

airdrop(new PublicKey("58VjvqXEtaynySFuRtoYUn5V6kJeXNFQxf45agiLGYe3"), LAMPORTS_PER_SOL).then(() => {
    console.log("Airdrop successful");
})