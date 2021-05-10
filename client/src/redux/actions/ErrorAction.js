import { GET_ERROS, CLEAR_ERRORS } from '../DataTypes'


//method to return error
export const returnErros = (msg, status, id = null) => {
    return {
        type: GET_ERROS,
        payload: { msg, status, id }
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}