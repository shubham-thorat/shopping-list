import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { register } from '../../redux/actions/AuthAction'
import { clearErrors } from '../../redux/actions/ErrorAction'
function RegisterModal() {
    const [user, setuser] = useState({
        name: '',
        email: '',
        password: '',
        msg: null
    })

    const error = useSelector(state => state.error)

    const dispatch = useDispatch()
    useEffect(() => {

        if (error.id === 'REGISTER_FAIL') {
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
        e.preventDefault()
        const { name, email, password } = user
        const newuser = { name, email, password }

        //attempt to register
        register(newuser, dispatch)
    }

    const HandleClear = () => {
        dispatch(clearErrors())
    }
    return (
        <div className="container">
            <button type="button" className="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#RegisterModal">
                Register
            </button>

            <div className="modal fade" id="RegisterModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Register Form </h5>
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
                                <h1 className="h3 mb-3 fw-normal text-center">Please Sign Up</h1>
                                <div className="form-floating mb-1">
                                    <input type="text" className="form-control" id="floatingName" placeholder="Enter Name" value={user.name} onChange={e => setuser({ ...user, name: e.target.value })} />
                                    < label htmlFor="floatingName"> Name </label>
                                </div>
                                <div className="form-floating mb-1">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={user.email} onChange={e => setuser({ ...user, email: e.target.value })} />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-1">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={user.password} onChange={e => setuser({ ...user, password: e.target.value })} />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>

                                <div className="checkbox mb-3">
                                    <label>
                                        <input type="checkbox" value="remember-me" /> Remember me
                                    </label>
                                </div>
                                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterModal
