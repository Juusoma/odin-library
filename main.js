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
    console.log("Added book to library: \n", book.info());
}