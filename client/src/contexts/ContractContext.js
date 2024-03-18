import React, {createContext,useContext,useState,useEffect} from "react";
import Web3 from 'web3';
import { contract_address } from "../config/contract";
import abi from '../config/abi.json';

const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
const [contract, setContract] = useState(null);
const [account, setAccount] = useState(null);
const [accounts, setAccounts] = useState([]);
const [balance, setBalance] = useState();

useEffect(() => {
    const initializeContract = async () => {
      const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8545');
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          if (accounts && accounts.length > 0) {
            setAccounts(accounts);
            setAccount(accounts[0]);
  
            const weiBalance = await web3.eth.getBalance(accounts[0]);
            const etherBalance = web3.utils.fromWei(weiBalance, 'ether');
            setBalance(etherBalance.slice(0, 8));

            const contractInstance = new web3.eth.Contract(abi, contract_address);
            setContract(contractInstance);
          } else {
            console.error('No accounts found');
          }
        } catch (error) {
          console.error('Error fetching account balance:', error);
        }
      } else {
        alert('Install MetaMask extension!');
      }
    };

    initializeContract();
  }, []);

  return (
    <ContractContext.Provider value={{ contract, account, balance, accounts }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
};

