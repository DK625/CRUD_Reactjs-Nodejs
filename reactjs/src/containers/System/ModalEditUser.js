import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from "../../utils/emitter";
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(prop) {
        super(prop);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }
    componentDidMount() {
        // console.log('show: ', this.props.currentUser)
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
    }

    toggle = () => {
        this.props.toggleOut();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            this.props.editUser(this.state);
        }
    }
    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className='abcClassName' size='lg'>
                <ModalHeader toggle={() => { this.toggle() }}>Edit User</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Email</label>
                                <input type='text'
                                    onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                    value={this.state.email}
                                    disabled
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Password</label>
                                <input type='password'
                                    onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                    value={this.state.password}
                                    disabled
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>First Name</label>
                                <input type='text'
                                    onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }}
                                    value={this.state.firstName}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Last Name</label>
                                <input type='text'
                                    onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }}
                                    value={this.state.lastName}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Address</label>
                                <input type='text'
                                    onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                                    value={this.state.address}
                                />
                            </div>
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.handleSaveUser() }}>
                        Save Changes
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);



