import { ethers, network } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey || privateKey.trim() === "") {
    console.error("Error: PRIVATE_KEY environment variable is not set.");
    console.error("Please provide a valid private key in .env to deploy.");
    process.exit(1);
  }

  const [deployer] = await ethers.getSigners();
  if (!deployer) {
    console.error("Error: No deployer account found. Check your PRIVATE_KEY configuration.");
    process.exit(1);
  }

  const networkName = network.name;
  const currentNetwork = await ethers.provider.getNetwork();
  const chainId = Number(currentNetwork.chainId);

  console.log("=========================================");
  console.log(`Deploying BotCounter from account: ${deployer.address}`);
  console.log(`Target Network: ${networkName} (Chain ID: ${chainId})`);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`Deployer Balance: ${ethers.formatEther(balance)} BOT`);

  // Optimize gas fees - use exact network gas price and estimated gas with modest buffer
  const feeData = await ethers.provider.getFeeData();
  const gasPrice = feeData.gasPrice ?? ethers.parseUnits("20", "gwei");
  console.log(`Current gas price: ${ethers.formatUnits(gasPrice, "gwei")} gwei`);

  const BotCounter = await ethers.getContractFactory("BotCounter");
  const deployTx = await BotCounter.getDeployTransaction();
  const estimatedGas = await ethers.provider.estimateGas(deployTx);
  
  // Modest 15% buffer above estimated gas to prevent out-of-gas while avoiding excess limit
  const gasLimit = (estimatedGas * 115n) / 100n;
  const estimatedTotalCost = gasLimit * gasPrice;
  console.log(`Estimated Gas: ${estimatedGas}`);
  console.log(`Gas Limit: ${gasLimit}`);
  console.log(`Estimated Deployment Cost: ~${ethers.formatEther(estimatedTotalCost)} BOT`);

  console.log("Sending deployment transaction...");
  const botCounter = await BotCounter.deploy({
    gasPrice,
    gasLimit,
  });

  console.log(`Transaction hash: ${botCounter.deploymentTransaction()?.hash}`);
  console.log("Waiting for block confirmation...");
  await botCounter.waitForDeployment();

  const contractAddress = await botCounter.getAddress();
  const explorerBase = "https://scan.botchain.ai";

  console.log("-----------------------------------------");
  console.log("BotCounter deployed successfully!");
  console.log(`Network: ${networkName} (Chain ID: ${chainId})`);
  console.log(`Contract Address: ${contractAddress}`);
  console.log(`Explorer: ${explorerBase}/address/${contractAddress}`);
  console.log("=========================================");
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exit(1);
});
