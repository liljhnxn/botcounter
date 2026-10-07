import { expect } from "chai";
import { ethers } from "hardhat";
import { BotCounter } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("BotCounter", function () {
  let botCounter: BotCounter;
  let owner: HardhatEthersSigner;
  let user1: HardhatEthersSigner;
  let user2: HardhatEthersSigner;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    const BotCounterFactory = await ethers.getContractFactory("BotCounter");
    botCounter = (await BotCounterFactory.deploy()) as BotCounter;
    await botCounter.waitForDeployment();
  });

  describe("Initial state", function () {
    it("Counter starts at 0", async function () {
      expect(await botCounter.getCount()).to.equal(0n);
    });
  });

  describe("Increment", function () {
    it("increment() increases count from 0 to 1", async function () {
      await botCounter.increment();
      expect(await botCounter.getCount()).to.equal(1n);
    });

    it("Multiple increments work correctly", async function () {
      await botCounter.increment();
      await botCounter.increment();
      await botCounter.increment();
      expect(await botCounter.getCount()).to.equal(3n);
    });

    it("CounterIncremented event is emitted with correct sender and new count", async function () {
      await expect(botCounter.connect(user1).increment())
        .to.emit(botCounter, "CounterIncremented")
        .withArgs(user1.address, 1n);

      await expect(botCounter.connect(user2).increment())
        .to.emit(botCounter, "CounterIncremented")
        .withArgs(user2.address, 2n);
    });
  });

  describe("Decrement", function () {
    beforeEach(async function () {
      // Set initial count to 3
      await botCounter.increment();
      await botCounter.increment();
      await botCounter.increment();
    });

    it("decrement() decreases the counter", async function () {
      await botCounter.decrement();
      expect(await botCounter.getCount()).to.equal(2n);
    });

    it("CounterDecremented event is emitted with correct sender and new count", async function () {
      await expect(botCounter.connect(user1).decrement())
        .to.emit(botCounter, "CounterDecremented")
        .withArgs(user1.address, 2n);
    });
  });

  describe("Protection", function () {
    it("decrement() reverts when count is 0", async function () {
      expect(await botCounter.getCount()).to.equal(0n);
      await expect(botCounter.decrement()).to.be.revertedWith(
        "Counter: count is already 0"
      );
    });
  });

  describe("Multiple users", function () {
    it("Multiple wallets can increment/decrement the shared counter", async function () {
      await botCounter.connect(user1).increment();
      expect(await botCounter.getCount()).to.equal(1n);

      await botCounter.connect(user2).increment();
      expect(await botCounter.getCount()).to.equal(2n);

      await botCounter.connect(owner).decrement();
      expect(await botCounter.getCount()).to.equal(1n);
    });

    it("Counter remains global rather than wallet-specific", async function () {
      // user1 increments
      await botCounter.connect(user1).increment();

      // user2 reads the same count
      expect(await botCounter.connect(user2).getCount()).to.equal(1n);

      // user2 decrements user1's incremented count back to 0
      await botCounter.connect(user2).decrement();
      expect(await botCounter.connect(user1).getCount()).to.equal(0n);
    });
  });
});
