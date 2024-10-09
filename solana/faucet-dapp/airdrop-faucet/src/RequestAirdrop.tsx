import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function RequestAirdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();

    async function requestAirdrop() {
        if (!wallet.publicKey) {
            alert("Please connect your wallet first");
            return;
        }
        console.log(wallet.publicKey);
        let amount: string = (document.getElementById("amount") as HTMLInputElement)?.value;
        console.log(Number(amount) * LAMPORTS_PER_SOL);
        await connection.requestAirdrop(wallet.publicKey, Number(amount));
        alert(`Airdropped ${amount} LAMPORTS to ${wallet.publicKey.toBase58()}`);
    }
    return (
        <div>
            <br /><br />
            <input id="amount" type="text" placeholder="Amount"></input>
            <button onClick={requestAirdrop}>Request Airdrop</button>
        </div>
    )
}