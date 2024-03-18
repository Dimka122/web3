const message = artifacts.require('./Message.sol');

module.exports = function(deployer) {
  deployer.deploy(message);
};