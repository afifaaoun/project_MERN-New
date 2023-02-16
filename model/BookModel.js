const mongoose=require('mongoose');

const bookSchema= new mongoose.Schema({
    bookName: String,
    bookQuantity: Number,
    bookAuthor: String,
    bookPrice: Number,
    bookImage: String,
    bookDescription: String,
    bookUrl: Text
})

module.exports= mongoose.model('book',bookSchema);