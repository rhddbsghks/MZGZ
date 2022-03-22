import React from "react";
import {
  mintAnimalTokenContract,
  saleAnimalTokenAddress,
} from "../web3Config";
import { useEffect, useState } from "react";
import { Grid, Flex, Text, Button } from "@chakra-ui/react";
import MyAnimalCard from "../components/MyAnimalCard";

const MyAnimal = ({ account }) => {
  const [animalCardArray, setAnimalCardArray] = useState([]);
  const [saleStatus, setSaleStatus] = useState(false);

  const getAnimalTokens = async () => {
    try {
      const balanceLength = await mintAnimalTokenContract.methods
        .balanceOf(account)
        .call();

      if (balanceLength === "0") return;

      const tempAnimalCardArray = [];

      const response = await mintAnimalTokenContract.methods
        .getAnimalTokens(account)
        .call();

      response.map((v) => {
        tempAnimalCardArray.push({
          animalTokenId: v.animalTokenId,
          animalType: v.animalType,
          animalPrice: v.animalPrice,
        });
      });

      setAnimalCardArray(tempAnimalCardArray);
    } catch (error) {
      console.log(error);
    }
  };

  const getIsApprovedForAll = async () => {
    try {
      const response = await mintAnimalTokenContract.methods
        .isApprovedForAll(account, saleAnimalTokenAddress)
        .call();

      if (response) {
        setSaleStatus(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!account) return;

    getAnimalTokens();
    getIsApprovedForAll();
  }, [account]);

  const onClickApproveTogle = async () => {
    try {
      if (!account) return;

      const response = await mintAnimalTokenContract.methods
        .setApprovalForAll(saleAnimalTokenAddress, !saleStatus)
        .send({ from: account });

      if (response.status) {
        setSaleStatus(!saleStatus);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Flex alignItems="center">
        <Text display="inline-block">
          Sale Status : {saleStatus ? "True" : "False"}{" "}
        </Text>
        <Button
          size="xs"
          ml="2"
          colorScheme={saleStatus ? "red" : "blue"}
          onClick={onClickApproveTogle}
        >
          {saleStatus ? "Cancel" : "Approve"}
        </Button>
      </Flex>
      <Grid templateColumns="repeat(4, 1fr)" gap={8} mt="4">
        {animalCardArray &&
          animalCardArray.map((v, i) => {
            return (
              <MyAnimalCard
                key={i}
                animalType={v.animalType}
                animalTokenId={v.animalTokenId}
                animalPrice={v.animalPrice}
                saleStatus={saleStatus}
                account={account}
              />
            );
          })}
      </Grid>
    </>
  );
};

export default MyAnimal;
