import { DELETE_ITEM, GET_ITEMS, ITEMS_LOADING, SEND_ITEM } from "./ItemTypes";

const initialState = {
    items: [],
    loading : false,

}

export const ItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items : action.payload,
                loading : false
            }
        case SEND_ITEM:
            return {
                ...state,
                items : [...state.items,action.payload]
            }
        case DELETE_ITEM:
            return {
                ...state,
                items : state.items.filter(item => item._id !== action.payload)
            }
        case ITEMS_LOADING:
            return {
                ...state,
                loading : true
            }
        default:
            return initialState
    }
}