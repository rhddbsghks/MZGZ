import React, { useState } from "react";
import {
  Text,
  Button,
  Box,
  InputRightAddon,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import AnimalCard from "./AnimalCard";
import { saleAnimalTokenContract, web3 } from "../web3Config";

const MyAnimalCard = ({
  animalType,
  animalTokenId,
  animalPrice,
  account,
  saleStatus,
}) => {
  const [sellPrice, setSellPrice] = useState("");
  const [myAnimalPrice, setMyAnimalPrice] = useState(animalPrice);

  const onChangeSellPrice = (e) => {
    setSellPrice(e.target.value);
  };

  const onClickSell = async () => {
    try {
      if (!account || !saleStatus) return;
      const response = await saleAnimalTokenContract.methods
        .setForSaleAnimalToken(
          animalTokenId,
          web3.utils.toWei(sellPrice, "ether")
        )
        .send({ from: account });

      console.log(response);

      if (response.status) {
        setMyAnimalPrice(web3.utils.toWei(sellPrice, "ether"));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box textAlign="center" w={150}>
      <AnimalCard animalType={animalType}></AnimalCard>
      <Box mt="2">
        {myAnimalPrice === "0" ? (
          <>
            <InputGroup>
              <Input
                type="number"
                value={sellPrice}
                onChange={onChangeSellPrice}
              />
              <InputRightAddon children="ETH" />
            </InputGroup>
            <Button size="sm" colorScheme="green" mt="2" onClick={onClickSell}>
              Sell
            </Button>
          </>
        ) : (
          <Text d="inline-block">{web3.utils.fromWei(myAnimalPrice)} ETH</Text>
        )}
      </Box>
    </Box>
  );
};

export default MyAnimalCard;
