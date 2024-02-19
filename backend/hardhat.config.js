require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({path:".env"});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks:{
    sepolia:{
      url:process.env.API_URL,
      accounts:[process.env.PRIVATE_KEY]
    }
  }
};
