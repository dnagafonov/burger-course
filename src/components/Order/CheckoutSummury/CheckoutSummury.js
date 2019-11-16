import React from 'react'
import Burger from '../../Burger/Burger';
import Button from "../../UI/Button/Button";
import './CheckoutSummury.css'

const checkoutSummury = (props) => {
    return(
        <div className="CheckoutSummury">
            <h1 style={{margin: "60px 0 10px 0"}}>We hope u will die</h1>
            <div style={{width: "100%", margin: "auto" }}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>Cancel</Button>
            <Button btnType="Danger" clicked={props.checkoutContinued}>Continue</Button>
        </div>
    )
};

export default checkoutSummury;