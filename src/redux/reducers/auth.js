const initialState = {
    is_login: true,
    username: 'TestGuy',
    email: 'TestGuy@local',
    role: 'admin'
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
                username: null,
                email: false,
                role: false
            }
        default:
            return state
    }
}

export default authUserReducer;