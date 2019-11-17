import React from 'react';
import Button from "../../../components/UI/Button/Button";
import './ContactData.css'
import axios from '../../../axios-order'
import Spinner from "../../../components/UI/Spinner/Spinner";

export default class ContactData extends React.Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Max Schwarzmüller',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    };

    render() {
        let form = (
            <form>
                <input type='text' name='name' placeholder="your name"/>
                <input type='email' name='email' placeholder="your email"/>
                <input type='text' name='street' placeholder="Street"/>
                <input type='text' name='postal' placeholder="PostalCOde"/><br/>
                <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return(
            <div className="ContactData">
                <h4>Enter data</h4>
                {form}
            </div>
        )
    }
}