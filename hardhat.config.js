require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  solidity: "0.8.17",
  // networks: {
  //   goerli: {
  //     url: process.env.ALCHEMY_API_KEY_URL,
  //     accounts: [process.env.MUMBAI_PRIVATE_KEY],
  //   },
  // },
};
