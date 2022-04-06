import React from "react";
import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Main = () => {
  const innerBoxStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    boxSize: "full",
    color: "white",
    textShadow: "0 0 10px blue",
    fontWeight: "bold",
    fontSize: "20px",
  };
  const textStyles = {
    color: "skyblue",
    textShadow: "0 0 0 blue",
    fontWeight: "bold",
    fontSize: "30px",
  };
  const textminiStyles = {
    color: "white",
    textShadow: "0 0 5px blue",
    fontWeight: "bold",
    fontSize: "17px",
  };

  return (
    <>
      <Flex
        p="200"
        flexWrap="wrap"
        spacing="24px"
        gap="16px"
        justifyContent="space-evenly"
        verticalAlign="center"
        // style={{ background: "rgb(155, 163, 172)" }}
      >
        <Box sx={innerBoxStyles}>
          <Text>
            <strong>
              전세계 하나뿐인 당신만의 명품을 저희 사이트에 등록하세요.
            </strong>
          </Text>
        </Box>
        <Box sx={innerBoxStyles}>
          <Text>
            <strong>
              당신이 어떤 명품을 가지고 있는지 저희가 확실히 보증해드립니다.
            </strong>
          </Text>
        </Box>
        <Box sx={innerBoxStyles}>
          <Text>
            <strong>NFT를 통해서 명품을 거래하세요.</strong>
          </Text>
        </Box>
        <Box sx={innerBoxStyles}>
          <Text>
            <strong>
              어떤 제품이 언제 얼마에 거래되었는지 한눈에 확인이 가능합니다.
            </strong>
          </Text>
        </Box>
        <Grid templateColumns="repeat(3, 1fr)" spacing={10} m={5}>
          <GridItem>
            <Box
              textAlign="-webkit-center"
              borderWidth="1px"
              boxShadow="dark-lg"
              w={300}
              p="5"
              m="5"
            >
              <Text sx={textStyles}>
                <strong>첫번째</strong>
              </Text>
              <Text marginTop={8} sx={textminiStyles}>
                처음 방문이시면,
              </Text>
              <Text sx={textminiStyles}>
                MetaMask 익스텐션을 <br />
                설치해주세요
              </Text>
              <a
                href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko"
                target="_blank"
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                  w={150}
                />
              </a>
            </Box>
          </GridItem>
          <GridItem>
            <Box
              textAlign="-webkit-center"
              borderWidth="1px"
              boxShadow="dark-lg"
              w={300}
              p="5"
              m="5"
            >
              <Text sx={textStyles}>
                <strong>두번째</strong>
              </Text>
              <Text marginTop={8} sx={textminiStyles}>
                {" "}
                설치가 완료 되었다면,
              </Text>
              <Text sx={textminiStyles}>디지털 지갑을 만들어 볼까요?</Text>
              <br />
              <a
                href="https://melonmilk.tistory.com/entry/%EB%A9%94%ED%83%80%EB%A7%88%EC%8A%A4%ED%81%AC-%EC%A7%80%EA%B0%91-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%8B%A0%EA%B7%9C-%EC%A7%80%EA%B0%91-%EC%83%9D%EC%84%B1-%EB%B0%A9%EB%B2%95"
                target="_blank"
              >
                <Image src="/wallet.png" w={150} />
              </a>
            </Box>
          </GridItem>
          <GridItem>
            <Box
              textAlign="-webkit-center"
              borderWidth="1px"
              boxShadow="dark-lg"
              w={300}
              p="5"
              m="5"
            >
              <Text sx={textStyles}>
                <strong>마지막</strong>
              </Text>
              <Text marginTop={8} sx={textminiStyles}>
                {" "}
                모두 마치셨다면,{" "}
              </Text>
              <Text sx={textminiStyles}>
                이제 진정한 명품을 <br /> 만날 시간입니다.
              </Text>
              <Link to="/sale-product">
                <Image w={150} src="/shopping-bag.png" />
              </Link>
            </Box>
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
};

export default Main;
