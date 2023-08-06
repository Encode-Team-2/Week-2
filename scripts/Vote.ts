import * as dotenv from "dotenv";
import {
  checkBalance,
  getDeployedContract,
  setupProvider,
  setupWallet,
} from "./common";

dotenv.config();

async function main(): Promise<void> {
  const ballotAddress = process.argv[2];
  const voteIndex = process.argv[3];

  const provider = setupProvider();
  const wallet = setupWallet(provider);
  await checkBalance(provider, wallet.address);
  const ballotContract = await getDeployedContract(wallet, ballotAddress);

  await ballotContract.vote(voteIndex);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
