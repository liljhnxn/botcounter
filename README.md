# BotCounter

A simple, clean on-chain counter dApp built on **Botchain Mainnet**.

BotCounter demonstrates basic smart contract state modifications on-chain. It is intentionally simple, lightweight, and beginner-friendly with no external databases, backends, or unnecessary bloat.

---

## Features

- **On-Chain Counter**: All counter state resides directly on the Botchain blockchain.
- **Increment**: Increase the counter by 1 with on-chain verification and event emission.
- **Decrement**: Decrease the counter by 1 with underflow protection (cannot decrement below 0).
- **Wallet Connection**: Connect and disconnect Web3 wallets seamlessly using wagmi and viem.
- **Transaction Status**: Clear, human-readable lifecycle states (wallet confirmation, submission, confirmation, failure, rejection).
- **Botchain Explorer Links**: Instant clickable links directly to transactions on Botchain Explorer.
- **Botchain Mainnet Support**: Built-in network detection and chain switching to Botchain Mainnet (Chain ID 677).

---

## Technology Stack

### Smart Contract
- **Solidity** (`^0.8.24`)
- **Hardhat**
- **Ethers.js / Chai** for unit tests

### Frontend
- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **wagmi** & **viem**
- **TanStack React Query**
- **Lucide React**

---

## Network Details

### Botchain Mainnet
- **Network**: Botchain Mainnet
- **Chain ID**: `677`
- **RPC URL**: `https://rpc.botchain.ai`
- **Explorer**: `https://scan.botchain.ai`
- **Native Token**: `BOT`
- **Total Supply**: `150 Million`
- **Contract Address**: `0x5aa25723c4c701fa8B7028e7ea7881a8bb8A6fFE`

---

## Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Configure the following variables in `.env`:

```env
# The deployed BotCounter contract address on Botchain Mainnet
NEXT_PUBLIC_BOT_COUNTER_ADDRESS=0x5aa25723c4c701fa8B7028e7ea7881a8bb8A6fFE

# Deployer private key (for contract deployment only; DO NOT commit real keys!)
PRIVATE_KEY=

# Botchain Mainnet RPC endpoint
BOTCHAIN_RPC_URL=https://rpc.botchain.ai
```

> **Security Note:** Never commit private keys or sensitive credentials into source control.

---

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Compile Smart Contracts
```bash
npm run compile
```

### 3. Run Smart Contract Tests
Run the comprehensive Hardhat test suite:
```bash
npm test
```

### 4. Deploy to Botchain Mainnet
Ensure `PRIVATE_KEY` with BOT is set in `.env`, then run:
```bash
npm run deploy
```
Once deployed, copy the deployed contract address and set it as `NEXT_PUBLIC_BOT_COUNTER_ADDRESS` in `.env`.

### 5. Start Frontend Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build Frontend for Production
```bash
npm run build
```

---

## Smart Contract Overview

The `BotCounter.sol` contract contains:
- `count`: Private `uint256` variable holding the current count.
- `increment()`: Increments the counter by 1 and emits `CounterIncremented(address user, uint256 newCount)`.
- `decrement()`: Decrements the counter by 1, requiring `count > 0` to prevent underflows, and emits `CounterDecremented(address user, uint256 newCount)`.
- `getCount()`: View function returning the current count.

No admin privileges, owner controls, or hidden logic.
