import { expect } from "chai";
import { ethers } from "hardhat";
import { Ballot } from "../typechain-types";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

const PROPOSALS = ["proposal1", "proposal2", "proposal3"];

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let i = 0; i < array.length; i++) {
    bytes32Array.push(ethers.encodeBytes32String(array[i]));
  }
  return bytes32Array;
}

const deployContract = async () => {
  const ballotFactory = await ethers.getContractFactory("Ballot");
  let [deployer, user1] = await ethers.getSigners();
  const ballotContract = await ballotFactory
    .connect(deployer)
    .deploy(convertStringArrayToBytes32(PROPOSALS));
  await ballotContract.waitForDeployment();
  return ballotContract;
};

describe("Ballot", () => {
  let ballotContract: Ballot;

  beforeEach(async () => {
    ballotContract = await loadFixture(deployContract);
  });

  describe("when the contract is deployed", () => {
    it("has the provided proposals", async () => {
      for (let i = 0; i < PROPOSALS.length; i++) {
        const proposal = await ballotContract.proposals(i);
        expect(ethers.decodeBytes32String(proposal.name)).to.equal(
          PROPOSALS[i]
        );
      }
    });

    it("has zero votes for all proposals", async () => {
      for (let i = 0; i < PROPOSALS.length; i++) {
        const proposal = await ballotContract.proposals(i);
        expect(proposal.voteCount).to.equal(0);
      }
    });
    it("sets the deployer address as chairperson", async () => {
      const [deployer, user1] = await ethers.getSigners();
      const chairperson = await ballotContract.chairperson();
      expect(chairperson).to.equal(deployer.address);
    });
    it("sets the voting weight for the chairperson as 1", async () => {
      const [deployer, user1] = await ethers.getSigners();
      const initialWeight = await ballotContract.voters(deployer.address);
      expect(initialWeight.weight).to.equal(1);
    });
  });

  describe("when the chairperson interacts with the giveRightToVote function in the contract", async () => {
    it("gives right to vote for another address", async () => {
      const [deployer, user1] = await ethers.getSigners();
      await ballotContract.connect(deployer).giveRightToVote(user1.address);
      const user1Weight = await ballotContract.voters(user1.address);
      expect(user1Weight.weight).to.equal(1);
    });
    it("cannot give right to vote for someone that has voted", async () => {
      const [deployer, user1] = await ethers.getSigners();
      await ballotContract.connect(deployer).giveRightToVote(user1.address);
      await ballotContract.connect(user1).vote(0);
      await expect(
        ballotContract.connect(deployer).giveRightToVote(user1.address)
      ).to.be.revertedWith("The voter already voted.");
    });
    it("cannot give right to vote for someone that has already been given right to vote", async () => {
      const [deployer, user1] = await ethers.getSigners();
      await ballotContract.connect(deployer).giveRightToVote(user1.address);
      await expect(
        ballotContract.connect(deployer).giveRightToVote(user1.address)
      ).to.be.revertedWith("The voter already has right to vote.");
    });
  });

  describe("when the voter interacts with the vote function in the contract", async () => {
    it("should register the vote", async () => {
      const [deployer, user1] = await ethers.getSigners();
      await ballotContract.connect(deployer).giveRightToVote(user1.address);
      await ballotContract.connect(user1).vote(0);
      const proposal = await ballotContract.winningProposal();
      expect(proposal).to.equal(0);
    });
  });

  describe("when the voter interacts with the delegate function in the contract", async () => {
    it("should transfer voting power", async () => {
      const [deployer, user1, user2] = await ethers.getSigners();
      await ballotContract.connect(deployer).giveRightToVote(user1.address);
      await ballotContract.connect(deployer).giveRightToVote(user2.address);
      await ballotContract.connect(user1).delegate(user2.address);
      const user2Weight = await ballotContract.voters(user2.address);
      expect(user2Weight.weight).to.equal(2);
    });
  });

  describe("when an account other than the chairperson interacts with the giveRightToVote function in the contract", async () => {
    it("should reverts", async () => {
      const [deployer, user1, user2] = await ethers.getSigners();
      await expect(
        ballotContract.connect(user1).giveRightToVote(user2.address)
      ).to.be.revertedWith("Only chairperson can give right to vote.");
    });
  });

  describe("when an account without right to vote interacts with the vote function in the contract", async () => {
    it("should reverts", async () => {
      const [deployer, user1, user2] = await ethers.getSigners();
      await expect(ballotContract.connect(user1).vote(0)).to.be.revertedWith(
        "Has no right to vote."
      );
    });
  });

  describe("when an account without right to vote interact with the delegate function in the contract", async () => {
    it("should reverts", async () => {
      const [deployer, user1, user2] = await ethers.getSigners();
      await expect(ballotContract.connect(user1).delegate(user2.address)).to.be
        .reverted;
    });
  });

  describe("when someone interacts with the winningProposal function before any vote has been casted", async () => {
    it("should return 0", async () => {
      const [deployer, user1, user2] = await ethers.getSigners();
      const proposal = await ballotContract.connect(deployer).winningProposal();
      expect(proposal).to.equal(0n);
    });
  });

  describe("when someone interacts with the winnerName function before any votes are cast", async () => {
    it("should return name of proposal 0", async () => {
      const [deployer, user1, user2] = await ethers.getSigners();
      const winnerName = await ballotContract.winnerName();
      const winnerNameString = ethers.decodeBytes32String(winnerName);
      expect(winnerNameString).to.equal(PROPOSALS[0]);
    });
  });

  describe("when someone interacts with the winnerName function after one vote is cast for the first proposal", async () => {
    it("should return name of proposal 0", async () => {
      const [deployer, user1, user2] = await ethers.getSigners();
      await ballotContract.connect(deployer).giveRightToVote(user1.address);
      await ballotContract.connect(user1).vote(0);
      const winnerName = await ballotContract.winnerName();
      const winnerNameString = ethers.decodeBytes32String(winnerName);
      expect(winnerNameString).to.equal(PROPOSALS[0]);
    });
  });

  describe("when someone interacts with the winningProposal function and winnerName after 5 random votes are cast for the proposals", async () => {
    it("should return the correct winner", async () => {
      const [deployer, user1, user2, user3, user4, user5] =
        await ethers.getSigners();
      await ballotContract.connect(deployer).giveRightToVote(user1.address);
      await ballotContract.connect(deployer).giveRightToVote(user2.address);
      await ballotContract.connect(deployer).giveRightToVote(user3.address);
      await ballotContract.connect(deployer).giveRightToVote(user4.address);
      await ballotContract.connect(deployer).giveRightToVote(user5.address);
      await ballotContract.connect(user1).vote(0);
      await ballotContract.connect(user2).vote(1);
      await ballotContract.connect(user3).vote(2);
      await ballotContract.connect(user4).vote(0);
      await ballotContract.connect(user5).vote(0);
      const winnerName = await ballotContract.winnerName();
      const winnerNameString = ethers.decodeBytes32String(winnerName);
      expect(winnerNameString).to.equal(PROPOSALS[0]);
    });
  });
});
