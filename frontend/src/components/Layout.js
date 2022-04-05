import React from "react";
import { Link } from "react-router-dom";
import { Stack, Flex, Text, GridItem, Grid } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Stack color="Background">
      <Grid
        templateColumns="repeat(12, 1fr)"
        bg="unset"
        p={4}
        justifyContent="space-around"
        alignItems="center"
      >
        <GridItem colSpan={1} justifySelf="center">
          <Text fontWeight="bold">MZGZ</Text>
        </GridItem>
        <GridItem colSpan={8} />
        <GridItem colSpan={1} justifySelf="center">
          <Link
            to="/"
            colorScheme="unset"
            textColor="black"
            fontWeight="bold"
            fontSize="large"
          >
            상품 등록-pushpush
          </Link>
        </GridItem>
        <GridItem colSpan={1} justifySelf="center">
          <Link
            to="/my-product"
            size="sm"
            colorScheme="unset"
            textColor="black"
            fontWeight="bold"
            fontSize="large"
          >
            내 상품
          </Link>
        </GridItem>
        <GridItem colSpan={1} justifySelf="center">
          <Link
            to="/sale-product"
            size="sm"
            colorScheme="unset"
            textColor="black"
            fontWeight="bold"
            fontSize="large"
          >
            판매 목록
          </Link>
        </GridItem>
      </Grid>
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
