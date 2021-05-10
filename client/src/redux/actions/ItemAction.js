import { ITEMS_LOADING, DELETE_ITEM, GET_ITEMS, ADD_ITEM } from '../DataTypes'
import axios from 'axios'
import dotenv from 'dotenv'
import { returnErros } from './ErrorAction'
import { tokenconfig } from './AuthAction'
dotenv.config()

export const getItems = (dispatch) => {
    dispatch(setItemLoading())
    axios.get('/api/items',)
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErros(err.response.data, err.response.status)))
}

export const addItem = (item, dispatch, token) => {
    axios.post('/api/items', { "name": item }, tokenconfig2(token))
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
        .catch(err => dispatch(returnErros(err.response.data, err.response.status)))
}

export const deleteItem = (id, dispatch, token) => {
    axios.delete(`/api/items/${id}`, tokenconfig2(token))
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
        .catch(err => dispatch(returnErros(err.response.data, err.response.status)))
}

export const setItemLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}

export const tokenconfig2 = token => {
    //get Token localStorage
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