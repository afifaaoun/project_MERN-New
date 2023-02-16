const bookSchema= require('../model/BookModel');

//add new book
exports.addBook= async(req,res)=>{
    const newBook= new bookSchema(req.body);
    try{
        await newBook.save()
        res.status(200).json({message:'book added to database',newBook})
    }
    catch(error){
        res.status(500).json({message:'cannot add this book'})
    }
}
//get all books
exports.getAllBooks=async(req,res)=>{
    try{
        const bookList=await bookSchema.find();
        res.status(200).json({message:'list of all books',bookList})
    }
    catch{
        res.status(500).json({message:'cannot get the list of books'})
    }
}
//get one book by id
exports.getOneBook=async(req,res)=>{
    try{
        const {id}=req.params;
        const getBook= await bookSchema.findById(id);
        res.status(200).json({message:'book founded by id',getBook})
    }
    catch{
        res.status(500).json({message:'cannot get this book'})
    }
}
//delete one book
exports.deleteBook=async(req,res)=>{
    try{
        const {id}= req.params;
        deleted= await bookSchema.findByIdAndDelete(id);
        res.status(200).json({message:'the deleted book:',deleted})
    }
    catch{
        res.status(500).json({message:'enable to delete this book'})
    }
}
//delete all books
exports.deleteBooks=async(req,res)=>{
    try{
        deletedBooks= await bookSchema.deleteMany();
        res.status(200).json({message:'list of deleted books:',deletedBooks})
    }
    catch{
        res.status(500).json({message:'enable to delete all books'})
    }
}
//update a book 
exports.updateBook=async(req,res)=>{
    try{
        const {id}= req.params;
        updated= await bookSchema.findByIdAndUpdate(id,{$set:{...req.body}},{new:true});
        res.status(200).json({message:'the updated book:',updated})
    }
    catch{
        res.status(500).json({message:'enable to updated this book'})
    }
}