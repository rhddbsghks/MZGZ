import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Select,
  Image,
  Stack,
  toast,
} from "@chakra-ui/react";
import { mintProductContract } from "../web3Config";
import axios from "axios";

import qs from "qs";
axios.default.paramsSerializer = (params) => {
  return qs.stringify(params);
};

const api = axios.create({
  baseURL: `/user/picture`,
});

const AddProduct = ({ account }) => {
  const [file, setFile] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const productImage = useRef();
  const productBrand = useRef();
  const productName = useRef();
  const productType = useRef();
  const productSerial = useRef();

  useEffect(() => {
    if (file !== "") {
      setPreview(
        <Image src={previewURL} boxSize="sm" objectFit="cover" m="auto" />
      );
    }
    return () => {};
  }, [previewURL]);

  const handleFileOnChange = (event) => {
    //파일 불러오기
    event.preventDefault();
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onloadend = (e) => {
      setFile(file);
      setPreviewURL(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const onClickMint = async () => {
    try {
      if (!account) return;
      setLoading(true);
      const response = await mintProductContract.methods
        .mintProduct(
          productBrand.current.value,
          productName.current.value,
          productType.current.value,
          productSerial.current.value
        )
        .send({ from: account });
      // post

      const formData = new FormData();
      formData.append("images", file);
      formData.append("id", response.events.Transfer.returnValues.tokenId);

      axios({
        method: "post",
        url: "http://j6a507.p.ssafy.io:8080/user/picture",
        data: formData,
        headers: { "Content-Type": "multipart/form-data; charset=UTF-8" },
      })
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => console.log(err));
      setTimeout(() => {
        toast({
          title: "상품 등록 정보",
          description: "상품 등록이 완료되었습니다.",
          status: "error",
          duration: 2000,
        });
      }, 100);
      setLoading(false);
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      w="full"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box>
        {file === "" ? <Box h="250px"></Box> : <Stack>{preview}</Stack>}

        <FormControl isRequired>
          <FormLabel htmlFor="brand-new">상품 이미지</FormLabel>
          <Input
            id="file"
            type="file"
            ref={productImage}
            accept="image/jpg,image/png,image/jpeg,image/gif"
            onChange={handleFileOnChange}
          />
        </FormControl>
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
            <option>기타</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="serialNum-new">시리얼 번호</FormLabel>
          <Input id="serialNum-new" type="text" ref={productSerial} />
        </FormControl>
      </Box>
      <Button
        mt={4}
        size="sm"
        colorScheme="blue"
        onClick={onClickMint}
        isLoading={loading}
      >
        등록
      </Button>
    </Flex>
  );
};

export default AddProduct;
