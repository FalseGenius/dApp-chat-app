
const {ethers} = require("hardhat");

async function main() {
  const contract = await ethers.deployContract("ChatApp");

  await contract.waitForDeployment();

  console.log("Contract address: ", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Contract address:  0x5FbDB2315678afecb367f032d93F642f64180aa3
// Contract on Sepolia: 0x7DaDab700A0DbCaCA03b44E2a9E6182cACD067c1