import { useState } from 'react'
import './App.css'
import { generateMnemonic } from 'bip39';
import { SolanaWallet } from './SolanaWallet';
import { EthereumWallet } from './EthereumWallet';

function App() {
  const [mnemonic, setMnemonic] = useState("")

  return (
    <>
      <button onClick={async function () {
        const mn = await generateMnemonic();
        setMnemonic(mn);
      }}>
        Generate Seed Phrase
      </button>
      <input type='text' value={mnemonic}></input>
      <SolanaWallet mnemonic={mnemonic} />
      <EthereumWallet mnemonic={mnemonic} />
    </>
  )
}

export default App
