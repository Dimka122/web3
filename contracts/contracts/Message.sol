// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Message{
    address owner;

    mapping(address => User) accounts;
    mapping(address => bool) isLogged;
    mapping(address => Mess[]) messs;

    uint usersCount = 0;

struct User {
    address login;
    string password;
    string username;
    string avatar;
    }

struct Mess {
    User author;
    string text;
    uint likes;
    uint createdTime;
    }
    
    modifier onlyLogged() {
        require(isLogged[msg.sender], "You must login in your account");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only for owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function Registration(string memory _username, string memory _password) public {
        require(accounts[msg.sender].login == address(0), "Account is already registered");

        accounts[msg.sender] = User({
            login: msg.sender,
            password: _password,
            username: _username,
            avatar: ""
        });

        usersCount++;
    }

    function Login(string memory _password) public {
        require(accounts[msg.sender].login != address(0), "You don't have account!");
        require(keccak256(bytes(accounts[msg.sender].password)) == keccak256(bytes(_password)), "Wrong password");
        
        isLogged[msg.sender] = true;
    }

    function Logout() public onlyLogged {
        isLogged[msg.sender] = false;
    }

    function AddMess(string memory _text) public onlyLogged {
        User memory _user = GetUser(msg.sender);

        messs[msg.sender].push(Mess({
            author: _user,
            text: _text,
            likes: 0,
            createdTime: block.timestamp
        }));
    }

    function UserMess(address _user) external view onlyLogged returns(Mess[] memory) {
        return messs[_user];
    }

    function CheckRegistration(address _user) external view returns(bool) {
        return accounts[_user].login != address(0);
    }

    function GetUser(address _user) public view returns(User memory) {
        return accounts[_user];
    }

    function UpdateUser(string memory _avatar) public {
        User storage _user = accounts[msg.sender];

        _user.avatar = _avatar;
    }

}