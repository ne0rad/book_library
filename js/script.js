let myLibrary = [];

class Book {
    constructor(id, title, author, pages, read) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    // Take the last book from array and set index to id+1, else set index to 1
    // Breaks if you sort an array, only works if last added book is the last item in the array :(
    const bookIndex = myLibrary.length > 0 ? myLibrary[myLibrary.length - 1].id + 1 : 1;
    generateCard(title, author, pages, read);
    myLibrary.push(new Book(bookIndex, title, author, pages, read));
}

function removeFromLibrary(id) {
    // Find matching id for the book to remove
    const index = myLibrary.findIndex(Book => Book.id === id);
    myLibrary.splice(index, 1);
    document.getElementById(id).remove();
}

function closeAddWindow() {
    // Hide window for adding a new book
    let title = document.getElementById("titleInput");
    let author = document.getElementById("authorInput");
    let pages = document.getElementById("pagesInput");

    document.getElementById("addBook").style = "opacity: 0; z-index: -1";

    title.value = "";
    title.className = "bookInput";
    author.value = "";
    author.className = "bookInput";
    pages.value = "";
    pages.className = "bookInput";
    read.checked = false;
}
function openAddWindow() {
    // Show window for adding a new book
    document.getElementById("addBook").style = "opacity: 1; z-index: 0";
}

function addBookClick() {
    // Take values from inputs and passes them to a function which adds a new book
    let title = document.getElementById("titleInput");
    let author = document.getElementById("authorInput");
    let pages = document.getElementById("pagesInput");
    let read = document.getElementById("readInput");
    let pass = true;
    if (title.value.length < 1) {
        title.className = "bookInput errorInput";
        pass = false;
    } else {
        title.className = "bookInput";
    }
    if (author.value.length < 1) {
        author.className = "bookInput errorInput";
        pass = false;
    } else {
        author.className = "bookInput";
    }
    if (pages.value.length < 1) {
        pages.className = "bookInput errorInput";
        pass = false;
    } else {
        pages.className = "bookInput";
    }
    if (pass) {
        addBookToLibrary(title.value, author.value, pages.value, read.checked);
        closeAddWindow();

        // Reset input fields
        title.value = "";
        author.value = "";
        pages.value = "";
        read.checked = false;
    }
}

function generateCard(title, author, pages, read) {

    // Generating HTML with Vanilla JS, yay...

    let main = document.getElementById("main");

    let card = main.appendChild(document.createElement("div"));
    card.className = "bookCard";
    card.tabIndex = 0;
    // Take the last book from array and set index to id+1, if array is empty set index to 1
    // Breaks if you sort an array, only works if last added book is the last item in the array :(
    card.id = myLibrary.length > 0 ? myLibrary[myLibrary.length - 1].id + 1 : 1;

    let bookDescription = card.appendChild(document.createElement("div"));
    bookDescription.className = "cardContent";

    let titleText = bookDescription.appendChild(document.createElement("span"));
    titleText.innerHTML = "Title: " + title;
    bookDescription.appendChild(document.createElement("br"));

    let authorText = bookDescription.appendChild(document.createElement("span"));
    authorText.innerHTML = "Author: " + author;
    bookDescription.appendChild(document.createElement("br"));

    let pagesText = bookDescription.appendChild(document.createElement("span"));
    pagesText.innerHTML = "Pages: " + pages;
    bookDescription.appendChild(document.createElement("br"));

    let readText = bookDescription.appendChild(document.createElement("span"));
    readText.innerHTML = read ? "Status: read" : "Status: not read";

    let buttons = card.appendChild(document.createElement("div"));
    let editBtn = buttons.appendChild(document.createElement("button"));
    let delBtn = buttons.appendChild(document.createElement("button"));
    editBtn.innerHTML = "Edit";
    editBtn.className = "btn edit";
    delBtn.innerHTML = "Delete";
    delBtn.className = "btn delete";
    // Event listeners for each button on the card
    delBtn.addEventListener("click", () => removeFromLibrary(card.id));
}


// Event Listeners
document.getElementById("addCancel").addEventListener("click", () => closeAddWindow());
document.getElementById("addNewBtn").addEventListener("click", () => openAddWindow());
document.getElementById("addAdd").addEventListener("click", () => addBookClick());


// Add some random books for testing
addBookToLibrary("Asadads", "Mr Asd", 222, false);
addBookToLibrary("The Lord of Flies", "William Golding", 224, true);

for (let i = 0; i < 10; i++) {
    addBookToLibrary("Very nice title", "Best author ever", i, false)
}