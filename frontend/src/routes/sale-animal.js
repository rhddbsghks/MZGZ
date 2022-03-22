import React from "react";

import {
  mintAnimalTokenContract,
  saleAnimalTokenContract,
} from "../web3Config";

import { useEffect, useState } from "react";
import { Grid } from "@chakra-ui/react";
import SaleAnimalCard from "../components/SaleAnimalCard";

const SaleAnimal = ({ account }) => {
  const [saleAnimalCardArray, setSaleAnimalCardArray] = useState();
  const getOnSaleAnimalTokens = async () => {
    try {
      const onSaleAnimalTokenArrayLength = await saleAnimalTokenContract.methods
        .getOnsSaleAnimalTokenArrayLength()
        .call();

      const tempOnSaleArray = [];

      for (let i = 0; i < parseInt(onSaleAnimalTokenArrayLength, 10); i++) {
        const animalTokenId = await saleAnimalTokenContract.methods
          .onSaleAnimalTokenArray(i)
          .call();

        const animalType = await mintAnimalTokenContract.methods
          .animalTypes(animalTokenId)
          .call();

        const animalPrice = await saleAnimalTokenContract.methods
          .animalTokenPrices(animalTokenId)
          .call();

        tempOnSaleArray.push({ animalTokenId, animalType, animalPrice });
      }

      setSaleAnimalCardArray(tempOnSaleArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOnSaleAnimalTokens();
  }, []);

  return (
    <Grid mt="4" templateColumns="repeat(4,1fr)" gap="8">
      {saleAnimalCardArray &&
        saleAnimalCardArray.map((v, i) => {
          return (
            <SaleAnimalCard
              key={i}
              animalType={v.animalType}
              animalPrice={v.animalPrice}
              animalTokenId={v.animalTokenId}
              account={account}
              getOnSaleAnimalTokens={getOnSaleAnimalTokens}
            />
          );
        })}
    </Grid>
  );
};

export default SaleAnimal;
