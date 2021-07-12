// Book Class: Represents a Book
class Book {
  constructor(title, author, publishedDate) {
    this.title = title;
    this.author = author;
    this.publishedDate = publishedDate;
  }
}

// UI Class: Handle UI Tasks
class UI {
  // Display Books Function: To display all the books.
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  // addBookToList: To add the books to a particular list in which all books are stored. 
  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.publishedDate}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
  }

  // deleteBook: To delete particular book by clicking on a button
  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  // clearFields: To clear all the fields. 
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#publishedDate').value = '';
  }
}

// Store Class: Handles Storage
class Store {
  //getBooks: To use in the various other classes to get the books list from localStorage
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  // addBook: adding the book into the storage.
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  // removeBook: To delete the book from the storage.
  static removeBook(publishedDate) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.publishedDate === publishedDate) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }

}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
const bookForm = document.querySelector('#book-form');
if (bookForm) {
  bookForm.addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const publishedDate = document.querySelector('#publishedDate').value;

    // Validate if the fields are empty
    if (title === '' || author === '' || publishedDate === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      // Instatiate book
      const book = new Book(title, author, publishedDate);

      // Add Book to UI
      UI.addBookToList(book);

      // Add book to store
      Store.addBook(book);

      // Show success message
      UI.showAlert('Book Added', 'success');

      // Clear fields
      UI.clearFields();
    }
  });
}


// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Book Removed', 'success');
});

// Filter the books
let books = Store.getBooks();
var render = function (data) {
  console.log(data)
  const list = document.querySelector('#book-list');
  list.innerHTML = '';
  data.map(book => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.publishedDate}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  })
}

