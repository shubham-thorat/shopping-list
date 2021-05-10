import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { clearErrors } from '../../redux/actions/ErrorAction'
import { login } from '../../redux/actions/AuthAction'

function LoginModal() {
    const [user, setuser] = useState({
        email: '',
        password: '',
        msg: null
    })

    const error = useSelector(state => state.error)

    const dispatch = useDispatch()
    useEffect(() => {

        if (error.id === 'LOGIN_FAIL') {
            setuser({
                ...user,
                msg: error.msg.msg
            })
        }
        else {
            setuser({
                ...user,
                msg: null
            })

        }
    }, [error])
    const HandleSubmit = (e) => {
        const { email, password } = user
        login({ email, password }, dispatch)
        e.preventDefault()
    }

    const HandleClear = () => {
        dispatch(clearErrors())
    }
    return (
        <div className="container">
            <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#LoginModal">
                Login
            </button>

            <div className="modal fade" id="LoginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Login Form </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={HandleClear}> </button>
                        </div>
                        <div className="modal-body">
                            {user.msg ?
                                <div className="alert alert-danger" role="alert">
                                    {user.msg}
                                </div> :
                                null
                            }
                            <form onSubmit={HandleSubmit}>
                                <h1 className="h3 mb-3 fw-normal text-center"> Sign In</h1>
                                <div className="form-floating mb-2">
                                    <input type="email" className="form-control" id="floatingLoginInput" placeholder="name@example.com" value={user.email} onChange={e => setuser({ ...user, email: e.target.value })} />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-2">
                                    <input type="password" className="form-control" id="floatingLoginPassword" placeholder="Password" value={user.password} onChange={e => setuser({ ...user, password: e.target.value })} />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <button className="w-100 btn btn-lg btn-primary" type="submit">Login </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal
