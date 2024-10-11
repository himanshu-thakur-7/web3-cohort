import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { useState } from "react";

export function SignMessage() {
    const { publicKey, signMessage } = useWallet();
    const [message, setMessage] = useState("");
    async function onClick() {
        if (!publicKey) {
            alert("Please connect your wallet first");
            return;
        }
        if (!signMessage) {
            alert("Message signing not supported");
            return;
        }
        const encodedMessage = new TextEncoder().encode(message);
        console.log(encodedMessage);
        const signature = await signMessage(encodedMessage);
        console.log(signature);
        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
            alert("Signature is not valid");
            return;
        }
        alert(`Signature: ${bs58.encode(signature)}`);

    }
    return (
        <div>
            <input type="text" placeholder="Message" onInputCapture={(e) => {
                console.log((e.target as HTMLInputElement).value);
                setMessage((e.target as HTMLInputElement).value);
            }} />
            <button onClick={onClick} >
                Sign Message
            </button>
        </div>
    )
}