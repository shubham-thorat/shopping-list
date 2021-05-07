import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar'
import ShopingList from './components/ShopingList'
import './App.css'

function App() {
  return (

    <div className="App">
      <AppNavbar />
      <div className="container d-flex align-items-center justify-content-center">
        <ShopingList />
      </div>
    </div>

  );
}

export default App;
