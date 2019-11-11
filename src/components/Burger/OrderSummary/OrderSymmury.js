import React from 'react'

import Aux from '../../../hoc/myAux'
import Button from '../../UI/Button/Button'

class OrderSymmury extends React.Component{
    componentWillUpdate() {
        console.log("order will update")
    }

    render() {
        const ingredientSummury = Object.keys(this.props.ingredients)
            .map(ingKey =>
                <li key={ingKey}>
                    <span style={{textTransform: "capitalize"}}>{ingKey}</span>:{this.props.ingredients[ingKey]}
                </li>);
        return (
            <Aux>
                <h3>Your order</h3>
                <p>burger with following ingredients: </p>
                <ul>
                    {ingredientSummury}
                </ul>
                <p><strong>Total price: {this.props.price.toFixed(2)}$</strong></p>
                <div>Continue?</div>
                <Button btnType='Danger' clictked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        )
    }


}

export default OrderSymmury;