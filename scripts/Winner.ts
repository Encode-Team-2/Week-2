import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { checkBalance, getDeployedContract, setupProvider, setupWallet } from "./common";

dotenv.config();

async function main(): Promise<void> {
  const ballotAddress = process.argv[2];
  console.log(`Contract address: ${ballotAddress}`);  
  const provider = setupProvider();
  const wallet = setupWallet(provider);
  await checkBalance(provider, wallet.address);

  const ballotContract = await getDeployedContract(wallet, ballotAddress);

  const winnerNameEncoded = await ballotContract.winnerName();
  const winner = ethers.decodeBytes32String(winnerNameEncoded);
  console.log(`winner: ${winner}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

