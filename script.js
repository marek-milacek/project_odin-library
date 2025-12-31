let myLibrary = [];

const dialog = document.querySelector("#book-dialog");
const newBookBtn = document.querySelector("#new-book-btn");
const closeBtn = document.querySelector("#close-btn");
const bookForm = document.querySelector("#book-form");

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

closeBtn.addEventListener("click", () => {
    dialog.close();
});

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function removeBook(idToRemove) {
    myLibrary = myLibrary.filter(book => book.id !== idToRemove);
    displayBooks();
}

function displayBooks() {
    const display = document.getElementById('library-display');
    
    display.innerHTML = "";

    myLibrary.forEach((book) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('card');

        const info = document.createElement('p');
        info.innerHTML = `Nazev: ${book.title} <br>
                          Autor: ${book.author} <br>
                          Stran: ${book.pages}`;
        
        bookCard.appendChild(info);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Smazat';
        removeBtn.onclick = () => removeBook(book.id);
        bookCard.appendChild(removeBtn);

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = book.read ? "Precteno" : "Neprecteno";
        toggleBtn.onclick = () => {
            book.toggleRead();
            displayBooks();
        };
        bookCard.appendChild(toggleBtn);

        display.appendChild(bookCard);
    });
}

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;

    addBookToLibrary(title, author, pages, read);

    displayBooks();
    bookForm.reset();
    dialog.close();
});

addBookToLibrary("Zaklinac", "Andrzen Sapkowski", 350, true);
addBookToLibrary("Hobit", "J.R.R. Tolkien", 250, false);

displayBooks();