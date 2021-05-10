import ItemReducer from './reducers/ItemReducer'
import ErrorReducer from './reducers/ErrorReducer'
import AuthReducer from './reducers/AuthReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
     item: ItemReducer,
     error: ErrorReducer,
     auth: AuthReducer
})

export default rootReducer
