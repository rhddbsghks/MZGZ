// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "MintProduct.sol";

contract SaleProduct {
    MintProduct public mintProductContract;

    constructor(address _mintProductAddress) {
        mintProductContract = MintProduct(_mintProductAddress);
    }

    mapping(uint256 => uint256) public animalTokenPrices;
    mapping(uint256 => uint256) public productPrices;

    uint256[] public onSaleAnimalTokenArray;
    uint256[] public onSaleProductArray;

    function setForSaleProduct(uint256 _productId, uint256 _price) public {
        address productOwner = mintProductContract.ownerOf(_productId);

        require(productOwner == msg.sender, "Caller is not owner");

        require(_price > 0, "No zero price");
        require(
            mintProductContract.isApprovedForAll(productOwner, address(this)),
            "owner did not approve token"
        );

        productPrices[_productId] = _price;
        onSaleProductArray.push(_productId);
    }

    function setForSaleAnimalToken(uint256 _animalTokenId, uint256 _price)
        public
    {
        address animalTokenOwner = mintProductContract.ownerOf(_animalTokenId);

        require(
            animalTokenOwner == msg.sender,
            "Caller is not animal token owner"
        );
        require(_price > 0, "No zero");
        require(animalTokenPrices[_animalTokenId] == 0, "already on sale");
        require(
            mintProductContract.isApprovedForAll(
                animalTokenOwner,
                address(this)
            ),
            "owner did not approve token"
        );

        animalTokenPrices[_animalTokenId] = _price;
        onSaleAnimalTokenArray.push(_animalTokenId);
    }

    function purchaseAnimalToken(uint256 _animalTokenId) public payable {
        uint256 price = animalTokenPrices[_animalTokenId];
        address animalTokenOwner = mintProductContract.ownerOf(_animalTokenId);

        require(price > 0, "Animal token not sale");
        require(price <= msg.value, "sent lower than price");
        require(animalTokenOwner != msg.sender, "caller is owner");

        payable(animalTokenOwner).transfer(msg.value);
        mintProductContract.safeTransferFrom(
            animalTokenOwner,
            msg.sender,
            _animalTokenId
        );

        animalTokenPrices[_animalTokenId] = 0;

        for (uint256 i = 0; i < onSaleAnimalTokenArray.length; i++) {
            if (animalTokenPrices[onSaleAnimalTokenArray[i]] == 0) {
                onSaleAnimalTokenArray[i] = onSaleAnimalTokenArray[
                    onSaleAnimalTokenArray.length - 1
                ];
                onSaleAnimalTokenArray.pop();
            }
        }
    }

    function purchaseProduct(uint256 _productId) public payable {
        uint256 price = productPrices[_productId];
        address productOwner = mintProductContract.ownerOf(_productId);

        require(price > 0, "Animal token not sale");
        require(price <= msg.value, "sent lower than price");
        require(productOwner != msg.sender, "caller is owner");

        payable(productOwner).transfer(msg.value);
        mintProductContract.safeTransferFrom(
            productOwner,
            msg.sender,
            _productId
        );

        productPrices[_productId] = 0;

        for (uint256 i = 0; i < onSaleProductArray.length; i++) {
            if (productPrices[onSaleProductArray[i]] == 0) {
                onSaleProductArray[i] = onSaleProductArray[
                    onSaleProductArray.length - 1
                ];
                onSaleProductArray.pop();
            }
        }
    }

    function getOnSaleProductArrayLength() public view returns (uint256) {
        return onSaleProductArray.length;
    }

    function getProductPrice(uint256 _productId) public view returns (uint256) {
        return productPrices[_productId];
    }

    function getOnsSaleAnimalTokenArrayLength() public view returns (uint256) {
        return onSaleAnimalTokenArray.length;
    }

    function getAnimalTokenPrice(uint256 _animalTokenId)
        public
        view
        returns (uint256)
    {
        return animalTokenPrices[_animalTokenId];
    }
}
