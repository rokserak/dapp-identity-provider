// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

library StringUtils {
  function empty(string memory a) internal pure returns(bool) {
    return keccak256(abi.encode(a)) == keccak256(abi.encode(""));
  }

  function notEmpty(string memory a) internal pure returns(bool) {
    return !empty(a);
  }
}
