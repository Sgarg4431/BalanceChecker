require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
module.exports = {
  solidity: "0.8.18",
  networks:{
    sepolia:{
      url:"https://sepolia.infura.io/v3/de961f85a609442fb52bf535b5a8e4fc",
      accounts:[process.env.privateKey]
    }
  }
};
