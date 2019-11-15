import React from 'react';
import Aux from "../myAux";
import Modal from "../../components/UI/Modal/Modal";
import axios from '../../axios-order'

const WithErrorHandler = (WrappedComponent) => {
    return class extends React.Component {
        state = {
            error: null,
        };
        componentDidMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error});
                console.log(error);
            })
        }

        componentWillUnmount() {
            console.log('will unm', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error:null})
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error}
                            clicked={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
};

export default WithErrorHandler;