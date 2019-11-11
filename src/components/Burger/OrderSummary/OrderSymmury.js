import React from 'react'

import Aux from '../../../hoc/myAux'
import Button from '../../UI/Button/Button'

const OrderSymmury = (props) => {
    const ingredientSummury = Object.keys(props.ingredients)
                                    .map(ingKey =>
                                        <li key={ingKey}>
                                            <span style={{textTransform: "capitalize"}}>{ingKey}</span>:{props.ingredients[ingKey]}
                                        </li>);
    return (
        <Aux>
            <h3>Your order</h3>
            <p>burger with following ingredients: </p>
            <ul>
                {ingredientSummury}
            </ul>
            <p><strong>Total price: {props.price.toFixed(2)}$</strong></p>
            <div>Continue?</div>
            <Button btnType='Danger' clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    )
}

export default OrderSymmury;