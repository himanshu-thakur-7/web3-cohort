import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export function ShowBalance() {
    const wallet = useWallet();
    useEffect(() => {
        getBalance();
    }, [wallet.publicKey])

    const { connection } = useConnection();
    const [balance, setBalance] = useState(0);
    async function getBalance() {
        if (wallet && wallet.publicKey) {
            const fetchedBalance = await connection.getBalance(wallet.publicKey);
            setBalance(fetchedBalance / LAMPORTS_PER_SOL);
        }
    }

    return <div>
        <p>SoL Balance: </p> <div>{balance}</div>
    </div>
}
