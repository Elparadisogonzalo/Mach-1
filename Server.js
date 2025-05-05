const express = require('express');
const { ethers } = require('ethers');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = 3000;

// Middleware to serve static files (like CSS, JS)
app.use(express.static('public'));

// Load Infura Project ID securely from .env
const infuraProjectId = process.env.INFURA_PROJECT_ID;
const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${infuraProjectId}`);

// Define your contract ABI
const contractABI = [
  // ABI contents here
];

// List of contract addresses
const contractAddresses = [
  '0x38b6088849e98115315bad2786f6490474158c33',
  '0x4E8C73E7f243D12B7A5571200609523A4890beff',
  '0xB8c77482e45F1F44dE1745F52C74426C631bDD52'
];

async function fetchContractData(address) {
  const contract = new ethers.Contract(address, contractABI, provider);
  try {
    const name = await contract.name();  
    const symbol = await contract.symbol();
    const totalSupply = await contract.totalSupply();
    const decimals = await contract.decimals();
    const merkleRoot = await contract.merkleRoot();
    const balance = await contract.balanceOf('0x802ba6a112f4a7bbbc2d63c8ef4bc14dfcbe6245'); // Replace with real address

    return {
      name,
      symbol,
      totalSupply: totalSupply.toString(),
      decimals,
      merkleRoot,
      balance: balance.toString(),
    };
  } catch (error) {
    console.error(`Error fetching data for contract ${address}:`, error);
    return { error: `Error fetching data for contract ${address}` };
  }
}

// Route to fetch contract data for all contracts
app.get('/all-contract-data', async (req, res) => {
  try {
    const allData = await Promise.all(contractAddresses.map(address => fetchContractData(address)));
    res.json(allData);
  } catch (error) {
    console.error('Error fetching data for all contracts:', error);
    res.status(500).json({ error: 'Error fetching data for all contracts' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
