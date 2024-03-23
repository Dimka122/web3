import React from 'react'
import theme from '../constants/colors'
import './Profile.css';

const { contract, balance, account } = useContract();
const [user, setUser] = useState();
const [link, setLink] = useState();

const [text, setText] = useState('');
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const [isOpened, setIsOpened] = useState(false);
const [isLogged, setIsLogged] = useState(false);
const [isRegistered, setIsRegistered] = useState(false);

const [messs, setMesss] = useState([]);

useEffect(() => {
    if (contract) {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLogged(isLoggedIn);
  
      CheckRegistration();
      
      if(isLogged) {
        GetUserData();
        getUserMesss();
      }
    }
  }, [isLogged, contract, isRegistered]);

  const sendTransaction = async (method, args) => {
    try {
      const gasEstimation = await method(...args).estimateGas({ from: account });
      await method(...args).send({ from: account, gas: gasEstimation });
    } catch (err) {
      alert(err);
    }
  };

  const AddMess = async(_text) => {
    if(!_text) return;
  
    try {
      await sendTransaction(contract.methods.AddMess, [_text]);
  
      setText('');
      getUserMesss();
    } catch (err) {
      alert(err);
    }
  }
  
  const Registration = async(_username, _password) => {
    if(!_username || !_password) return;
    try {
      await sendTransaction(contract.methods.Registration, [_username, _password]);
  
      setIsRegistered(true);
    } catch (err) {
      alert(err);
    }
  }
  
  const Login = async(_password) => {
    if(!_password) return;
    try {
      await sendTransaction(contract.methods.Login, [_password]);
  
      localStorage.setItem('isLoggedIn', true);
      setIsLogged(true);
    } catch (err) {
      alert(err);
    }
  }