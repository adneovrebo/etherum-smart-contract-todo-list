# Etherum Smart Conctract ToDo list React Application

Testing web3 with etherum smart contract created with truffle and solidity. Using web3 standard to interact with smart contract.

Functionality:

- List tasks
- Toggle tasks
- Create tasks

## Technologies

- Etherum blockchain network
- Web3
- Solidity
- React
- Testing contract with Truffle

## Setup

- Install [Truffle Suite Ganache](https://trufflesuite.com/ganache/) for local blockchain development. Spinup local etherum network to test smart contract.
- truffle for testing

### 1. Start Ganache, add MetaMask to your browser import accounto

- Start Ganache with default configs.
- Add MetaMask extension to your browser.
- Import a testaccount to MetaMask browser extension.

### 2. Compile contract

```bash
truffle compile
# Move TodoList.json from build/contracts to app/src for loading it in the react app.
```

### 3. Deploy contract

```bash
truffle migrate --reset
# --reset deployes a new copy of the contract if you already have one running
```

### 4. Test contract

Start react app

```bash
cd appp && yarn && yarn start
```

Connect to metamask and do your chores!

### Runing automated tests

```bash
truffle test
```
