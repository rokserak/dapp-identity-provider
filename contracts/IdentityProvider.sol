// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.4;

import "./StringUtils.sol";
import "hardhat/console.sol";

contract IdentityProvider {
  constructor() {
    console.log("Deploying Identity Provider");
  }

  struct Identity {
    // openid scope
    address sub; // address

    // profile scope
    string name; // Full name
    string given_name;
    string middle_name;
    string family_name;
    string nickname; // Username
    string picture; // CID of profile image on Filecoin network
    uint updated_at; // Block number in which add / update transaction was included

    // email scope
    string email;
    bool email_verified;
  }

  struct IdentityInternal {
    address sub;
    string given_name;
    string middle_name;
    string family_name;
    string nickname;
    string picture;
    uint updated_at;
    string email;
    bool email_verified;
  }

  struct IdentityIn {
    string given_name;
    string middle_name;
    string family_name;
    string nickname;
    string picture;
    string email;
  }

  mapping (address => IdentityInternal) private users;
  uint public userCount = 0;

  function addUser(IdentityIn memory user) public {
    if (users[msg.sender].sub != msg.sender) {
      userCount++;
    }
    IdentityInternal memory newUser = IdentityInternal(msg.sender,
                                                       user.given_name,
                                                       user.middle_name,
                                                       user.family_name,
                                                       user.nickname,
                                                       user.picture,
                                                       block.number,
                                                       user.email,
                                                       true);
    users[msg.sender] = newUser;
  }

  function updateUser(IdentityIn memory user) public {
    users[msg.sender].nickname = user.nickname;
    users[msg.sender].given_name = user.given_name;
    users[msg.sender].middle_name = user.middle_name;
    users[msg.sender].family_name = user.family_name;
    users[msg.sender].picture = user.picture;
    users[msg.sender].email = user.email;
    users[msg.sender].updated_at = block.number;
  }

  function getName() internal view returns(string memory) {
    IdentityInternal memory info = users[msg.sender];
    if (info.sub != msg.sender) {
      return "";
    }
    if (StringUtils.notEmpty(info.middle_name)) {
      return string(bytes.concat(bytes(info.given_name), " ", bytes(info.middle_name), " ", bytes(info.family_name)));
    }
    return string(bytes.concat(bytes(info.given_name), " ", bytes(info.family_name)));
  }

  function getUserInfo() public view returns(Identity memory) {
    return Identity(msg.sender,
                    getName(),
                    users[msg.sender].given_name,
                    users[msg.sender].middle_name,
                    users[msg.sender].family_name,
                    users[msg.sender].nickname,
                    users[msg.sender].picture,
                    users[msg.sender].updated_at,
                    users[msg.sender].email,
                    users[msg.sender].email_verified);
  }
}
