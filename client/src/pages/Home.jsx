import React, {useEffect, useState} from 'react'
import { useContract } from '../contexts/ContractContext';
import Mess from '../components/Mess';

export default function Home() {
  const { contract, accounts, account } = useContract();
  const [messs, setMesss] = useState([]);

  const getAllMesss = async() => {
    try {
      const uniqueMesssSet = new Set();

      for (const acc of accounts) {
        if(acc != account) {
          const _messs = await contract.methods.UserMesss(acc).call({ from: account });
        
          _messs.forEach((msg) => uniqueMesssSet.add(msg));
        }
      };

      const uniqueMesssArray = [...uniqueMesssSet];

      setMesss(uniqueMesssArray);
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    if (contract) {
      getAllMesss();
    }
  }, [contract]);

  return (
    <div className='main'>
      <div className="container" style={{display: 'flex', justifyContent: 'center', marginBottom: '5vh'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '5vh', width: '80%'}}>
          {
            messs.sort((a, b) => Number(b.createdTime) - Number(a.createdTime)).map((msg) => {
              return (
                <Mess key={msg.createdTime}  msg={msg} />
              );
            })
          }
        </div>
      </div>
    </div>
  )
}