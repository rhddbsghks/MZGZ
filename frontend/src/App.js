import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Web3 from "web3";
import { Button } from "@chakra-ui/react";
import { mintProductContract, saleProductAddress } from "./web3Config";
import Main from "./routes/main";
import MyProduct from "./routes/my-product";
import SaleProduct from "./routes/sale-product";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";

function App() {
  const [account, setAccount] = useState("");
  console.log(window.ethereum);
  const getAccount = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);
      } else {
        alert("install metamask!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const activateApprove = async () => {
    try {
      if (!account) return;

      mintProductContract.methods
        .setApprovalForAll(saleProductAddress, true)
        .send({ from: account });
    } catch (error) {
      console.error(error);
    }

    localStorage.setItem(account, "true");
  };

  useEffect(() => {
    getAccount();

    if (localStorage.getItem(account) !== "true") activateApprove();
  }, [account]);

  useEffect(() => console.log(account), [account]);
  return (
    <>
      <BrowserRouter>
        <Layout account={account}>
          <Routes>
            <Route path="/" element={<Main account={account} />}></Route>
            <Route
              path="my-product"
              element={<MyProduct account={account} />}
            ></Route>
            <Route
              path="sale-product"
              element={<SaleProduct account={account} />}
            ></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
