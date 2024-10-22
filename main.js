const myLibrary = [];

function Book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function(){
    const readStr = read ? "read" : "not read";
    return `${this.title} by ${this.author}, ${this.pages} Pages, ${readStr}`;
  }
}

function addBookToLibrary() {
    const title = prompt("title: ");
    const author = prompt("author: ");
    const pages = prompt("page count: ");
    const read = false;
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    return book;
    //console.log("Added book to library: \n", book.info());
}

const libraryElement = document.querySelector(".library-container")
const newBookButtonElement = document.querySelector("#button-new-book");
newBookButtonElement.addEventListener("click", () => {
    const book = addBookToLibrary();
    createElementForBook(book);
});

function createElementForBook(book){
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.innerHTML = `
         <div class="book-spine">
            <h2 class="book-heading">${book.title}</h2>
        </div>
        <div class="book-front-cover">
            <h2 class="book-front-title">${book.title}</h2>
            <p class="book-front-author">${book.author}</p>
            <p class="book-front-pages">Pages: ${book.pages}</p>
        </div>
    `;
    libraryElement.appendChild(bookElement);
}

function createElementsForAllBooks(){
    for(const book in myLibrary){
        createElementForBook(book);
    }
}

const book_0 = new Book("Pirates of Hollow", "Jolly Roger", 533, false);
createElementForBook(book_0);
