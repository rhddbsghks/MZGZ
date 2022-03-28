import React, { useEffect } from "react";
import { Flex, Text, Button, Box, Image, Modal, ModalOverlay, useDisclosure, ModalFooter, ModalContent, ModalCloseButton, ModalBody, ModalHeader, Heading } from "@chakra-ui/react";
import { saleProductContract, web3 } from "../web3Config";
import ModalContentBody from "./ModalContentBody";

const MyProductCard = ({
  productTokenId,
  brand,
  name,
  productType,
  serialNum,
  account,
}) => {
  const WEI = 1000000000000000000;
  const { isOpen, onOpen, onClose} = useDisclosure();
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
        <Text fontSize='sm' color='gray'>{brand}</Text>
        <Text fontSize='lg' fontWeight='extrabold'>{name}</Text>
        <Flex justify="center" m="auto" mt="5" width="80%">
          <Button onClick={onOpen} colorScheme='whatsapp'>상세정보</Button>

          <Modal isOpen={isOpen} onClose={onClose}
            motionPreset='slideInBottom'
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>제품 정보</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <ModalContentBody
                  brand={brand}
                  name={name}
                  productType={productType}
                  serialNum={serialNum}
                  account={account}
                />
              </ModalBody>
              
              <ModalFooter>
                <Heading fontSize='lg'>
                  제품을 판매하시겠습니까?
                </Heading>
                <Button
                size="lg" colorScheme='facebook' mt="auto"
                onClick={onClickSell}
                >
                  판매
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </>
    </Box>
  );
};

export default MyProductCard;
