const initialState = {
    is_login: false,
    username: '',
    email: '',
    role: ''
}

const authUserReducer = ( state = initialState, {type, payload}) => {
    switch(type) {
        case 'LOGIN':
            return {
                is_login: true,
                username: payload.username,
                email: payload.email,
                role: payload.role
            }
        case 'LOGOUT':
            return {
                is_login: false,
                username: '',
                email: '',
                role: ''
            }
        default:
            return state
    }
}

export default authUserReducer;