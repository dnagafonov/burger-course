import React from 'react'

import Aux from '../../../hoc/myAux'
import Button from '../../UI/Button/Button'

class OrderSymmury extends React.Component{
    render() {
        const ingredientSummury = Object.keys(this.props.ingredients)
            .map(ingKey =>
                <li key={ingKey}>
                    <span style={{textTransform: "capitalize"}}>{ingKey}</span>:{this.props.ingredients[ingKey]}
                </li>);
        const {price , purchaseCanceled, purchaseContinue} = this.props;
        return (
            <Aux>
                <h3>Your order</h3>
                <p>burger with following ingredients: </p>
                <ul>
                    {ingredientSummury}
                </ul>
                <p><strong>Total price: {price.toFixed(2)}$</strong></p>
                <div>Continue?</div>
                <Button btnType='Danger' clicked={purchaseCanceled}>CANCEL</Button>
                <Button btnType='Success' clicked={purchaseContinue}>CONTINUE</Button>
            </Aux>
        )
    }


}

export default OrderSymmury;