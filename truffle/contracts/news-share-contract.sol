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
    string contentType;
    uint rating;
    address owner;
  }

  NewsModel[] public newsAddresses;
  mapping(string => address) public newsHashToOwner;

  modifier notUsed(string memory _newsHash) {
    require(newsHashToOwner[_newsHash] == address(0));
    _;
  }

  modifier acceptableContentType(string memory _contentType) {
    require(compareStrings(_contentType, "text/plain") || compareStrings(_contentType, "video/mp4") || compareStrings(_contentType, "application/markdown"));
    _;
  }

  function compareStrings(string memory a, string memory b) public view returns (bool) {
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
  }

  function addNews(string memory _ipfsAddress, string memory _newsHash, string memory _title, string memory _summary, string memory _contentType) public notUsed(_newsHash) acceptableContentType(_contentType) returns (bool r) {
    NewsModel memory news = NewsModel(newsAddresses.length, _ipfsAddress, _newsHash, _title, _summary, _contentType, 0, msg.sender);
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
}
