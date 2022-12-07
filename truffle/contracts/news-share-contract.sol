pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './verifier.sol';

contract NewsShareContract is Verifier {
  event NewsAdded(uint newsIndex);
  event NewsUpdated(uint newsIndex);

  struct NewsModel {
    uint index;
    string ipfsAddress;
    string title;
    string summary;
    string contentType;
    uint rating;
    address payable owner;
  }

  NewsModel[] public newsAddresses;

  modifier acceptableContentType(string memory _contentType) {
    require(compareStrings(_contentType, "text/plain") || compareStrings(_contentType, "application/markdown"));
    _;
  }

  function compareStrings(string memory a, string memory b) public view returns (bool) {
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
  }

  function addNews(string memory _ipfsAddress, string memory _title, string memory _summary, string memory _contentType) public acceptableContentType(_contentType) {
    NewsModel memory news = NewsModel(newsAddresses.length, _ipfsAddress, _title, _summary, _contentType, 0, payable(msg.sender));
    newsAddresses.push(news);
    emit NewsAdded(newsAddresses.length - 1);
  }

  function increaseRating(uint index) public payable {
      (bool success, ) = newsAddresses[index].owner.call{value: msg.value}("");
      require(success, "Failed to send Ether");
      newsAddresses[index].rating++;
      emit NewsUpdated(index);
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
