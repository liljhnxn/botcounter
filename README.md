# BotCounter

A simple, clean on-chain counter dApp built on **Botchain Testnet**.

BotCounter demonstrates basic smart contract state modifications on-chain. It is intentionally simple, lightweight, and beginner-friendly with no external databases, backends, or unnecessary bloat.

---

## Features

- **On-Chain Counter**: All counter state resides directly on the Botchain blockchain.
- **Increment**: Increase the counter by 1 with on-chain verification and event emission.
- **Decrement**: Decrease the counter by 1 with underflow protection (cannot decrement below 0).
- **Wallet Connection**: Connect and disconnect Web3 wallets seamlessly using wagmi and viem.
- **Transaction Status**: Clear, human-readable lifecycle states (wallet confirmation, submission, confirmation, failure, rejection).
- **Botchain Explorer Links**: Instant clickable links directly to transactions on Botchain Explorer.
- **Botchain Testnet Support**: Built-in network detection and chain switching to Botchain Testnet (Chain ID 968).

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

- **Network**: Botchain Testnet
- **Chain ID**: `968`
- **RPC URL**: `https://rpc.bohr.life`
- **Explorer**: `https://scan.bohr.life`
- **Native Token**: `BOT`

---

## Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Configure the following variables in `.env`:

```env
# The deployed BotCounter contract address on Botchain Testnet
NEXT_PUBLIC_BOT_COUNTER_ADDRESS=

# Deployer private key (for contract deployment only; DO NOT commit real keys!)
PRIVATE_KEY=

# Botchain Testnet RPC endpoint
BOTCHAIN_RPC_URL=https://rpc.bohr.life
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

### 4. Deploy to Botchain Testnet (Optional)
Ensure `PRIVATE_KEY` with testnet BOT is set in `.env`, then run:
```bash
npm run deploy:testnet
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
