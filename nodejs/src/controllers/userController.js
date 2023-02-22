import userService from '../services/userService';

let handleLoging = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password)
    //check email exist
    //password nhap vao ko dung
    //return userInfor
    // access_token :JWT json web token

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}
let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;
    // if (!id) {
    //     return res.status(200).json({
    //         errCode: 1,
    //         errMessage: 'Missing required parameter',
    //         users: []
    //     })
    // }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}
let handleCreateNewUsers = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}
let handleDeleteUsers = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message)
}
let handleEditUsers = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message)
}

module.exports = {
    handleLoging: handleLoging,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUsers: handleCreateNewUsers,
    handleDeleteUsers: handleDeleteUsers,
    handleEditUsers, handleEditUsers,
}