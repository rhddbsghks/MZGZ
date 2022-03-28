// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "MintProduct.sol";

contract SaleProduct {
    MintProduct public mintProductContract;

    constructor(address _mintProductAddress) {
        mintProductContract = MintProduct(_mintProductAddress);
    }

    struct Deal {
        uint256 dealPrice;
        uint256 dealTime;
    }

    mapping(uint256 => uint256) public productPrices;
    mapping(uint256 => Deal[]) public productDealHistories;

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
        Deal memory deal;
        deal.dealPrice = price;
        deal.dealTime = block.timestamp;
        productDealHistories[_productId].push(deal);
    }

    function getDealHistories(uint256 _productId)
        public
        view
        returns (Deal[] memory)
    {
        return productDealHistories[_productId];
    }

    function getOnSaleProductArrayLength() public view returns (uint256) {
        return onSaleProductArray.length;
    }

    function getProductPrice(uint256 _productId) public view returns (uint256) {
        return productPrices[_productId];
    }
}
