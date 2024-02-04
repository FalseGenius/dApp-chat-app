// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract ChatApp {
    struct User {
        string name;
        Friend[] friendList;
    }

    struct Friend {
        address pubKey;
        string name;
    }

    struct Message {
        string msg;
        uint256 timestamp;
        address sender;
    }

    struct AllUserStruct {
        string name;
        address pubKey;
    }

    AllUserStruct[] allUsers;
    mapping(address => User) userList;
    mapping(bytes32 => Message[]) allMessages;

    modifier exists(address user, address friend_key) {
        require(checkUserExists(user), "Create an account first before adding friends");
        require(checkUserExists(friend_key), "Friend needs to register first");
        require(alreadyFriends(user, friend_key) == false, "Already a friend");
        _;
    }

    function checkUserExists(address pubKey) public view returns (bool) {
        return bytes(userList[pubKey].name).length > 0;
    }

    function createUser(string calldata name) external {
        require(checkUserExists(msg.sender) == false, "User already exists");
        require(bytes(name).length > 0, "Username cannot be empty");

        userList[msg.sender].name = name;
        allUsers.push(AllUserStruct(name, msg.sender));
    }

    function getUsername(address pubKey) external view returns (string memory) {
        require(checkUserExists(pubKey), "User is not registered");
        return userList[pubKey].name;
    }

    function addFriend(address friend_key, string calldata name) exists(msg.sender, friend_key) external {
        require(msg.sender != friend_key, "User cannot add themselves as a friend");
        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
    }

    function alreadyFriends(address user, address friend_key) internal view returns (bool) {
        Friend[] memory friends = userList[user].friendList;
        
        for (uint256 i = 0; i < friends.length; i++) {
            address friend = friends[i].pubKey;
            if (friend == friend_key) return true;
        }

        return false;
    }

    function _addFriend(address user, address friend, string memory name) internal {
        Friend memory newFriend = Friend(friend, name);
        userList[user].friendList.push(newFriend);
    }

    function getFriends() external view returns (Friend[] memory) {
        return userList[msg.sender].friendList;
    }

    function _getChatID(address user, address friend) internal pure returns (bytes32) {
        if (user > friend) return keccak256(abi.encodePacked(user, friend));
        else return keccak256(abi.encodePacked(friend, user));
    }

    function sendMessage(address friend_key, string calldata _msg) external {
        require(checkUserExists(msg.sender), "Register first");
        require(checkUserExists(friend_key), "Friend not registered");
        require(alreadyFriends(msg.sender, friend_key), "You are not friends with this user");

        bytes32 chatID = _getChatID(msg.sender, friend_key);
        Message memory newMsg = Message(_msg, block.timestamp, msg.sender);
        allMessages[chatID].push(newMsg);
    }

    function readMessage(address friend_key) exists(msg.sender, friend_key) external view returns (Message[] memory) {
        bytes32 id = _getChatID(msg.sender, friend_key);
        return allMessages[id];
    }

    function getAllAppUsers() external view returns(AllUserStruct[] memory) {
        return allUsers;
    }

}