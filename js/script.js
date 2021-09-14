let myLibrary = [];

function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(myLibrary.length, title, author, pages, read));
}

function removeFromLibrary(id) {
    const index = myLibrary.findIndex(Book => Book.id === id);
    myLibrary.splice(index, 1);
    document.getElementById(id).remove();
    console.log(myLibrary);
}

function populateCards() {
    let main = document.getElementById("main");
    myLibrary.forEach(book => {
        let card = main.appendChild( document.createElement("div"));
        card.className = "bookCard";
        card.id = book.id;

        let bookDescription = card.appendChild( document.createElement("div") );
        bookDescription.className = "cardContent";

        let title = bookDescription.appendChild( document.createElement("span") );
        title.innerHTML = book.title;
        bookDescription.appendChild( document.createElement("br") );

        let author = bookDescription.appendChild( document.createElement("span") );
        author.innerHTML = book.author;
        bookDescription.appendChild( document.createElement("br") );

        let pages = bookDescription.appendChild( document.createElement("span") );
        pages.innerHTML = book.pages;
        bookDescription.appendChild( document.createElement("br") );

        let read = bookDescription.appendChild( document.createElement("span") );
        read.innerHTML = book.read ? "Status: read" : "Status: not read";

        let buttons = card.appendChild( document.createElement("div") );
        let editBtn = buttons.appendChild( document.createElement("button") );
        let delBtn = buttons.appendChild( document.createElement("button") );
        editBtn.innerHTML = "Edit";
        editBtn.className = "btn edit";
        delBtn.innerHTML = "Delete";
        delBtn.className = "btn delete";
        delBtn.addEventListener("click", () => removeFromLibrary(book.id));
    });
}

addBookToLibrary("Asadads","Mr Asd", 222, false);
addBookToLibrary("The Lord of Flies","William Golding", 224, true);

for (let i = 0; i < 10; i++) {
    addBookToLibrary("Very nice title","Best author ever", i, false)
}

populateCards();