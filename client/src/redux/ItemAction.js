import { DELETE_ITEM, GET_ITEMS, ITEMS_LOADING, SEND_ITEM } from "./ItemTypes"
import axios from 'axios'

export const getItems = (dispatch) => {
    dispatch(setItemLoading())
    axios.get('/api/items')
        .then(res =>
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })
        )
        .catch(err => console.log(err))
}

export const sendItem = (Item, dispatch) => {
    axios.post('/api/items', {
        "name": Item
    }).then(res => {
        dispatch({
            type: SEND_ITEM,
            payload: res.data
        })
    })
}

export const deleteItem = (id, dispatch) => {
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