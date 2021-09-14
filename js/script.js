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
    generateCard(title, author, pages, read);
}

function removeFromLibrary(id) {
    const index = myLibrary.findIndex(Book => Book.id === id);
    myLibrary.splice(index, 1);
    document.getElementById(id).remove();
}

function closeAddWindow() {
    document.getElementById("addBook").style = "opacity: 0; z-index: -1";
}
function openAddWindow() {
    document.getElementById("addBook").style = "opacity: 1; z-index: 0";
}

function addBookClick() {
    let title = document.getElementById("titleInput");
    let author = document.getElementById("authorInput");
    let pages = document.getElementById("pagesInput");
    let read = document.getElementById("readInput");
    addBookToLibrary(title.value, author.value, pages.value, read.checked);
    closeAddWindow();

    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;
}

function generateCard(title, author, pages, read) {
    let main = document.getElementById("main");

    let card = main.appendChild( document.createElement("div"));
    card.className = "bookCard";
    card.id = myLibrary.length;

    let bookDescription = card.appendChild( document.createElement("div") );
    bookDescription.className = "cardContent";

    let titleText = bookDescription.appendChild( document.createElement("span") );
    titleText.innerHTML = "Title: " + title;
    bookDescription.appendChild( document.createElement("br") );

    let authorText= bookDescription.appendChild( document.createElement("span") );
    authorText.innerHTML = "Author: " + author;
    bookDescription.appendChild( document.createElement("br") );

    let pagesText = bookDescription.appendChild( document.createElement("span") );
    pagesText.innerHTML = "Pages: " + pages;
    bookDescription.appendChild( document.createElement("br") );

    let readText = bookDescription.appendChild( document.createElement("span") );
    readText.innerHTML = read ? "Status: read" : "Status: not read";

    let buttons = card.appendChild( document.createElement("div") );
    let editBtn = buttons.appendChild( document.createElement("button") );
    let delBtn = buttons.appendChild( document.createElement("button") );
    editBtn.innerHTML = "Edit";
    editBtn.className = "btn edit";
    delBtn.innerHTML = "Delete";
    delBtn.className = "btn delete";
    delBtn.addEventListener("click", () => removeFromLibrary(card.id));
}

document.getElementById("addCancel").addEventListener("click", () => closeAddWindow());
document.getElementById("addNewBtn").addEventListener("click", () => openAddWindow());
document.getElementById("addAdd").addEventListener("click", () => addBookClick());

addBookToLibrary("Asadads","Mr Asd", 222, false);
addBookToLibrary("The Lord of Flies","William Golding", 224, true);

for (let i = 0; i < 10; i++) {
    addBookToLibrary("Very nice title","Best author ever", i, false)
}