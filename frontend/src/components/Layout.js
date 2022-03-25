import React from "react";
import { Link } from "react-router-dom";
import { Stack, Flex, Text, Box, Button } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Stack h="100vh">
      <Flex bg="purple" p={4} justifyContent="space-around" alignItems="center">
        <Box>
          <Text fontWeight="bold">Animals</Text>
        </Box>
        <Link to="/">
          <Button size="sm" colorScheme="red">
            상품 등록
          </Button>
        </Link>
        <Link to="/my-product">
          <Button size="sm" colorScheme="red">
            내 상품
          </Button>
        </Link>
        <Link to="/sale-product">
          <Button size="sm" colorScheme="red">
            판매 목록
          </Button>
        </Link>
      </Flex>
      <Flex
        direction="column"
        h="full"
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Flex>
    </Stack>
  );
};

export default Layout;
