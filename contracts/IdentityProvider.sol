pragma solidity ^0.8.0;

import "./StringUtils.sol";

contract IdentityProvider {
  struct Identity {
    string name;
    string given_name;
    string family_name;
  }

  mapping (address => Identity) private users;
  uint public user_count = 0;

  function add_user(Identity memory user) public {
    users[msg.sender] = user;
    user_count++;
  }

  function add_user2(string memory name, string memory given_name, string memory family_name) public {
    Identity memory user = users[msg.sender];
    user.name = name;
    user.given_name = given_name;
    user.family_name = family_name;
    users[msg.sender] = user;
    user_count++;
  }

  function update_user(Identity memory user) public {
    if (StringUtils.notEmpty(user.name)) {
      users[msg.sender].name = user.name;
    }
    if (StringUtils.notEmpty(user.given_name)) {
      users[msg.sender].given_name = user.given_name;
    }
    if (StringUtils.notEmpty(user.family_name)) {
      users[msg.sender].family_name = user.family_name;
    }
  }

  function get_name() public view returns(string memory) {
    Identity memory user = users[msg.sender];
    return user.name;
  }

  function get_full_name() public view returns(string memory) {
    Identity memory info = users[msg.sender];
    return string(bytes.concat(bytes(info.given_name), " ", bytes(info.family_name)));
  }

  function get_user_info() public view returns(Identity memory) {
    return users[msg.sender];
  }
}
