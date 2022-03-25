import React, { useEffect } from "react";
import { Flex, Text, Button, Box, Image } from "@chakra-ui/react";
import { saleProductContract, web3 } from "../web3Config";

const MyProductCard = ({
  productTokenId,
  brand,
  name,
  productType,
  serialNum,
  account,
}) => {
  const WEI = 1000000000000000000;

  const onClickSell = async () => {
    try {
      if (!account) return;

      let sellPrice = prompt("판매가격을 입력해주세요. (ETH)");
      console.log(productTokenId);
      const response = await saleProductContract.methods
        .setForSaleProduct(productTokenId, web3.utils.toWei(sellPrice, "ether"))
        .send({ from: account });

      alert("판매등록이 완료되었습니다.");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    console.log(productTokenId);
    console.log(brand);
    console.log(serialNum);
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
            size="md"
            colorScheme="teal"
            mt="auto"
            width="80px"
            height="30px"
            onClick={onClickSell}
          >
            판매
          </Button>
        </Flex>
      </>
    </Box>
  );
};

export default MyProductCard;
