pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './verifier.sol';

contract NewsShareContract is Verifier {
  event NewsAdded(uint newsIndex);

  struct NewsModel {
    uint index;
    string ipfsAddress;
    string newsHash;
    string title;
    string summary;
    address owner;
  }

  NewsModel[] public newsAddresses;
  mapping(string => address) public newsHashToOwner;

  modifier notUsed(string memory _newsHash) {
    require(newsHashToOwner[_newsHash] == address(0));
    _;
  }

  function addNews(string memory _ipfsAddress, string memory _newsHash, string memory _title, string memory _summary, Proof memory proof, uint[4] memory input) public notUsed(_newsHash) returns (bool r) {
    bool isVerified = verifyTx(proof, input);
    if(!isVerified){
      return false;
    }
    NewsModel memory news = NewsModel(newsAddresses.length, _ipfsAddress, _newsHash, _title, _summary, msg.sender);
    newsHashToOwner[_newsHash] = msg.sender;
    newsAddresses.push(news);
    emit NewsAdded(newsAddresses.length);
    return true;
  }

  function getNewsByIndex(uint index) external view returns (NewsModel memory) {
    return newsAddresses[index];
  }

  function getNews() external view returns (NewsModel[] memory) {
    NewsModel[] memory result = new NewsModel[](newsAddresses.length);
    for (uint i = 0; i < newsAddresses.length; i++) {
        result[i] = newsAddresses[i];
    }
    return result;
  }

  function getNewsPaginated(uint page, uint pagination) external view returns (NewsModel[] memory) {
    NewsModel[] memory result = new NewsModel[](pagination);
    uint offset = page * pagination;
    uint pageCalculatedEnd = (page + 1) * pagination;
    uint pageEnd;

    if(pageCalculatedEnd >= newsAddresses.length) {
      pageEnd = newsAddresses.length;
    } else {
      pageEnd = pageCalculatedEnd;
    }

    for (uint i = offset; i < pageEnd; i++) {
      result[i] = newsAddresses[i];
    }
    return result;
  }
}
