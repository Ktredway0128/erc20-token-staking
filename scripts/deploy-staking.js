// const hre = require("hardhat");

// async function main() {
//     const [deployer] = await hre.ethers.getSigners();
//     console.log("Deploying contract with account:", deployer.address);

//     const SampleToken = await hre.ethers.getContractFactory("SampleToken");

//     const name = "Sample Token";
//     const symbol = "STK";
//     const cap = hre.ethers.utils.parseUnits("1000000", 18);
//     const initialSupply = hre.ethers.utils.parseUnits("100000", 18);

//     const token = await SampleToken.deploy(name, symbol, cap, initialSupply);
//     await token.deployed();

//     console.log("SampleToken deployed to:", token.address);

//     // Wait for a few block confirmations before verifying
//     console.log("Waiting for block confirmations...");
//     await token.deployTransaction.wait(5);

//     // Verify on Etherscan
//     console.log("Verifying contract on Etherscan...");
//     await hre.run("verify:verify", {
//         address: token.address,
//         constructorArguments: [name, symbol, cap, initialSupply],
//     });

//     console.log("Contract verified!");
// }

// main().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });


const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Deploy mock token
  const ERC20Mock = await hre.ethers.getContractFactory("ERC20Mock");
  const mockToken = await ERC20Mock.deploy(
    "Sample Token",
    "STK",
    hre.ethers.utils.parseUnits("1000000", 18)
  );
  await mockToken.deployed();
  console.log("MockToken deployed to:", mockToken.address);

  // Deploy staking contract
  const TokenStaking = await hre.ethers.getContractFactory("TokenStaking");
  const staking = await TokenStaking.deploy(
    mockToken.address,
    mockToken.address,
    deployer.address
  );
  await staking.deployed();
  console.log("TokenStaking deployed to:", staking.address);
  console.log("MockToken address for dashboard testing:", mockToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });