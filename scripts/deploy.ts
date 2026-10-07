import { ethers, network } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey || privateKey.trim() === "") {
    console.error("Error: PRIVATE_KEY environment variable is not set.");
    console.error("Please provide a valid private key in .env to deploy to Botchain Testnet.");
    process.exit(1);
  }

  const [deployer] = await ethers.getSigners();
  if (!deployer) {
    console.error("Error: No deployer account found. Check your PRIVATE_KEY configuration.");
    process.exit(1);
  }

  const networkName = network.name;
  const chainId = (await ethers.provider.getNetwork()).chainId;

  console.log(`Deploying BotCounter from account: ${deployer.address}`);
  console.log(`Target Network: ${networkName} (Chain ID: ${chainId})`);

  const BotCounter = await ethers.getContractFactory("BotCounter");
  const botCounter = await BotCounter.deploy();

  await botCounter.waitForDeployment();

  const contractAddress = await botCounter.getAddress();

  console.log("-----------------------------------------");
  console.log("BotCounter deployed successfully!");
  console.log("Network: Botchain Testnet");
  console.log(`Chain ID: ${chainId}`);
  console.log(`Contract: ${contractAddress}`);
  console.log(`Explorer: https://scan.bohr.life/address/${contractAddress}`);
  console.log("-----------------------------------------");
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exit(1);
});
