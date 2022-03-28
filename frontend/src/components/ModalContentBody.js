import React from "react";
import { Text, Image, Heading, Flex, Square, Box } from "@chakra-ui/react";

const ModalContentBody = ({
  productTokenId,
  brand,
  name,
  productType,
  serialNum,
  account,
}) => {
  return (
    <>
      <Flex m='auto'>
        <Square size='300px'>
          <Image
            src={`img/1.jpg`}
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