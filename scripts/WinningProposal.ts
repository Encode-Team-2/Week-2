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

  const winningProposal = await ballotContract.winningProposal();
  console.log(`WinningProposal: ${winningProposal}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

