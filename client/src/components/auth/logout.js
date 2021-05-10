import React from 'react'
import { logout } from '../../redux/actions/AuthAction'
import { useDispatch } from 'react-redux'

function Logout() {
    const dispatch = useDispatch()
    const HandleLogout = () => {
        dispatch(logout())
    }
    return (
        <>
            <button type="button" className="btn btn-outline-danger" onClick={HandleLogout}> Logout </button>
        </>
    )
}

export default Logout
