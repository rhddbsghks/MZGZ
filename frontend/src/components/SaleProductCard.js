import React, { useEffect, useState } from "react";
import { Flex, Text, Button, Box, Image } from "@chakra-ui/react";
import { mintProductContract, saleProductContract, web3 } from "../web3Config";

const SaleProductCard = ({
  productId,
  brand,
  type,
  name,
  serialNum,
  productPrice,
  account,
  getOnSaleProducts,
}) => {
  const [isBuyable, setIsBuyable] = useState(true);

  const getProductOwner = async () => {
    try {
      const response = await mintProductContract.methods
        .ownerOf(productId)
        .call();

      setIsBuyable(
        response.toLocaleLowerCase() === account.toLocaleLowerCase()
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onClickBuy = async () => {
    try {
      if (!account) return;

      const response = await saleProductContract.methods
        .purchaseProduct(productId)
        .send({ from: account, value: productPrice });

      if (response.status) {
        getOnSaleProducts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProductOwner();
  }, []);
  return (
    <Box textAlign="center" w={250} borderWidth="1px" p="5">
      <>
        <Image
          w={150}
          h={150}
          src={`img/1.png`}
          alt="AnimalCard"
          m="auto"
        ></Image>

        <Text>[{brand}]</Text>
        <Text>{name}</Text>
        <Text d="inline-block">{web3.utils.fromWei(productPrice)} ETH</Text>
        <Flex justify="space-between" m="auto" mt="5" width="80%">
          <Button
            size="md"
            colorScheme="linkedin"
            mt="auto"
            width="80px"
            height="30px"
          >
            상세정보
          </Button>
          <Button
            size="sm"
            colorScheme="purple"
            mt="auto"
            width="80px"
            height="30px"
            disabled={isBuyable}
            onClick={onClickBuy}
          >
            구매
          </Button>
        </Flex>
      </>
    </Box>
  );
};

export default SaleProductCard;
