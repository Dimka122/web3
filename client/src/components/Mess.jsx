import React from 'react'
import theme from '../constansts/color'
import "./Mess.css";
import { Link } from 'react-router-dom';
import { useContract } from '../contexts/ContractContext';

export default function Mess({msg}) {
    const { account } = useContract();
    const isOwner = account == msg.author.login.toLowerCase();
    
    const date = new Date(Number(msg.createdTime) * 1000);
    const formattedDateTime = date.toLocaleString();

    return (
        <div className='Mess'>
            <Link style={{color: 'black'}} to={isOwner ? '/profile' : `/user/${msg.author.login}`}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2vh'}}>
                    <img className='twitt-pic' src={msg.author.avatar ? msg.author.avatar : `${process.env.PUBLIC_URL}/profile-pic.png`} alt="Profile Picture"/>
                    <div>
                        <h3>@{msg.author.username}</h3>
                        <h3 style={{color: theme.primaryColor}}>{formattedDateTime}</h3>
                    </div>
                </div>
            </Link>
            <h3 style={{marginTop: '2vh'}}>{msg.text}</h3>
            <div className="likes">
                <img src={process.env.PUBLIC_URL+'/like.png'} className='like'/>
                <h3>{msg.likes.toString()}</h3>
            </div>
        </div>
    )
}