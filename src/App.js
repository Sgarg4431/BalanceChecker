import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Test from "./artifacts/contracts/Test.sol/Test.json";
//import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
function App() {
  const address = "0xF238522163060E4E4ccd2eF4732711aA5944824c";
  const [contract, setContract] = useState();
  const [account, setAccount] = useState();
  const [amount, setAmount] = useState();
  const [amountWithdraw, setAmountWithdraw] = useState();
  useEffect(() => {
    addWalletListener();
  }, []);
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    window.ethereum.on("accountChanged", async function (accounts) {
      setAccount(account[0]);
      await web3Handler();
    });
    loadContract(signer);
  };
  const loadContract = async (signer) => {
    setContract(new ethers.Contract(address, Test.abi, signer));
  };
  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setAccount("");
      console.log("Please install MetaMask");
    }
  };
  async function deposit() {
    if (contract) {
      try {
        await contract.deposit(amount,{ value: amount });
      } catch (e) {
        if (e.message.search("You are not the Onwer of account") != -1)
          alert("You are not the Onwer of account ");
        else
        console.log(e);
      }
    } else {
      alert("Connect to wallet first");
    }
  }
  async function withdraw() {
    if (contract) {
      try {
        await contract.withdraw(amountWithdraw,{ value: amountWithdraw });
      } catch (e) {
        if (e.message.search("You are not the Onwer of account") != -1)
          alert("You are not the Onwer of account ");
        else if (e.message.search("you dont have much balance") != -1) {
          alert("you dont have much balance");
        }
      }
    } else {
      alert("Connect to wallet first");
    }
  }
  async function balance() {
    if (contract) {
      try {
        alert(await contract.getBalance());
      } catch (e) {
        if (e.message.search("You are not the Onwer of account") != -1)
          alert("You are not the Onwer of account ");
      }
    } else {
      alert("Connect to wallet first");
    }
  }

  
  const style1 = {
    paddingLeft: "800px",
    display: "inline-block",
  };
  const style2 = {
    paddingLeft: "5px",
    display: "inline-block",
  };
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo192.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{" "}
            <h1 style={style2}>Balance Checker</h1>
            <h3 style={style1}>
              {account ? (
                <button>
                  {account.slice(0, 5) + "....." + account.slice(38, 42)}
                </button>
              ) : (
                <button onClick={web3Handler}>Connect wallet</button>
              )}
            </h3>
            <br></br>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Card>
        <Card.Body>
          <Card.Title>Deposit</Card.Title>
          
          <br></br>
          <Card.Text>
            <input
              onChange={(e) => setAmount(e.target.value)}
              placeholder="enter amount"
            />
            <br></br>
            <br></br>
            <Button onClick={deposit}>Deposit</Button>
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Balance</Card.Title>
<br></br>
          <Card.Text>
            <Button onClick={balance}>Balance</Button>
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Withdraw</Card.Title>
          <br></br>
         
          <Card.Text>
            <input
              onChange={(e) => setAmountWithdraw(e.target.value)}
              placeholder="enter amount to withdraw"
            />
            <br></br>
            <br></br>
            <Button onClick={withdraw}>Withdraw</Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
