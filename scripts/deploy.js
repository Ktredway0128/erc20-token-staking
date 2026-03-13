// SPDX-License-Identifier: MIT
// Deploy script for SampleToken using Hardhat

// Import Hardhat runtime environment
const hre = require("hardhat"); 

async function main() {
    // Get deployer account
    const [deployer] = await hre.ethers.getSigners(); 

    // Show which account deploys
    console.log("Deploying contract with account:", deployer.address); 

    // Get contract factory
    const SampleToken = await hre.ethers.getContractFactory("SampleToken"); 

    // Token parameters
    const name = "Sample Token";
    const symbol = "STK";
    const cap = hre.ethers.utils.parseUnits("1000000", 18); // Max supply
    const initialSupply = hre.ethers.utils.parseUnits("100000", 18); // Initial supply to deployer

    // Deploy the contract
    const token = await SampleToken.deploy(name, symbol, cap, initialSupply);

    // Wait until deployment is confirmed
    await token.deployed(); 

    // Show deployed contract address
    console.log("SampleToken deployed to:", token.address); 
}

// Run main and handle errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});