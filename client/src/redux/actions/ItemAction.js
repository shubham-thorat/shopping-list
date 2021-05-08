import { ITEMS_LOADING, DELETE_ITEM, GET_ITEMS, ADD_ITEM } from '../DataTypes'
import axios from 'axios'

export const getItems = (dispatch) => {
    axios.get('/api/items')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch(err => console.error(err))
}

export const addItem = (item , dispatch) => {
    axios.post('/api/items', { "name": item })
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
}

export const deleteItem = (id , dispatch) => {
    axios.delete(`/api/items/${id}`)
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
}

export const setItemLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}