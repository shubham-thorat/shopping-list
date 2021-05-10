import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar'
import ShopingList from './components/ShopingList'
import './App.css'
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './redux/actions/AuthAction'

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <div className="container d-flex align-items-center justify-content-center">
          <ShopingList />
        </div>
      </div>
    </Provider>

  );
}

export default App;
