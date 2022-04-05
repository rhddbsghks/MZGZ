import React, { useRef } from "react";

import { mintProductContract, saleProductContract } from "../web3Config";

import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Stack,
} from "@chakra-ui/react";
import SaleProductCard from "../components/SaleProductCard";
import Loader from "../common/Loader";

const SaleProduct = ({ account }) => {
  const [saleProductArray, setSaleProductArray] = useState();
  const [loading, setLoading] = useState(true);
  const [filterArray, setFilterArray] = useState([]);
  const [checkedItems, setCheckedItems] = useState([
    true,
    true,
    true,
    true,
    true,
  ]);
  const typeIdx = {
    상의: 0,
    하의: 1,
    신발: 2,
    악세사리: 3,
    기타: 4,
  };

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const top = useRef();
  const bottom = useRef();
  const shoes = useRef();
  const acc = useRef();
  const etc = useRef();

  const getOnSaleProducts = async () => {
    try {
      setLoading(true);
      const onSaleProductArrayLength = await saleProductContract.methods
        .getOnSaleProductArrayLength()
        .call();

      const tempOnSaleArray = [];

      for (let i = 0; i < parseInt(onSaleProductArrayLength, 10); i++) {
        const productId = await saleProductContract.methods
          .onSaleProductArray(i)
          .call();

        const product = await mintProductContract.methods
          .getProduct(productId)
          .call();

        console.log("제품");
        console.log(product);

        const productPrice = await saleProductContract.methods
          .getProductPrice(productId)
          .call();

        tempOnSaleArray.push({
          productId,
          brand: product.brand,
          type: product.productType,
          name: product.name,
          serialNum: product.serialNum,
          productPrice,
        });
      }

      setSaleProductArray(tempOnSaleArray);
      setFilterArray(tempOnSaleArray);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeAll = (e) => {
    const toggle = e.target.checked;
    console.log(toggle);
    top.current.checked = toggle;
    console.log(top);
  };

  useEffect(() => {
    getOnSaleProducts();
  }, []);

  useEffect(() => {
    if (saleProductArray)
      setFilterArray(
        saleProductArray.filter((item) => checkedItems[typeIdx[item.type]])
      );
    // setFilterArray();
  }, checkedItems);

  const rendList = () => {};

  return (
    <>
      <Flex h="30%" marginTop="5%" marginBottom="2%">
        <Stack direction={["column", "row"]} mb="5">
          {" "}
          <Checkbox
            size="lg"
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            onChange={(e) =>
              setCheckedItems([
                e.target.checked,
                e.target.checked,
                e.target.checked,
                e.target.checked,
                e.target.checked,
              ])
            }
          >
            전체
          </Checkbox>
        </Stack>
        <Stack pl={6} mt={1} spacing={10} direction={["column", "row"]} mb="5">
          <Checkbox
            size="lg"
            isChecked={checkedItems[0]}
            onChange={(e) =>
              setCheckedItems([
                e.target.checked,
                checkedItems[1],
                checkedItems[2],
                checkedItems[3],
                checkedItems[4],
              ])
            }
          >
            상의
          </Checkbox>
          <Checkbox
            size="lg"
            isChecked={checkedItems[1]}
            onChange={(e) =>
              setCheckedItems([
                checkedItems[0],
                e.target.checked,
                checkedItems[2],
                checkedItems[3],
                checkedItems[4],
              ])
            }
          >
            하의
          </Checkbox>
          <Checkbox
            size="lg"
            isChecked={checkedItems[2]}
            onChange={(e) =>
              setCheckedItems([
                checkedItems[0],
                checkedItems[1],
                e.target.checked,
                checkedItems[3],
                checkedItems[4],
              ])
            }
          >
            신발
          </Checkbox>
          <Checkbox
            size="lg"
            isChecked={checkedItems[3]}
            onChange={(e) =>
              setCheckedItems([
                checkedItems[0],
                checkedItems[1],
                checkedItems[2],
                e.target.checked,
                checkedItems[4],
              ])
            }
          >
            악세사리
          </Checkbox>
          <Checkbox
            size="lg"
            isChecked={checkedItems[4]}
            onChange={(e) =>
              setCheckedItems([
                checkedItems[0],
                checkedItems[1],
                checkedItems[2],
                checkedItems[3],
                e.target.checked,
              ])
            }
          >
            기타
          </Checkbox>
        </Stack>
      </Flex>

      {loading ? (
        <Loader msg="판매 상품 불러오는 중..."></Loader>
      ) : (
        <Flex>
          {filterArray && filterArray.length > 0 ? (
            <Grid templateColumns="repeat(4,1fr)" gap="8">
              {filterArray.map((v, i) => {
                return (
                  <SaleProductCard
                    key={i}
                    productTokenId={v.productId}
                    brand={v.brand}
                    productType={v.type}
                    name={v.name}
                    serialNum={v.serialNum}
                    productPrice={v.productPrice}
                    account={account}
                    getOnSaleProducts={getOnSaleProducts}
                  />
                );
              })}
            </Grid>
          ) : (
            <Box>판매중인 상품이 없습니다.</Box>
          )}
        </Flex>
      )}
    </>
  );
};

export default SaleProduct;
