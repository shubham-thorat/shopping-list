import mongoose from 'mongoose'

const ItemSchema = mongoose.Schema({
    name : {
        type : String,
        required :true
    },
    date : {
        type : Date,
        default : Date.now
    }
});

export const Item = mongoose.model('Items',ItemSchema)
 