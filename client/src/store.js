import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { ItemReducer } from './redux/ItemReducer'

const rootReducer = combineReducers({
     ItemReducer
})

const store = createStore(rootReducer,
     compose(
          applyMiddleware(thunk),
          window.devToolsExtension ? window.devToolsExtension() : f => f
     )
)

export default store