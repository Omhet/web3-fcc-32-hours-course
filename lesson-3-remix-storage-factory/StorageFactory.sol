// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./SimpleStorage.sol";

contract StorageFactory {
    SimpleStorage[] public simpleStorages;

    function createSimpleStorageContract() public {
        simpleStorages.push(new SimpleStorage());
    }

    function storageFactoryStore(uint256 _storageIndex, uint256 _storageNumber) public {
        simpleStorages[_storageIndex].store(_storageNumber);
    }

    function storageFactoryGet(uint256 _storageIndex) public view returns (uint256) {
        return simpleStorages[_storageIndex].retreive();
    }
}
