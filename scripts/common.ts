import { JsonRpcProvider, Wallet } from "ethers";
import { ethers } from "hardhat";

export function setupProvider() {
  return new ethers.InfuraProvider("sepolia");
}

export function setupWallet(provider: JsonRpcProvider) {
  return new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
}

export async function checkBalance(provider: JsonRpcProvider, address: string) {
  const balanceBN = await provider.getBalance(address);
  const balance = Number(ethers.formatUnits(balanceBN));

  console.log(`Balance for Wallet ${address} is ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  return balance;
}

export async function getDeployedContract(
  wallet: Wallet,
  contractAddress: string,
  contractName: string = "Ballot"
) {
  return await ethers.getContractAt(contractName, contractAddress, wallet);
}
