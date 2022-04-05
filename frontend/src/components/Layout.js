import React from "react";
import { Link } from "react-router-dom";
import { Stack, Flex, Text, GridItem, Grid, Image } from "@chakra-ui/react";

const Layout = ({ children, account }) => {
  
  return (
    <Stack color="Background">
      <Grid
        templateColumns="repeat(12, 1fr)"
        bg="unset"
        boxShadow="lg"
        justifyContent="space-around"
        alignItems="center"
        h="80px"
      >
        <GridItem colSpan={1} />
        <GridItem colSpan={1} justifySelf="center">
          <Link to="/">
            <Image src="/logo.png" alt="img" h="50px"></Image>
          </Link>
        </GridItem>
        <GridItem colSpan={5}>
          {account ? (
            <Text>
              <Link to="/my-product">
                <strong>{account}</strong>
              </Link>
              님 환영합니다.
            </Text>
          ) : (
            <Text>
              <strong>로그인 해주세요.</strong>
            </Text>
          )}
        </GridItem>
        <GridItem colSpan={1} justifySelf="center">
          <Link
            to="/add-product"
            size="sm"
            colorScheme="blue"
            textColor="blue"
            fontWeight="bold"
            fontSize="large"
          >
            상품 등록
          </Link>
        </GridItem>
        <GridItem colSpan={1} justifySelf="center">
          <Link
            to="/my-product"
            size="sm"
            colorScheme="blue"
            textColor="blue"
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
            colorScheme="blue"
            textColor="blue"
            fontWeight="bold"
            fontSize="large"
          >
            판매 목록
          </Link>
        </GridItem>
        <GridItem colSpan={1} />
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
