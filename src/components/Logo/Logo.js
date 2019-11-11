import React from 'react'
import './Logo.css'
import LogoImg from '../../assets/images/burger-logo.png'
const Logo = props => (
    <div className='Logo'>
        <img src={LogoImg} alt='burger'/>
    </div>
);

export default Logo;