import React, { useEffect } from "react";
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
        <Box flex='1' m='auto'>
          <Text fontsize='lg' fontWeight='bold' color='gray'>{brand}</Text>
          <Heading>{name}</Heading>
        </Box>
      </Flex>
    </>
  )
}

export default ModalContentBody;