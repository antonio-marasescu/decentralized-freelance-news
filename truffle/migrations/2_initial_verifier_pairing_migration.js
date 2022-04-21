const Pairing = artifacts.require('Pairing');

module.exports = function (deployer) {
  deployer.deploy(Pairing);
};
