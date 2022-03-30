import React from "react";
import { Text, Image, Heading, Flex, Square, Box } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useState } from "react";

const ModalContentBody = ({
  productTokenId,
  brand,
  name,
  productType,
  serialNum,
  account,
}) => {
  const [picture,setPicture] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:8080/user/picture",{params:{
      id: productTokenId
    }}).then(res=>{
      setPicture(res.data.data.picture_url)
      console.log(res.data.data.picture_url)
    })
  }, []);
  return (
    <>
      <Flex m='auto'>
        <Square size='300px'>
          <Image
            src={picture}
          />
        </Square>
        <Box flex='1' m='auto' overflow='auto' p='auto'>
          <Text fontSize='lg' fontWeight='bold' color='gray'>{brand}</Text>
          <Heading>{name}</Heading>
          <Text fontSize='lg'><strong>소유자: </strong> {account}</Text>
          <Text fontSize='lg'><strong>시리얼번호: </strong> {serialNum}</Text>
        </Box>
      </Flex>
    </>
  )
}

export default ModalContentBody;