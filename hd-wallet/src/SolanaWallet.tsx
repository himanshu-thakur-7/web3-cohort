import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";

interface Mnemonic {
    mnemonic: string
}
export function SolanaWallet({ mnemonic }: Mnemonic) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState<PublicKey[]>([]);

    return <div>
        <button onClick={async () => {
            const seed = await mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString("hex")).key
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);
            setPublicKeys([...publicKeys, keypair.publicKey]);
            setCurrentIndex(currentIndex + 1);

        }}>
            Add Solana Wallet
        </button>
        Public Keys:
        <div>
            {publicKeys.map((p: PublicKey, index: number) => <div key={index}>
                {p.toBase58()}
            </div>)}

        </div>
    </div>
}