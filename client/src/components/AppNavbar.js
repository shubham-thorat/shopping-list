import React from 'react'
import Logout from './auth/logout'
import RegisterModal from './auth/RegisterModal'
import { useSelector } from 'react-redux'
import Login from './auth/loginModal'

function AppNavbar() {
    const auth = useSelector(state => state.auth)
    const { isAuthenticated, user } = auth

    const authLinks = (
        <React.Fragment>
            <h4 className="nav-item text-light mr-3">  {user ? `Welcome - ${user.name}` : ''} </h4>
            <Logout />
        </React.Fragment>
    )
    const guestLinks = (
        <React.Fragment>
            <RegisterModal />
            <Login />
        </React.Fragment>
    )
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex" style={{ justifyContent: 'space-between' }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <i className="fas fa-shopping-cart"></i>    ShoppingList
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" target="__blank" href="https://github.com/shubham-thorat">Github </a>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex">
                        {
                            isAuthenticated ? authLinks : guestLinks
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default AppNavbar
