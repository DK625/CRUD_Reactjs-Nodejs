import axios from '../axios'

const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password });
}
const getAllUsers = (inputId) => {
    // return axios.get(`api/?id=${inputId}`)
    // return axios.get('/api', {
    //     data: {
    //         id: inputId
    //     }
    // });
    // return axios.get('/api', inputId)
    // return axios.get('api', { id: inputId });
    // axios.get('/myController/myAction', {
    //     id: {
    //         inputId
    //     },
    //     paramsSerializer: params => {
    //         return qs.stringify(params)
    //     }
    // })
    return axios.get('api/users');
}

const createNewUserService = (data) => {
    return axios.post('/api/users', data)
}
const DeleteUserService = (userId) => {
    return axios.delete('/api/users', {
        data: {
            id: userId
        }
    });
}
const editUserService = (inputData) => {
    return axios.put('/api/users', inputData)
}
export { handleLoginApi, getAllUsers, createNewUserService, DeleteUserService, editUserService };