//------------book elements------------//

class Book {
    constructor(title, author, isbn, date) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.date = date;
    }
}

//------------app functionalities------------//

class app {

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => app.addBook(book));
    }

    //add book elements to row

    static addBook(book) {
        const list = document.querySelector('#list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>${book.date}</td>
        <td><a href="#" class=" btn-delete delete">x</a></td>
      `;

        list.appendChild(row);
    }

    // delete elements
    static removeBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
        document.querySelector('#date').value = '';
    }
}


document.addEventListener('DOMContentLoaded', app.displayBooks);

//add book details to bottom row on submit button

document.querySelector('#form').addEventListener('submit', (e) => {

    e.preventDefault();


    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    const date = document.querySelector('#date').value;


    if (title === '' || author === '' || isbn === '' || date === '') {
        alert('please fill out the form first!');
    } else {

        const book = new Book(title, author, isbn, date);

        app.addBook(book);

        app.clearFields();
    }
});

// delete book on remove button

document.querySelector('#list').addEventListener('click', (e) => {

    app.removeBook(e.target);

});
