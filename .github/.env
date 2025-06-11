// index.js
import { MetaMaskSDK } from "@metamask/sdk"

const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "Example Node.js Dapp",
  },
  infuraAPIKey: 429c528a2c524a0ba1fa538343d025b2,
  // Other options.
})

const accounts = await MMSDK.connect()
const provider = MMSDK.getProvider()
provider.request({ method: "eth_accounts", params: [] })
