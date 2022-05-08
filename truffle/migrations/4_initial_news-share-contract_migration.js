const NewsShareContract = artifacts.require('NewsShareContract');

module.exports = function (deployer) {
  deployer.deploy(NewsShareContract);
};
