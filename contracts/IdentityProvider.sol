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
  uint public user_count = 0;

  function add_user(IdentityIn memory user) public {
    if (users[msg.sender].sub != msg.sender) {
      user_count++;
    }
    IdentityInternal memory new_user = IdentityInternal(msg.sender,
                                                        user.given_name,
                                                        user.middle_name,
                                                        user.family_name,
                                                        user.nickname,
                                                        user.picture,
                                                        block.number,
                                                        user.email,
                                                        true);
    users[msg.sender] = new_user;
  }

  function update_user(IdentityIn memory user) public {
    if (StringUtils.notEmpty(user.nickname)) {
      users[msg.sender].nickname = user.nickname;
    }
    if (StringUtils.notEmpty(user.given_name)) {
      users[msg.sender].given_name = user.given_name;
    }
    if (StringUtils.notEmpty(user.middle_name)) {
      users[msg.sender].middle_name = user.middle_name;
    }
    if (StringUtils.notEmpty(user.family_name)) {
      users[msg.sender].family_name = user.family_name;
    }
    if (StringUtils.notEmpty(user.picture)) {
      users[msg.sender].picture = user.picture;
    }
    if (StringUtils.notEmpty(user.email)) {
      users[msg.sender].email = user.email;
    }
  }

  function get_name() internal view returns(string memory) {
    IdentityInternal memory info = users[msg.sender];
    return string(bytes.concat(bytes(info.given_name), " ", bytes(info.family_name)));
  }

  function get_user_info() public view returns(Identity memory) {
    return Identity(users[msg.sender].sub,
                    get_name(),
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
