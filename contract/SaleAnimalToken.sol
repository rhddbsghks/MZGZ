// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "MintAnimalToken.sol";

contract SaleAnimalToken{
    MintAnimalToken public mintAnimalTokenAddress;

    constructor( address _mintAnimalTokenAddress){
        mintAnimalTokenAddress = MintAnimalToken(_mintAnimalTokenAddress);
    }

    mapping(uint => uint) public animalTokenPrices;

    uint[] public onSaleAnimalTokenArray;

    function setForSaleAnimalToken(uint _animalTokenId, uint _price)public{
        address animalTokenOwner = mintAnimalTokenAddress.ownerOf(_animalTokenId);

        require(animalTokenOwner == msg.sender, "Caller is not animal token owner");
        require(_price>0, "No zero");
        require(animalTokenPrices[_animalTokenId]==0,"already on sale");
        require(mintAnimalTokenAddress.isApprovedForAll(animalTokenOwner, address(this)), "owner did not approve token");
        

        animalTokenPrices[_animalTokenId] = _price;

        onSaleAnimalTokenArray.push(_animalTokenId);
    }

    function purchaseAnimalToken(uint _animalTokenId) public payable{
        uint price = animalTokenPrices[_animalTokenId];
        address animalTokenOwner = mintAnimalTokenAddress.ownerOf(_animalTokenId);

        require(price>0, "Animal token not sale");
        require(price<=msg.value, "sent lower than price");
        require(animalTokenOwner!=msg.sender, "caller is owner");

        payable(animalTokenOwner).transfer(msg.value);
        mintAnimalTokenAddress.safeTransferFrom(animalTokenOwner, msg.sender, _animalTokenId);

        animalTokenPrices[_animalTokenId] = 0;

        for(uint i = 0;i<onSaleAnimalTokenArray.length;i++){
            if(animalTokenPrices[onSaleAnimalTokenArray[i]]==0){
                onSaleAnimalTokenArray[i] = onSaleAnimalTokenArray[onSaleAnimalTokenArray.length - 1];
                onSaleAnimalTokenArray.pop();
            }
        }
    }

    function getOnsSaleAnimalTokenArrayLength() view public returns(uint256){
        return onSaleAnimalTokenArray.length;
    }

    function getAnimalTokenPrice(uint256 _animalTokenId) view public returns(uint256){
        return animalTokenPrices[_animalTokenId];
    }
}