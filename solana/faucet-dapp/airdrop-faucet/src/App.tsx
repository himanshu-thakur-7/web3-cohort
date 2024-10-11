import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { RequestAirdrop } from "./RequestAirdrop"
import { WalletModalProvider, WalletMultiButton, WalletDisconnectButton } from "@solana/wallet-adapter-react-ui"
import { ShowBalance } from "./ShowBalance"
import { SignMessage } from "./SignMessage"
import { SendTransaction } from "./sendTransaction"

function App() {

  return (
    <>
      <ConnectionProvider endpoint='https://solana-devnet.g.alchemy.com/v2/Lr6RE6ob_qWSUicQI0vjqriYjvDOm7sI'>
        <WalletProvider wallets={[]} >
          <WalletModalProvider>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
            <div>
              <RequestAirdrop />
              <ShowBalance />
              <SignMessage />
              <br></br>
              <SendTransaction />
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  )
}

export default App
