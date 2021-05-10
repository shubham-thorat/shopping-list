import axios from 'axios'
import {
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    USER_LOADING
} from "../DataTypes";
import { returnErros } from './ErrorAction';


//check token & load user
export const loadUser = () => (dispatch, getState) => {
    //userloading
    dispatch({ type: USER_LOADING })

    axios.get('/api/auth/user', tokenconfig(getState))
        .then(res => dispatch({ type: USER_LOADED, payload: res.data }))
        .catch(err => {
            dispatch(returnErros(err.response.data, err.response.status))
            dispatch({ type: AUTH_ERROR })
        })
}

//login user
export const login = ({ email, password }, dispatch) => {
    //Headers 
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // /request body
    const body = JSON.stringify({ email, password })
    axios.post('/api/auth', body, config)
        .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
        .catch(err => {
            dispatch(returnErros(err.response.data, err.response.status, 'LOGIN_FAIL'))
            dispatch({ type: LOGIN_FAIL })
        })

}

//logout user
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

//setup config/headers and token
export const tokenconfig = getState => {
    //get Token localStorage
    const token = getState().auth.token;

    //Headers 
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //add token to headers
    if (token) {
        config.headers["x-auth-token"] = token
    }

    return config
}

export const register = ({ name, email, password }, dispatch) => {
    //Headers 
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // /request body
    const body = JSON.stringify({ name, email, password })
    axios.post('/api/users', body, config)
        .then(res => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
        .catch(err => {
            dispatch(returnErros(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({ type: REGISTER_FAIL })
        })
}
