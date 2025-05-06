#!/bin/bash

# === CONFIG VARIABLES ===
PROJECT_NAME="elparadisogonzalo"
GIT_REPO="https://github.com/koagonzalo11/koagonzalo11.git"
GCP_PROJECT_ID="elparadisogonzalo_project"
CONTRACTS_DIR="./contracts"
SQL_DIR="./sql"
DOCKER_DIR="./docker"
SYNC_DIR="./sync"
WEB3_DIR="./web3"

# === 1. CLONE GITHUB PROJECT ===
echo "[1/9] Cloning GitHub project..."
git clone $GIT_REPO $PROJECT_NAME
cd $PROJECT_NAME || exit

# === 2. CREATE DIRECTORY STRUCTURE ===
echo "[2/9] Creating directories..."
mkdir -p $CONTRACTS_DIR $SQL_DIR $DOCKER_DIR $SYNC_DIR $WEB3_DIR

# === 3. SMART CONTRACT BOILERPLATE ===
cat > $CONTRACTS_DIR/Elparadiso.sol <<EOF
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Elparadiso {
    string public name = "El Paradiso Gonzalo";

    function greet() public pure returns (string memory) {
        return "Welcome to El Paradiso!";
    }
}
EOF

# === 4. SQL SETUP ===
cat > $SQL_DIR/init.sql <<EOF
CREATE DATABASE elparadiso;
USE elparadiso;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    wallet_address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
EOF

# === 5. DOCKERFILE WITH EVM + SQL + SYNC ===
cat > $DOCKER_DIR/Dockerfile <<EOF
FROM node:18

# Install tools
RUN apt-get update && apt-get install -y \\
    sqlite3 \\
    curl \\
    git \\
    ipfs \\
    geth \\
    solc

# Set working directory
WORKDIR /app

# Copy app structure
COPY ../contracts ./contracts
COPY ../sql ./sql
COPY ../sync ./sync
COPY ../web3 ./web3

# Install Hardhat
RUN npm install -g hardhat

# Install Web3 dependencies
WORKDIR /app/web3
RUN npm init -y && npm install web3 ethers dotenv

# Default to bash
CMD ["bash"]
EOF

# === 6. SYNC SCRIPT ===
cat > $SYNC_DIR/sync.sh <<EOF
#!/bin/bash
echo "Starting sync for Elparadisogonzalo..."
ipfs init
ipfs daemon &
sleep 5
ipfs add -r ../contracts
echo "IPFS sync complete."
EOF
chmod +x $SYNC_DIR/sync.sh

# === 7. GOOGLE CLOUD SDK INIT PLACEHOLDER ===
cat > $DOCKER_DIR/gcloud_init.sh <<EOF
#!/bin/bash
echo "Authenticating Google Cloud project..."
gcloud auth login
gcloud config set project $GCP_PROJECT_ID
gcloud app browse
EOF
chmod +x $DOCKER_DIR/gcloud_init.sh

# === 8. WEB3 STARTER SCRIPT ===
cat > $WEB3_DIR/index.js <<EOF
require('dotenv').config();
const Web3 = require('web3');

const provider = new Web3.providers.HttpProvider(process.env.RPC_URL || "http://localhost:8545");
const web3 = new Web3(provider);

(async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Connected accounts:", accounts);
})();
EOF

cat > $WEB3_DIR/.env <<EOF
RPC_URL=http://localhost:8545
EOF

# === 9. DOCKER COMPOSE ===
cat > docker-compose.yml <<EOF
version: '3'
services:
  elparadiso:
    build:
      context: ./docker
    volumes:
      - ./contracts:/app/contracts
      - ./sql:/app/sql
      - ./sync:/app/sync
      - ./web3:/app/web3
    tty: true
EOF

# === DONE ===
echo "Setup complete. To start your container, run: docker-compose up -d"
