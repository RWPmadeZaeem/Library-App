const myLibrary = [];
const bookList = document.getElementById('book-list');
const modal = document.getElementById('modal');
const newBookBtn = document.getElementById('new-book');
const closeBtn = document.querySelector('.close');
const bookForm = document.getElementById('book-form');

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


// Add book to library
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    bookList.innerHTML = '';
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: <span>${book.read ? 'Yes' : 'No'}</span></p>
            <button class="remove-btn" data-index="${index}">Remove</button>
            <button class="read-toggle" data-index="${index}">Toggle Read</button>
        `;
        bookList.appendChild(bookCard);
    });
}

newBookBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    addBookToLibrary(title, author, pages, read);
    modal.style.display = 'none';
    bookForm.reset();
});

bookList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        const index = e.target.getAttribute('data-index');
        myLibrary.splice(index, 1);
        displayBooks();
    }
});

bookList.addEventListener('click', (e) => {
    if (e.target.classList.contains('read-toggle')) {
        const index = e.target.getAttribute('data-index');
        myLibrary[index].read = !myLibrary[index].read;
        displayBooks();
    }
});

displayBooks();