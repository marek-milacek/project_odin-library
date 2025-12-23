let myLibrary = []; // pole pro ukladani vsech knih

// propojeni s html tlacitky a formularem
const dialog = document.querySelector("#book-dialog");
const newBookBtn = document.querySelector("#new-book-btn");
const closeBtn = document.querySelector("#close-btn");
const bookForm = document.querySelector("#book-form");

// tlacitko pro otevreni formulare
newBookBtn.addEventListener("click", () => {
    dialog.showModal(); // showmodal() zobrazi dialog jako modalni okno
});

// tlacitko pro zavreni formulare bez ulozeni
closeBtn.addEventListener("click", () => {
    dialog.close(); // zavre dialogove okno
});

// Vyroba knih
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID(); // vygeneruje unikantni ID pro kazdou knihu
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// PROTOTYP - funkce na zmenu stavu precitane
Book.prototype.toggleRead = function() {
    this.read = !this.read; // prepne true na false a naopak
};

// FUNKCE PRO PRIDANI KNIHY DO POLE
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook); //prida(pushne) knihu do pole
}

// FUNKCE PRO SMAZANI KNIHY
function removeBook(idToRemove) {
    // vytvori nove pole bez knihy, kterou chceme smazat
    myLibrary = myLibrary.filter(book => book.id !== idToRemove);
    // prekresli obrazovku, aby smazana kniha zmizela
    displayBooks();
}

// HLAVNI FUNKCE PRO ZOBRAZENI KNIHOVNY NA STRANCE
function displayBooks() {
    const display = document.getElementById('library-display');
    
    // vymazaze obsahu pred prekreslenim
    display.innerHTML = "";

    // projde kazdou knihu v poli a vytvori pro ni kartu
    myLibrary.forEach((book) => {
        // vytvoreni obdelniku (karty) pro knihu
        const bookCard = document.createElement('div');
        bookCard.classList.add('card'); // pridame tridu pro CSS stylovani

        // vytvoreni textoveho obsahu uvnitr karty
        const info = document.createElement('p');
        // innerHTML pouziju kvuli znackam br
        info.innerHTML = `Nazev: ${book.title} <br>
                          Autor: ${book.author} <br>
                          Stran: ${book.pages}`;
        
        // pripne text do bookCard
        bookCard.appendChild(info);

        // tlacitko na smazani knihy
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Smazat';
        removeBtn.onclick = () => removeBook(book.id);
        bookCard.appendChild(removeBtn);

        // tlacitko na prepnuti stavu (Precteno / Neprecteno)
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = book.read ? "Precteno" : "Neprecteno";
        toggleBtn.onclick = () => {
            book.toggleRead(); // zavola funkci z prototypu
            displayBooks();    // znovu prekresli knihovnu
        };
        bookCard.appendChild(toggleBtn);

        // nakonec celou hotovou kartu pripne do hlavniho divu v HTML
        display.appendChild(bookCard);
    });
}

// ODESLANI FORMULARE
bookForm.addEventListener("submit", (event) => {
    // zastavi obnoveni stranky po kliknuti na tlacitko
    event.preventDefault();

    // vytazeni hodnot z policek formulare
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;

    // vytvoreni knihy a ulozeni do pole
    addBookToLibrary(title, author, pages, read);

    // prekresleni zobrazeni a vycisteni formulare
    displayBooks();
    bookForm.reset(); // vytreseni formulare
    dialog.close();
});