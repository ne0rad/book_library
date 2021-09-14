let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

addBookToLibrary("Asadads","Mr Asd", 222, false);
addBookToLibrary("The lord of Flies","Alexander Simeon", 502, true);

console.log(myLibrary);