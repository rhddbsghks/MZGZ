import React from "react";

import { mintProductContract, saleProductContract } from "../web3Config";

import { useEffect, useState } from "react";
import { Grid } from "@chakra-ui/react";
import SaleProductCard from "../components/SaleProductCard";

const SaleProduct = ({ account }) => {
  const [saleProductArray, setSaleProductArray] = useState();

  const getOnSaleProducts = async () => {
    try {
      const onSaleProductArrayLength = await saleProductContract.methods
        .getOnSaleProductArrayLength()
        .call();

      const tempOnSaleArray = [];

      for (let i = 0; i < parseInt(onSaleProductArrayLength, 10); i++) {
        const productId = await saleProductContract.methods
          .onSaleProductArray(i)
          .call();

        const product = await mintProductContract.methods
          .getProduct(productId)
          .call();

        console.log("제품");
        console.log(product);

        const productPrice = await saleProductContract.methods
          .getProductPrice(productId)
          .call();

        tempOnSaleArray.push({
          productId,
          brand: product.brand,
          type: product.type,
          name: product.name,
          serialNum: product.serialNum,
          productPrice,
        });
      }

      setSaleProductArray(tempOnSaleArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOnSaleProducts();
  }, []);

  return (
    <Grid mt="4" templateColumns="repeat(4,1fr)" gap="8">
      {saleProductArray &&
        saleProductArray.map((v, i) => {
          return (
            <SaleProductCard
              key={i}
              productId={v.productId}
              brand={v.brand}
              type={v.type}
              name={v.name}
              serialNum={v.serialNum}
              productPrice={v.productPrice}
              account={account}
              getOnSaleProducts={getOnSaleProducts}
            />
          );
        })}
    </Grid>
  );
};

export default SaleProduct;