const contractInfoDiv = document.getElementById('contract-info');
const loadDataBtn = document.getElementById('loadDataBtn');

// Function to fetch contract data
async function fetchContractData() {
    try {
        const response = await fetch('/all-contract-data');
        const contractData = await response.json();

        if (contractData.length === 0) {
            contractInfoDiv.innerHTML = '<p>No data found.</p>';
            return;
        }

        let dataHTML = '<h3>Contract Data</h3>';
        contractData.forEach((data, index) => {
            dataHTML += `
                <div class="contract-data">
                    <h4>Contract ${index + 1}</h4>
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Symbol:</strong> ${data.symbol}</p>
                    <p><strong>Total Supply:</strong> ${data.totalSupply}</p>
                    <p><strong>Balance:</strong> ${data.balance}</p>
                    <p><strong>Merkle Root:</strong> ${data.merkleRoot}</p>
                </div>
            `;
        });

        contractInfoDiv.innerHTML = dataHTML;
    } catch (error) {
        console.error('Error fetching contract data:', error);
        contractInfoDiv.innerHTML = '<p>Error fetching contract data.</p>';
    }
}

// Add event listener to the button
loadDataBtn.addEventListener('click', fetchContractData);
