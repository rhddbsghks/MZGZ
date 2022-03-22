import React from "react";
import { Link } from "react-router-dom";
import { Stack, Flex, Button, Input, Grid, GridItem } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Stack h="100vh">
      {/* navigation bar start */}
      <Grid templateColumns='repeat(12, 1fr)' gap={5} textAlign="center" paddingY={4} backgroundColor="blur">
        {/* go to home button */}
        <GridItem marginStart={5} colSpan={2}>
          <Link to="/">
            <Button size={'sm'}>
              Home
            </Button>
          </Link>
        </GridItem>
        {/* search bar */}
        <GridItem colSpan={6}>
          <Input size={'sm'} placeholder="Search" />
        </GridItem>
        {/* my animal button */}
        <GridItem colSpan={2}>
          <Link to="/my-animal">
            <Button size={'sm'}>
              MyItems
            </Button>
          </Link>
        </GridItem>
        {/* profile btn */}
        <GridItem marginEnd={5} colSpan={2}>
          <Link to="/sale-animal">
            <Button size={'sm'}>
              Profile
            </Button>
          </Link>
        </GridItem>
      </Grid>
      {/* main page start */}
      <Flex
          direction="column"
          h="full"
          justifyContent="center"
          alignItems="center"
        >
        {children}
      </Flex>
    </Stack>


    // <Stack h="100vh">
    //   <Grid bg="purple" p={4} justifyContent="space-around" alignItems="center">
    //     <Link to="/">
    //       <Button size="sm" colorScheme="red">
    //         <Text fontWeight="bold">명진가Z</Text>
    //       </Button>
    //     </Link>
    //     <Input marginX="10" size="sm" placeholder="삼품 검색"/>
    //     <Link to="/my-animal">
    //       <Button size="sm" colorScheme="red">
    //         MyAnimal
    //       </Button>
    //     </Link>
    //     <Link to="/sale-animal">
    //       <Button size="sm" colorScheme="red">
    //         Sale Animal
    //       </Button>
    //     </Link>
    //   </Grid>
    //   <Flex
    //     direction="column"
    //     h="full"
    //     justifyContent="center"
    //     alignItems="center"
    //   >
    //     {children}
    //   </Flex>
    // </Stack>
  );
};

export default Layout;
