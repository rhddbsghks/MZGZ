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

    console.log(name + "의 거래 내역");
    setDealHistories(histories);
    histories.map((v, i) => {
      console.log("거래 " + i);
      console.log("가격: " + web3.utils.fromWei(v.dealPrice) + "ETH");
      console.log("일자: " + v.dealTime);
      console.log("");
    });
  };

  useEffect(() => {
    console.log(productTokenId);
    console.log(brand);
    console.log(serialNum);
    checkOnSale();
    getDealHistories();
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
        <Text fontSize="sm" color="gray">
          {brand}
        </Text>
        <Text fontSize="lg" fontWeight="extrabold">
          {name}
        </Text>
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
