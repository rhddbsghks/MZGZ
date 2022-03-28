import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Button,
  Box,
  Image,
  Modal,
  ModalOverlay,
  useDisclosure,
  ModalFooter,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import { mintProductContract, saleProductContract, web3 } from "../web3Config";
import ModalContentBody from "./ModalContentBody";

const SaleProductCard = ({
  productId,
  brand,
  productType,
  name,
  serialNum,
  productPrice,
  account,
  getOnSaleProducts,
}) => {
  const [isBuyable, setIsBuyable] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          alt="ProductCard"
          m="auto"
        ></Image>

        <Text fontSize="sm" color="gray">
          {brand}
        </Text>
        <Text fontSize="lg" fontWeight="extrabold">
          {name}
        </Text>
        <Text d="inline-block">{web3.utils.fromWei(productPrice)} ETH</Text>

        <Flex
          justify="center"
          m="auto"
          mt="5"
          width="80%"
          flexDirection="column"
        >
          <Button
            onClick={onOpen}
            colorScheme="whatsapp"
            width="80%"
            m="auto"
            mb="3"
          >
            상세정보
          </Button>

          <Button
            colorScheme="purple"
            width="80%"
            m="auto"
            disabled={isBuyable}
            onClick={onClickBuy}
          >
            구매
          </Button>
        </Flex>
      </>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        size="4xl"
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
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SaleProductCard;
