pragma solidity ^0.8.0;

library StringUtils {
  function empty(string memory a) internal pure returns(bool) {
    return keccak256(abi.encode(a)) == keccak256("");
  }

  function notEmpty(string memory a) internal pure returns(bool) {
    return !empty(a);
  }
}
