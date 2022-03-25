// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "SaleProduct.sol";

contract MintProduct is ERC721Enumerable {
    constructor() ERC721("h662Animals", "HAS") {}

    SaleProduct public saleProduct;

    mapping(uint256 => ProductData) public products;

    struct ProductData {
        uint256 productId;
        string brand;
        string name;
        uint256 price;
        string productType;
        string serialNum;
    }

    function mintProduct(
        string memory brand,
        string memory name,
        string memory productType,
        string memory serialNum
    ) public {
        uint256 productId = totalSupply() + 1;

        ProductData memory p;
        p.productId = productId;
        p.brand = brand;
        p.name = name;
        p.productType = productType;
        p.serialNum = serialNum;

        products[productId] = p;

        _mint(msg.sender, productId);
    }

    function getProducts(address _productOwner)
        public
        view
        returns (ProductData[] memory)
    {
        uint256 balanceLength = balanceOf(_productOwner);

        require(balanceLength > 0, "Owner did not have token");

        ProductData[] memory productData = new ProductData[](balanceLength);

        for (uint256 i = 0; i < balanceLength; i++) {
            uint256 productId = tokenOfOwnerByIndex(_productOwner, i);

            productData[i] = products[productId];
        }

        return productData;
    }

    function getProduct(uint256 productId)
        public
        view
        returns (ProductData memory)
    {
        return products[productId];
    }
}
