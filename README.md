# Week2 Weekend Project

Prepare env 

```shell
yarn install 
yarn hardhat compile
yarn hardhat test
```


# Ballot Contract

## Deploy Contract

```sh
$ yarn run ts-node --files scripts/DeployBallot.ts cookie macha mango chocolate lemon
yarn run v1.22.19
$ /workspaces/Week-2/node_modules/.bin/ts-node --files scripts/DeployBallot.ts cookie macha mango chocolate lemon
Deploying Ballot contract
Proposals: 
Proposal N. 1: cookie
Proposal N. 2: macha
Proposal N. 3: mango
Proposal N. 4: chocolate
Proposal N. 5: lemon
Balance for Wallet 0x2dc7709B7af83c61c82cbd2555DCda60ec481c29 is 0.4900408601476388
Contract deployed to the address 0xdB27a3E0B47540759386f144F4523d2aC95f4b76
Chairperson address 0x2dc7709B7af83c61c82cbd2555DCda60ec481c29
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
  name: 'lemon',
  proposal: Result(2) [
    '0x6c656d6f6e000000000000000000000000000000000000000000000000000000',
    0n
  ]
}
0n
Done in 14.08s.
```

## Give right to Vote

Arguments: Contract addtress and voter address

```sh
yarn ts-node --files scripts/GiveRightToVote.ts 0xdB27a3E0B47540759386f144F4523d2aC95f4b76 {voterAddress}
```

## Vote

Arguments: Contract address and vote index

```sh
yarn ts-node --files scripts/Vote.ts 0xdB27a3E0B47540759386f144F4523d2aC95f4b76 {voteIndex}
```

## Delegate
Arguments: contractAddress and anotherVoterAddresss

```sh
yarn ts-node --files scripts/Delegate.ts 0xdB27a3E0B47540759386f144F4523d2aC95f4b76 {voterAddress}
10ABF
```

## Check WinningProposals

Run command and specify contract address as an argument

```sh 
yarn run ts-node --files scripts/WinningProposal.ts 0xdB27a3E0B47540759386f144F4523d2aC95f4b76
```
Sample output

```
Contract address: 0xdB27a3E0B47540759386f144F4523d2aC95f4b76
Balance for Wallet 0x2dc7709B7af83c61c82cbd2555DCda60ec481c29 is 0.4956153285677416
WinningProposal: 0
Done in 4.45s.
```


## WInner Name

```sh
yarn run ts-node --files scripts/Winner.ts 0xdB27a3E0B47540759386f144F4523d2aC95f4b76 
Contract address: 0xdB27a3E0B47540759386f144F4523d2aC95f4b76
Balance for Wallet 0x2dc7709B7af83c61c82cbd2555DCda60ec481c29 is 0.48851418705860866
winner: cookie
Done in 4.31s.
```