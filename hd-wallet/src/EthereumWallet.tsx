import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
interface Mnemonic {
    mnemonic: string
}
export function EthereumWallet({ mnemonic }: Mnemonic) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState<string[]>([]);

    return <div>
        <button onClick={async () => {
            const seed = await mnemonicToSeed(mnemonic);
            const derivePath = `m/44'/60'/${currentIndex}'/0'`;
            const hdNode = HDNodeWallet.fromSeed(seed);
            const child = hdNode.derivePath(derivePath);
            const privateKey = child.privateKey;
            const wallet = new Wallet(privateKey);
            setAddresses([...addresses, wallet.address]);
            setCurrentIndex(currentIndex + 1);

        }}>
            Add Ethereum Wallet
        </button>
        Public Keys: 
        {addresses.map(p => <div>
            Eth - {p}
        </div>)}
    </div>
}