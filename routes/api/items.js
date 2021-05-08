import express from 'express'
import {Item} from '../../models/item.js'

const router = express.Router()

//@routes GET  api/items
//@desc   Get All items
//@access Public
router.get('/',(req,res)=>{
    Item.find((err , items)=>{
        if(err) 
            res.status(404).send({
                'error' : err.message
            })
        else 
            res.status(200).json(items)
    }).sort({"name" : 1})
})

//@routes POST  api/items
//@desc   create post
//@access Public
router.post('/',(req,res)=>{
    console.log(req.body)
    const newitem = new Item({
       name : req.body.name
   })
   newitem.save()
   .then( item => res.json(item))

})

//@routes DELETE  api/items/:id
//@desc   delete post
//@access Public
router.delete('/:id',(req,res)=>{
 Item.findById(req.params.id)
 .then( item =>{
     item.remove()
     .then(()=> res.json({success : true}))
 })
 .catch( err => {
     res.status(404).json({
         success : false
     })
 })

})

export default router