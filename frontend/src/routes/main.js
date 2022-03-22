import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { mintAnimalTokenContract } from "../web3Config";
import AnimalCard from "../components/AnimalCard";

const Main = ({ account }) => {
  const [newAnimalType, setNewAnimalType] = useState("");

  const onClickMint = async () => {
    try {
      if (!account) return;

      const response = await mintAnimalTokenContract.methods
        .mintAnimalToken()
        .send({ from: account });

      if (response.status) {
        const balanceLength = await mintAnimalTokenContract.methods
          .balanceOf(account)
          .call();

        const animalTokenId = await mintAnimalTokenContract.methods
          .tokenOfOwnerByIndex(account, parseInt(balanceLength) - 1)
          .call();

        const animalType = await mintAnimalTokenContract.methods
          .animalTypes(animalTokenId)
          .call();

        setNewAnimalType(animalType);
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Flex
      w="full"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box>
        {newAnimalType ? (
          <AnimalCard animalType={newAnimalType} />
        ) : (
          <span>lets go</span>
        )}
      </Box>
      <Button mt={4} size="sm" colorScheme="blue" onClick={onClickMint}>
        Mint
      </Button>
    </Flex>
  );
};

export default Main;
