# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```


# Ballot Contract

## Deploy Contract

```sh
yarn run ts-node --files scripts/DeployBallot.ts cookie macha mango chocolate
yarn run v1.22.19
$ /workspaces/Week-2/node_modules/.bin/ts-node --files scripts/DeployBallot.ts cookie macha mango chocolate min
Deploying Ballot contract
Proposals: 
Proposal N. 1: cookie
Proposal N. 2: macha
Proposal N. 3: mango
Proposal N. 4: chocolate
Proposal N. 5: min
Contract deployed to the address 0x5FbDB2315678afecb367f032d93F642f64180aa3
{
  index: 0,
  name: 'cookie',
  proposal: Result(2) [
    '0x636f6f6b69650000000000000000000000000000000000000000000000000000',
    0n
  ]
}
{
  index: 1,
  name: 'macha',
  proposal: Result(2) [
    '0x6d61636861000000000000000000000000000000000000000000000000000000',
    0n
  ]
}
{
  index: 2,
  name: 'mango',
  proposal: Result(2) [
    '0x6d616e676f000000000000000000000000000000000000000000000000000000',
    0n
  ]
}
{
  index: 3,
  name: 'chocolate',
  proposal: Result(2) [
    '0x63686f636f6c6174650000000000000000000000000000000000000000000000',
    0n
  ]
}
{
  index: 4,
  name: 'min',
  proposal: Result(2) [
    '0x6d696e0000000000000000000000000000000000000000000000000000000000',
    0n
  ]
}
Done in 6.85s.
```

## Give right to Vote

Arguments: Contract addtress and voter address

```sh
yarn ts-node --files scripts/GiveRightToVote.ts 0x2D1f19684A4c4Cd8541b9c18198447703908646F 0x08206dA8cB2680c4138F21fC22aF8C0e6704CefF
```

## Vote

Arguments: Contract address and vote index

```sh
yarn ts-node --files scripts/Vote.ts 0x2D1f19684A4c4Cd8541b9c18198447703908646F 0
```

## Delegate
Arguments: contractAddress and anotherVoterAddresss

```sh
yarn ts-node --files scripts/Delegate.ts 0x5FbDB2315678afecb367f032d93F642f64180aa3 0x2bdB408FDD46C605095eC76427437d1c846
10ABF
```

## Check WinningProposals

Run command and specify contract address as an argument

```sh 
yarn run ts-node --files scripts/WinningProposal.ts 0x57c470bCf6595f092a395686D9d7A11558E4E062
```
Sample output

```
Contract address: 0x57c470bCf6595f092a395686D9d7A11558E4E062
Balance for Wallet 0x2dc7709B7af83c61c82cbd2555DCda60ec481c29 is 0.4956153285677416
WinningProposal: 0
Done in 4.45s.
```
