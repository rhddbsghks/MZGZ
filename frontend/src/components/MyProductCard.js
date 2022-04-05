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
  useToast,
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
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const onClickSell = async () => {
    try {
      if (!account) return;

      let sellPrice = prompt("판매가격을 입력해주세요. (ETH)");
      setLoading(true);

      const response = await saleProductContract.methods
        .setForSaleProduct(productTokenId, web3.utils.toWei(sellPrice, "ether"))
        .send({ from: account });

      setLoading(false);
      setOnSale(true);
      toast({
        title: "거래 정보",
        description: "판매 등록이 완료 되었습니다.",
        duration: 2000,
      });
    } catch {
      toast({
        title: "거래 정보",
        description: "판매에 실패했습니다.",
        status: "error",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const onClickCancel = async () => {
    try {
      if (!account) return;
      setLoading(true);
      await saleProductContract.methods
        .cancelSaleProduct(productTokenId)
        .send({ from: account });

      toast({
        title: "거래 정보",
        description: "판매가 취소되었습니다.",
        status: "warning",
        duration: 2000,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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

  const changePrice = async () => {
    let sellPrice = await saleProductContract.methods
      .getProductPrice(productTokenId)
      .call();

    sellPrice = web3.utils.fromWei(sellPrice, "ether");

    sellPrice = prompt(
      `변경할 가격을 입력해주세요.(ETH) (현재 가격: ${sellPrice}ETH)`
    );
    try {
      setLoading(true);
      const response = await saleProductContract.methods
        .changePrice(productTokenId, web3.utils.toWei(sellPrice, "ether"))
        .send({ from: account });
      toast({
        title: "거래 정보",
        description: "가격 변경이 완료되었습니다.",
        status: "warning",
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!productTokenId) return;

    axios
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
    <Box
      textAlign="center"
      borderWidth="1px"
      boxShadow="dark-lg"
      w={250}
      p="5"
      m="5"
    >
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
            <Button
              colorScheme="pink"
              width="80%"
              m="auto"
              onClick={changePrice}
              loadingText="가격 변경중"
              spinnerPlacement="start"
              isLoading={loading}
            >
              가격 변경
            </Button>
          ) : (
            <Button
              colorScheme="facebook"
              width="80%"
              m="auto"
              onClick={onClickSell}
              loadingText="판매중"
              spinnerPlacement="start"
              isLoading={loading}
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
                <Heading fontSize="lg"></Heading>
                <Spacer />
                {onSale ? (
                  <Button
                    size="lg"
                    colorScheme="red"
                    mt="auto"
                    onClick={onClickCancel}
                  >
                    판매 취소
                  </Button>
                ) : null}
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </>
    </Box>
  );
};

export default MyProductCard;
