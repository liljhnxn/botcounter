export const botCounterAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newCount",
        type: "uint256",
      },
    ],
    name: "CounterDecremented",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newCount",
        type: "uint256",
      },
    ],
    name: "CounterIncremented",
    type: "event",
  },
  {
    inputs: [],
    name: "decrement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "increment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const rawContractAddress =
  process.env.NEXT_PUBLIC_BOT_COUNTER_ADDRESS?.trim() || "0x5aa25723c4c701fa8B7028e7ea7881a8bb8A6fFE";

export const isContractConfigured = Boolean(
  rawContractAddress &&
  rawContractAddress.length === 42 &&
  rawContractAddress.startsWith("0x")
);

export const BOT_COUNTER_ADDRESS = (
  isContractConfigured ? rawContractAddress : "0x5aa25723c4c701fa8B7028e7ea7881a8bb8A6fFE"
) as `0x${string}`;
