import { config } from './config';
import { ethers } from 'ethers';

async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();

    console.log("Connected wallet:", userAddress);

    const contract = new ethers.Contract(
      config.contract.address,
      config.contract.abi,
      signer
    );

    // Example: Read or call contract functions
    // const result = await contract.someReadFunction();
  }
}
