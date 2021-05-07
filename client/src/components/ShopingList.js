import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { deleteItem, getItems, sendItem } from '../redux/ItemAction';
import { v4 as uuiv4 } from 'uuid'

function ShopingList() {
    const [Item, setItem] = useState('')
    const dispatch = useDispatch()
    const itemData = useSelector(state => state.ItemReducer)
    const items = itemData.items
    useEffect(() => {
        getItems(dispatch)
    }, [dispatch])

    const HandleClick = () => {
        if (Item.length) {
            sendItem(Item , dispatch)
        }

    }

    const HandleDelete = (id) => {
       deleteItem(id,dispatch)
    }
    return (
        <div className="container">
            <button type="button" className="btn btn-primary mb-3 mt-2" data-toggle="modal" data-target="#exampleModal">
                Add Item
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input type="text" value={Item} onChange={e => setItem(e.target.value)}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id="close-button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={HandleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <ul className="list-group list-group-numbered">
                {
                    items && items.length && items.map(item =>
                        <li className="list-group-item" key={item._id}>
                            <button type="button" className="btn close" onClick={() => HandleDelete(item._id)}> &times;</button>
                            <h4 className="d-inline-block ml-5"> {item.name} </h4>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default ShopingList
