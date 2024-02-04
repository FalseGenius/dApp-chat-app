
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

// Contract address:  0xa513E6E4b8f2a923D98304ec87F64353C4D5C853