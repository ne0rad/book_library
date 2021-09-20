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
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function removeFromLibrary(id) {
    // Find matching id for the book to remove
    const index = myLibrary.findIndex(el => el.id == id);
    myLibrary.splice(index, 1);
    document.getElementById(id).remove();
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function closeAddWindow() {
    // Hide "Add new book" window
    let title = document.getElementById("titleInput");
    let author = document.getElementById("authorInput");
    let pages = document.getElementById("pagesInput");

    document.getElementById("addBook").style = "opacity: 0; z-index: -1";
    document.getElementById("editBook").style = "opacity: 0; z-index: -1";

    // Clear input values and error styling upon closing the window
    title.value = "";
    title.className = "bookInput";
    author.value = "";
    author.className = "bookInput";
    pages.value = "";
    pages.className = "bookInput";
}

function closeEditWindow() {
    // Hide "Edit book" window
    let title = document.getElementById("titleInputEdit");
    let author = document.getElementById("authorInputEdit");
    let pages = document.getElementById("pagesInputEdit");

    document.getElementById("editBook").style = "opacity: 0; z-index: -1";

    // Reset error styling
    title.className = "bookInput";
    author.className = "bookInput";
    pages.className = "bookInput";
}

function openAddWindow() {
    // Show "Add new book" window
    closeEditWindow();
    document.getElementById("addBook").style = "opacity: 1; z-index: 0";
}

function openEditWindow(id) {
    let title = document.getElementById("titleInputEdit");
    let author = document.getElementById("authorInputEdit");
    let pages = document.getElementById("pagesInputEdit");
    let read = document.getElementById("readInputEdit");

    // Show "Edit book" window
    closeAddWindow();
    document.getElementById("editBook").style = "opacity: 1; z-index: 0";

    document.getElementById("hiddenId").value = id;

    const index = myLibrary.findIndex(Book => Book.id == id);
    title.value = myLibrary[index].title;
    author.value = myLibrary[index].author;
    pages.value = myLibrary[index].pages;
    read.checked = myLibrary[index].read;
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

function editBookSave() {
    let id = document.getElementById("hiddenId").value;
    const index = myLibrary.findIndex(el => el.id == id);
    let titleText = document.getElementById("title" + id);
    let title = document.getElementById("titleInputEdit");
    let authorText = document.getElementById("author" + id);
    let author = document.getElementById("authorInputEdit");
    let pagesText = document.getElementById("pages" + id);
    let pages = document.getElementById("pagesInputEdit");
    let readText = document.getElementById("read" + id);
    let read = document.getElementById("readInputEdit");

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
        myLibrary[index].title = title.value;
        myLibrary[index].author = author.value;
        myLibrary[index].pages = pages.value;
        myLibrary[index].read = read.checked;

        titleText.textContent = "Title: " + title.value;
        authorText.textContent = "Author: " + author.value;
        pagesText.textContent = "Pages: " + pages.value;
        readText.textContent = read.checked ? "Status: read" : "Status: not read";


        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
        closeEditWindow();
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
    titleText.textContent = "Title: " + title;
    titleText.id = "title" + card.id;
    bookDescription.appendChild(document.createElement("br"));

    let authorText = bookDescription.appendChild(document.createElement("span"));
    authorText.textContent = "Author: " + author;
    authorText.id = "author" + card.id;
    bookDescription.appendChild(document.createElement("br"));

    let pagesText = bookDescription.appendChild(document.createElement("span"));
    pagesText.textContent = "Pages: " + pages;
    pagesText.id = "pages" + card.id;
    bookDescription.appendChild(document.createElement("br"));

    let readText = bookDescription.appendChild(document.createElement("span"));
    readText.id = "read" + card.id;
    readText.textContent = read ? "Status: read" : "Status: not read";

    let buttons = card.appendChild(document.createElement("div"));
    let editBtn = buttons.appendChild(document.createElement("button"));
    let delBtn = buttons.appendChild(document.createElement("button"));
    editBtn.textContent = "Edit";
    editBtn.className = "btn edit";
    delBtn.textContent = "Delete";
    delBtn.className = "btn delete";
    // Event listeners for each button on the card
    delBtn.addEventListener("click", () => removeFromLibrary(card.id));
    editBtn.addEventListener("click", () => openEditWindow(card.id));
}

// Event Listeners
document.getElementById("addCancel").addEventListener("click", () => closeAddWindow());
document.getElementById("editCancel").addEventListener("click", () => closeEditWindow());
document.getElementById("addNewBtn").addEventListener("click", () => openAddWindow());
document.getElementById("addAdd").addEventListener("click", () => addBookClick());
document.getElementById("editSave").addEventListener("click", () => editBookSave());

let library = JSON.parse(localStorage.getItem("myLibrary"));

if (!library) {

    console.log("No local storage found");
    console.log("Generating new local storage...");

    // Add some random books for testing
    addBookToLibrary("Asadads", "Mr Asd", 222, false);
    addBookToLibrary("The Lord of Flies", "William Golding", 224, true);

    for (let i = 0; i < 10; i++) {
        addBookToLibrary("Very nice title", "Best author ever", i, false)
    }

    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

} else {
    library.forEach(el => {
        addBookToLibrary(el.title, el.author, el.pages, el.read);
    });
}