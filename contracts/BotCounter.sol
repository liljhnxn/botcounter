// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title BotCounter
 * @notice A simple, minimal on-chain counter smart contract on Botchain.
 * @dev Intentionally simple with no admin, owner, or token functionalities.
 */
contract BotCounter {
    uint256 private count;

    event CounterIncremented(address indexed user, uint256 newCount);
    event CounterDecremented(address indexed user, uint256 newCount);

    /**
     * @notice Increments the counter by 1.
     */
    function increment() external {
        count += 1;
        emit CounterIncremented(msg.sender, count);
    }

    /**
     * @notice Decrements the counter by 1.
     * @dev Reverts if counter is already 0 to prevent underflow.
     */
    function decrement() external {
        require(count > 0, "Counter: count is already 0");
        count -= 1;
        emit CounterDecremented(msg.sender, count);
    }

    /**
     * @notice Returns the current counter value.
     * @return Current count.
     */
    function getCount() external view returns (uint256) {
        return count;
    }
}
