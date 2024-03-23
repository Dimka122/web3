import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../App.css';
import './Profile.css';
import theme from '../constansts/color';
import { useContract } from '../contexts/ContractContext';
import Mess from '../components/Mess';

export default function User() {
    const { contract, account } = useContract();
    const { userAdr } = useParams();
    const [user, setUser] = useState();
    const [messs, setMesss] = useState([]);

    useEffect(() => {
      if (contract) {
          GetUserData();
          getUserMesss();
      }
    }, [contract]);

    const getUserMesss = async() => {
      try {
        const messs = await contract.methods.UserMesss(userAdr).call({ from: account });

        setMesss(messs);
      } catch (err) {
        alert(err);
      }
    }

    const GetUserData = async() => {
      try {
        const _user = await contract.methods.GetUser(userAdr).call({ from: account });

        setUser(_user);
      } catch (err) {
        alert(err);
      }
    }

    return (
      <div className='main'>
        <div className='container' 
          style={{
            alignItems: 'start', 
            justifyContent: 'flex-start',
            gap: '5vh'}}>
          <div>
            <img src={user && user.avatar ? user.avatar : process.env.PUBLIC_URL + '/basicProfile.png'} alt="avatar" className='avatar' />
          </div>
          <div className='user-info'>
            <div style={{marginTop: '5vh'}}>
              <h2>Account: <span style={{color: theme.primaryColor}}>{userAdr}</span></h2>
            </div>
          </div>
        </div>
        
        <div className="container" style={{
            alignItems: 'start', 
            justifyContent: 'flex-start', 
            marginBottom: '5vh',
            gap: '5vh'
            }}>
          
          <div className='sidebar'>
            {user && <h2 style={{marginBottom: '4vh'}}>
              <span style={{color: 'gray'}}>Username:</span><br/>@{user.username}
            </h2>}
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '5vh', width: '80%'}}>
            {
              messs.sort((a, b) => Number(b.createdTime) - Number(a.createdTime)).map((msg) => {
                return (
                  <Mess key={msg.createdTime} msg={msg} />
                );
              })
            }
          </div>
        </div> 
      </div>
    )
}