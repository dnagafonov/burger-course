import React from 'react'
import CheckoutSummury from '../../components/Order/CheckoutSummury/CheckoutSummury'
import ContactData from "./ContactData/ContactData";
import {Route} from 'react-router-dom'
export default class Checkout extends React.Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 2
        }
    };
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            // ['salad', '1']
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };
    render() {
        return(
            <div>
                <CheckoutSummury
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients = {this.state.ingredients}/>
                    <Route path={this.props.match.path + "/contact-data"} component={ContactData}/>
            </div>
        )
    }
}