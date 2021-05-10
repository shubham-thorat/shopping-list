import { CLEAR_ERRORS, GET_ERROS } from '../DataTypes'


const initialState = {
    msg: {},
    status: null,
    id: null
}

const ErrorReducer = (state = initialState, action) =>{
    switch (action.type) {
        case GET_ERROS:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            }
        case CLEAR_ERRORS:
            return {
                msg: {},
                status: null,
                id: null
            }
        default:
            return state
    }
}

export default ErrorReducer