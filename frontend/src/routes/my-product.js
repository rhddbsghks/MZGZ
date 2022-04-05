import React from "react";
import { mintProductContract } from "../web3Config";
import { useEffect, useState } from "react";
import { Grid, Box, Flex } from "@chakra-ui/react";
import MyProductCard from "../components/MyProductCard";
import Loader from "../common/Loader";

const MyProduct = ({ account }) => {
  const [productArray, setProductArray] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      setLoading(true);
      const balanceLength = await mintProductContract.methods
        .balanceOf(account)
        .call();

      if (balanceLength === "0") return;

      const tempProductArray = [];

      const response = await mintProductContract.methods
        .getProducts(account)
        .call();

      response.map((v) => {
        // console.log(v);
        tempProductArray.push({
          productId: v.productId,
          brand: v.brand,
          name: v.name,
          price: v.price,
          productType: v.productType,
          serialNum: v.serialNum,
        });
      });

      setProductArray(tempProductArray);
      console.log(tempProductArray);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!account) return;
    getProducts();
  }, [account]);

  return (
    <>
      {loading ? (
        <Loader msg="상품 불러오는 중..." />
      ) : (
        <>
          <Flex h="30%" marginTop="5%" marginBottom="2%"></Flex>
          {productArray && productArray.length > 0 ? (
            <Grid templateColumns="repeat(4, 1fr)" gap={8} mt="4">
              {productArray.map((v, i) => {
                return (
                  <MyProductCard
                    key={i}
                    productTokenId={v.productId}
                    brand={v.brand}
                    name={v.name}
                    productType={v.productType}
                    serialNum={v.serialNum}
                    account={account}
                  />
                );
              })}
            </Grid>
          ) : (
            <Box>보유한 상품이 없습니다.</Box>
          )}
        </>
      )}
    </>
  );
};

export default MyProduct;
