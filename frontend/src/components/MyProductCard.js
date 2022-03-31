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
import { saleProductContract, web3 } from "../web3Config";
import ModalContentBody from "./ModalContentBody";
import axios from "axios";

const MyProductCard = ({
  productTokenId,
  brand,
  name,
  productType,
  serialNum,
  account,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [onSale, setOnSale] = useState(false);
  const [dealHistories, setDealHistories] = useState([]);
  const [picture, setPicture] = useState([]);
  const onClickSell = async () => {
    try {
      if (!account) return;

      let sellPrice = prompt("판매가격을 입력해주세요. (ETH)");
      const response = await saleProductContract.methods
        .setForSaleProduct(productTokenId, web3.utils.toWei(sellPrice, "ether"))
        .send({ from: account });

      alert("판매등록이 완료되었습니다.");
      setOnSale(true);
    } catch (error) {
      console.error(error);
    }
  };

  const checkOnSale = async () => {
    const price = await saleProductContract.methods
      .getProductPrice(productTokenId)
      .call();

    if (price > 0) setOnSale(true);
  };

  const getDealHistories = async () => {
    const histories = await saleProductContract.methods
      .getDealHistories(productTokenId)
      .call();

    setDealHistories(histories);
  };

  useEffect(() => {
    if (!productTokenId) return;

    axios
    // http://j6a507.p.ssafy.io:8080/
    // /user/picture
      .get("http://j6a507.p.ssafy.io:8080/user/picture", {
        params: {
          id: productTokenId,
        },
      })
      .then((res) => {
        console.log("이미지 API 요청");
        console.log(res);
        setPicture(res.data.data.picture_url);
      });

    console.log(productTokenId);
    checkOnSale();
    getDealHistories();
  }, [productTokenId]);
  return (
    <Box textAlign="center" borderWidth="1px" boxShadow="dark-lg" w={250} p="5">
      <>
        <Image w={150} h={150} src={picture} alt="AnimalCard" m="auto" />
        <Text fontSize="sm" color="gray">
          {brand}
        </Text>
        <Text fontSize="lg" fontWeight="extrabold">
          {name}
        </Text>
        <Flex
          justify="center"
          flexDirection="column"
          m="auto"
          mt="5"
          width="80%"
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
          {onSale ? (
            <Button colorScheme="facebook" width="80%" m="auto" disabled={true}>
              판매 중
            </Button>
          ) : (
            <Button
              colorScheme="facebook"
              width="80%"
              m="auto"
              onClick={onClickSell}
            >
              판매
            </Button>
          )}

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
                  productTokenId={productTokenId}
                  brand={brand}
                  name={name}
                  productType={productType}
                  serialNum={serialNum}
                  account={account}
                  saleHistory={dealHistories}
                />
              </ModalBody>
              <hr />
              <ModalFooter>
                <Heading fontSize="lg">제품을 판매하시겠습니까?</Heading>
                <Spacer />
                <Button
                  size="lg"
                  colorScheme="facebook"
                  mt="auto"
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
