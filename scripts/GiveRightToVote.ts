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
  const voterAddress = process.argv[3];
  console.log(ballotAddress);
  const provider = setupProvider();
  const wallet = setupWallet(provider);
  await checkBalance(provider, wallet.address);

  const ballotContract = await getDeployedContract(wallet, ballotAddress);

  await ballotContract.giveRightToVote(voterAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
