import React from 'react';
import Button from "../../../components/UI/Button/Button";

export default class ContactData extends React.Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }
    render() {
        return(
            <div>
                <h4>Enter data</h4>
                <form>
                    <input type='text' name='name' placeholder="your name"/>
                    <input type='email' name='email' placeholder="your email"/>
                    <input type='text' name='street' placeholder="Street"/>
                    <input type='text' name='postal' placeholder="PostalCOde"/>
                    <Button btmType='Success'>Order</Button>
                </form>
            </div>
        )
    }
}