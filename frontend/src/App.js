import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Web3 from "web3";
import { Button } from "@chakra-ui/react";

import Main from "./routes/main";
import MyAnimal from "./routes/my-animal";
import SaleAnimal from "./routes/sale-animal";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";

function App() {
  const [account, setAccount] = useState("");

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

  useEffect(() => {
    getAccount();
  }, []);

  useEffect(() => console.log(account), [account]);
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Main account={account} />}></Route>
            <Route
              path="my-animal"
              element={<MyAnimal account={account} />}
            ></Route>
            <Route
              path="sale-animal"
              element={<SaleAnimal account={account} />}
            ></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
