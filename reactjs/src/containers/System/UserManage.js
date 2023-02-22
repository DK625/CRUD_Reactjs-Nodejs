import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, DeleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from "../../utils/emitter";
class UserManage extends Component {

    constructor(prop) {
        super(prop);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }
    // gọi api và lấy dữ liệu từ api về, arrUsers lấy dữ liệu users

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }
    // toggleUserModal = () => {

    // }

    createNewUser = async (data) => {
        try {
            // console.log('show data: ', data);
            let response = await createNewUserService(data);
            // console.log('show response: ', response);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e)
        }
    }
    handleDeleteUser = async (user) => {
        try {
            // console.log('show user: ', user);
            let response = await DeleteUserService(user.id);
            // console.log('show response: ', response);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact();
            }
        } catch (e) {
            console.log(e)
        }
    }
    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUse: true,
            userEdit: user
        })
    }
    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUse: !this.state.isOpenModalEditUse
        })
    }
    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUse: false
                })
                await this.getAllUsersFromReact()
            } else {
                alert(res.errCode)
            }
        } catch (e) {
            console.log(e)
        }
    }
    render() {
        // console.log('check render ', this.state)
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser} // isOpen trong modelUser(component con) được nhận state isOpenModalUser(component cha)
                    toggleOut={this.handleAddNewUser}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUse &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUse}
                        toggleOut={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className="text-center">CRUD with React</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-5' onClick={() => this.handleAddNewUser()}>Add new users</button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {arrUsers && arrUsers.map((item, index) => {
                                // console.log('check map', item, index)
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'
                                                onClick={() => this.handleEditUser(item)}
                                            >Edit</button>
                                            <button
                                                onClick={() => { this.handleDeleteUser(item) }}
                                            >Delete</button>
                                        </td>
                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

// git push https://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@github.com/DK625/CRUD-reactjs-nodejs.git