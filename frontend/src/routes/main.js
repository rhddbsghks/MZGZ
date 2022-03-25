import React, { useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { mintProductContract } from "../web3Config";

const Main = ({ account }) => {
  const productBrand = useRef();
  const productName = useRef();
  const productType = useRef();
  const productSerial = useRef();

  const onClickMint = async () => {
    console.log(productBrand.current.value);
    console.log(productType.current.value);
    console.log(productSerial.current.value);
    try {
      if (!account) return;

      const response = await mintProductContract.methods
        .mintProduct(
          productBrand.current.value,
          productName.current.value,
          productType.current.value,
          productSerial.current.value
        )
        .send({ from: account });

      console.log(response);
      alert("등록이 완료되었습니다.");
      // response.events.returnValues.tokenId
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
        {/* {newAnimalType ? (
          <AnimalCard animalType={newAnimalType} />
        ) : (
          <span>lets go</span>
        )} */}
        <FormControl isRequired>
          <FormLabel htmlFor="brand-new">브랜드 이름</FormLabel>
          <Input id="brand-new" type="text" ref={productBrand} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="name-new">상품 이름</FormLabel>
          <Input id="name-new" type="text" ref={productName} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="type-new">상품 타입</FormLabel>
          <Select id="type-new" ref={productType}>
            <option>상의</option>
            <option>하의</option>
            <option>신발</option>
            <option>악세사리</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="serialNum-new">시리얼 번호</FormLabel>
          <Input id="serialNum-new" type="text" ref={productSerial} />
        </FormControl>
      </Box>
      <Button mt={4} size="sm" colorScheme="blue" onClick={onClickMint}>
        등록
      </Button>
    </Flex>
  );
};

export default Main;
