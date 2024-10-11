import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";
import { Buffer } from "buffer";

window.Buffer = Buffer;
export function SendTransaction() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState(0);

    async function sendTokens() {
        if (!wallet.publicKey) {
            alert("Please connect your wallet first");
            return;
        }
        const transaction = new Transaction();
        console.log(transaction);
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: new PublicKey(to),
                lamports: amount * LAMPORTS_PER_SOL
            })
        );
        console.log(transaction);


        try {
            const signature = await wallet.sendTransaction(transaction, connection);
            console.log('Transaction sent:', signature);
        } catch (error) {
            console.error('Error sending transaction:', error);
        }

    }

    return (<div>
        <input type="text" placeholder="To" onInput={(e) => {
            console.log((e.target as HTMLInputElement).value);
            setTo((e.target as HTMLInputElement).value);
        }} />
        <input type="text" placeholder="Amount" onInput={(e) => {
            console.log((e.target as HTMLInputElement).value);
            setAmount(Number((e.target as HTMLInputElement).value));
        }} />
        <button onClick={sendTokens}>Send</button>
    </div>
    );
}