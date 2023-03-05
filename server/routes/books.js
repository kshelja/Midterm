// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');



// express.urlencoded({extended: true});
// express.json() // To parse the incoming requests with JSON payloads


/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let books = require('../models/books');

    res.render('books/details', {
      title: 'Books',
      books: books
    });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', async (req, res) => {

    /*****************
     * ADD CODE HERE *
     *****************/
  
    const {title, price, author, genre} = req.body;

    try {
      
      await book.create({Title:title, Price:price, Author:author, Genre:genre});

      res.redirect("/books");

    } catch (error) {
      res.status(500).send(error)
    }


});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    const {id} = req.params;
    console.log(id);

    let books = require('../models/books');

      book.findById(id, (err, books) => {
        if (err) {
          return console.error(err);
        }
        else {
          res.render('books/details', {
            title: 'Books',
            books: books
          });
        }
      })


});

// POST - process the information passed from the details form and update the document
router.post('/:id', async (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    const {id} = req.params;

    const {title, price, author, genre} = req.body;
    
    console.log(id);
    console.log("ping")

    await book.findByIdAndUpdate({_id: id},{Title:title, Price:price, Author:author, Genre:genre});
    
    res.redirect("/books");


});

// GET - process the delete by user id
router.get('/delete/:id', async (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    const {id} = req.params;
    await book.findById(id).remove();
    res.redirect("/books");


});


module.exports = router;
