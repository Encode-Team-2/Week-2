import { ethers, network } from "hardhat";
import { Ballot, Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
import { checkBalance, setupProvider, setupWallet } from "./common";
dotenv.config();

async function main(): Promise<void> {
  const proposals = process.argv.slice(2);
  printProposals(proposals);
  const provider = setupProvider();
  const wallet = setupWallet(provider);

  const ballotFactory = new Ballot__factory(wallet);
  await checkBalance(provider, wallet.address);
  const ballotContract = await deployContract(ballotFactory, proposals);

  const contractaddress = await ballotContract.getAddress();
  const chairpersonaddress = await ballotContract.chairperson();

  console.log(`Contract deployed to the address ${contractaddress}`);
  console.log(`Chairperson address ${chairpersonaddress}`);

  await printDeployedProposals(proposals, ballotContract);

  console.log(await ballotContract.winningProposal());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function printDeployedProposals(
  proposals: string[],
  ballotContract: Ballot
) {
  for (let index = 0; index < proposals.length; index++) {
    const proposal = await ballotContract.proposals(index);
    const name = ethers.decodeBytes32String(proposal.name);
    console.log({ index, name, proposal });
  }
}

async function deployContract(
  ballotFactory: Ballot__factory,
  proposals: string[]
) {
  const ballotContract = (await ballotFactory.deploy(
    proposals.map(ethers.encodeBytes32String)
  )) as Ballot;
  await ballotContract.waitForDeployment();
  return ballotContract;
}

function printProposals(proposals: string[]) {
  console.log("Deploying Ballot contract");
  console.log("Proposals: ");

  proposals.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });
}
