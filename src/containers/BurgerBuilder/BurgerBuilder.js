import React, { Component } from 'react';

import Aux from '../../hoc/myAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSymmury from "../../components/Burger/OrderSummary/OrderSymmury";
import axios from '../../axios-order';
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
    tomato: 0.5,
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    };

    componentDidMount() {
        axios.get('https://burger-7e088.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState( {ingredients: response.data}
            )})
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    sumOfIngredients = (ingredients) => {
        return Object.keys(ingredients)
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
    };
    updatePurchaseState (ingredients) {
        const sum = this.sumOfIngredients(ingredients);
        this.setState( { purchasable: sum > 2 } );
    }

    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount > 1){
            return;
        }
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.setState({ loading: true});
        const order = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            customer: {
                name: "Chlenik kalinov",
                address: {
                    street: "teststreet 12",
                    zipCode: 21312,
                    country: "USA"
                },
                email: 'test@chlenik.com',
            },
            deliveryMethod: 'fastest',
        };
        axios.post('orders.json', order)
            .then(response => {
              this.setState({loading: false, purchasing: false})
            })
            .catch(eror => {
                this.setState({loading: false, purchasing: false})
            });
    };

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = <Spinner/>;
        if(this.state.ingredients) {
            burger =  (<Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}/>
            </Aux>
            );
            orderSummary = <OrderSymmury
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}/>;
        }
        if( this.state.loading ){
            orderSummary = <Spinner/>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default WithErrorHandler(BurgerBuilder, axios);