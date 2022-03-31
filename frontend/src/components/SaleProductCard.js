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
import axios from "axios";

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
  const [picture, setPicture] = useState([]);

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
    axios
      .get("/user/picture", {
        params: {
          id: productId,
        },
      })
      .then((res) => {
        setPicture(res.data.data.picture_url);
        console.log(res.data.data.picture_url);
      });

    getProductOwner();
  }, []);
  return (
    <Box textAlign="center" borderWidth="1px" boxShadow="dark-lg" w={250} p={5}>
      <>
        <Image w={150} h={150} src={picture} alt="ProductCard" m="auto"></Image>

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
              productTokenId={productId}
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
