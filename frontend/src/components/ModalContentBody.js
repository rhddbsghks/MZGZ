import React from "react";
import { web3 } from "../web3Config";
import { Text, Image, Heading, Flex, Square, Box } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useState } from "react";


const ModalContentBody = ({
  productTokenId,
  brand,
  name,
  serialNum,
  account,
  saleHistory
}) => {
  const [picture,setPicture] = useState([]);

  useEffect(() => {

    axios.get("/user/picture",{params:{
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
          <br />
          <Text fontSize='lg'><strong>소유자: </strong> {account}</Text>
          <Text fontSize='lg'><strong>시리얼번호: </strong> {serialNum}</Text>
          <br/>
          {
            saleHistory && saleHistory.length > 0 ?
              <><Text fontSize='lg' marginBottom='2'><strong>총 {saleHistory.length}건의 거래 내역이 있습니다.</strong></Text><Box>
              {saleHistory.map((v, _) => {
                var time = new Date( Date.parse( new Date( v.dealTime * 1000 ).toUTCString() ) );
                return <Text fontSize='lg'><strong>거래 일시(가격): </strong>{time.toLocaleString()} ({web3.utils.fromWei(v.dealPrice)} ETH)</Text>;
              })}</Box></>
            :
            <Heading size='md'>첫 거래의 주인공이 되어 보세요!</Heading>
          }
        </Box>
      </Flex>
    </>
  )
}

export default ModalContentBody;