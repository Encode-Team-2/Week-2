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
