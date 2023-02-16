const express= require('express');
const { addBook, getAllBooks, getOneBook, deleteBook, deleteBooks, updateBook }= require('../controllers/Admin');
const bookRouter= express.Router();

//add new book
bookRouter.post('/add',addBook)
//get all books
bookRouter.get('/list',getAllBooks)
//get one book by id
bookRouter.get('/listOne/:id',getOneBook)
//delete one book
bookRouter.delete('/delete/:id',deleteBook)
//delete all books
bookRouter.delete('/deleteAll',deleteBooks)
//update a book 
bookRouter.put('/update/:id',updateBook)

module.exports= bookRouter;