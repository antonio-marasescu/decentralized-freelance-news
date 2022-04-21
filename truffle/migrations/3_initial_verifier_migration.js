const VoteSystem = artifacts.require('Verifier');

module.exports = function (deployer) {
  deployer.deploy(VoteSystem);
};
