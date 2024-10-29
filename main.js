const myLibrary = {};

class Book{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBookToLibrary(title, author, pages, read = false) {
    const book = new Book(title, author, pages, read);
    myLibrary[title] = book;
    return book;
}

const minBookSpineWidth = 40;
const maxBookSpineWidth = 200;
const pagesForMinSpineWidth = 100;
const pagesForMaxSpineWidth = 1000;

function createElementForBook(book){
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.setAttribute("data-library-key", book.title);
    const pageInterp = Math.min(1, 
                        Math.max((book.pages - pagesForMinSpineWidth) / (pagesForMaxSpineWidth - pagesForMinSpineWidth), 0));
    const bookSpineWidth = Math.round(minBookSpineWidth * (1 - pageInterp) + maxBookSpineWidth * pageInterp);
    bookElement.style.setProperty("--book-spine-width", bookSpineWidth + "px");
    bookElement.style.setProperty("--book-hue", Math.round(Math.random() * 360) + "deg");
    bookElement.innerHTML = `
        <div class="book-spine">
            <svg class="book-spine-read-marker" style="visibility: hidden" xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ff0037"><path d="M200-120v-656.67q0-27 19.83-46.83 19.84-19.83 46.84-19.83h426.66q27 0 46.84 19.83Q760-803.67 760-776.67V-120L480-240 200-120Z"/></svg>
            <h2 class="book-spine-title">${book.title}</h2>
        </div>
        <div class="book-front-cover">
            <h2 class="book-front-title">${book.title}</h2>
            <p class="book-front-author">${book.author}</p>
            <p class="book-front-pages">${book.pages} pages</p>
            <div class="book-actions-container">
                <button class="book-action-button" id="button-book-read">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-120v-656.67q0-27 19.83-46.83 19.84-19.83 46.84-19.83h426.66q27 0 46.84 19.83Q760-803.67 760-776.67V-120L480-240 200-120Zm66.67-101.33L480-312l213.33 90.67v-555.34H266.67v555.34Zm0-555.34h426.66-426.66Z"/></svg>                        
                    <!--<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff0037"><path d="M200-120v-656.67q0-27 19.83-46.83 19.84-19.83 46.84-19.83h426.66q27 0 46.84 19.83Q760-803.67 760-776.67V-120L480-240 200-120Z"/></svg>-->
                </button>
                <button class="book-action-button" id="button-book-remove">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
            </div>
        </div>
    `;
    libraryElement.appendChild(bookElement);
}

const addBookDialog = document.querySelector("#dialog-add-book");
const addBookForm = addBookDialog.querySelector("form");
const newBookButtonElement = document.querySelector("#button-new-book");
newBookButtonElement.addEventListener("click", () => {
    addBookDialog.showModal();
});

addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = addBookForm.elements["book-title"].value;
    const author = addBookForm.elements["book-author"].value;
    const pages = addBookForm.elements["book-page-count"].value;
    const read = false;

    const book = addBookToLibrary(title, author, pages, read);
    createElementForBook(book);
    addBookForm.reset();
});

addBookForm.addEventListener("reset", (e) => {
    addBookDialog.close();
});

const libraryElement = document.querySelector(".library-container")

libraryElement.addEventListener("click", libraryClicked);
const unreadElement = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-120v-656.67q0-27 19.83-46.83 19.84-19.83 46.84-19.83h426.66q27 0 46.84 19.83Q760-803.67 760-776.67V-120L480-240 200-120Zm66.67-101.33L480-312l213.33 90.67v-555.34H266.67v555.34Zm0-555.34h426.66-426.66Z"/></svg>`;
const readElement = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff0037"><path d="M200-120v-656.67q0-27 19.83-46.83 19.84-19.83 46.84-19.83h426.66q27 0 46.84 19.83Q760-803.67 760-776.67V-120L480-240 200-120Z"/></svg>`

function libraryClicked(e){
    const removeButton = e.target.closest("#button-book-remove");
    if(removeButton)
    {
        const bookElement = removeButton.closest(".book");
        if(bookElement)
        {
            removeBookFromLibrary(bookElement.dataset.libraryKey, bookElement);
        }
    }
    else{
        const readButton = e.target.closest("#button-book-read");
        if(readButton){
            const bookElement = readButton.closest(".book");
            if(bookElement){
                toggleBookReadStatus(bookElement.dataset.libraryKey, bookElement);
            }
        }
    }
}

function toggleBookReadStatus(bookKey, bookElement){
    if(bookKey in myLibrary){
        const read = !myLibrary[bookKey].read;
        myLibrary[bookKey].read = read;

        const bookSpineReadElement = bookElement.querySelector(".book-spine-read-marker");
        const bookReadButtonElement = bookElement.querySelector("#button-book-read");
    
        if(read){
            bookSpineReadElement.style["visibility"] = "visible";
            bookReadButtonElement.innerHTML = readElement;
        }
        else{
            bookSpineReadElement.style["visibility"] = "hidden";
            bookReadButtonElement.innerHTML = unreadElement;
        }
    }
}

function removeBookFromLibrary(bookKey, bookElement){
    if(bookKey in myLibrary){
        delete myLibrary[bookKey];
        bookElement.remove();
    }
}

function createDummyContent(){
    const book_0 = new Book("The Hobbit", "J.R.R. Tolkien", 310, false);
    myLibrary["The Hobbit"] = book_0;
    createElementForBook(book_0);
    
    const book_1 = new Book("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 309, false);
    myLibrary["Harry Potter and the Sorcerer's Stone"] = book_1;
    createElementForBook(book_1);

    const book_2 = new Book("The Book Thief", "Markus Zusak", 552, false);
    myLibrary["The Book Thief"] = book_2;
    createElementForBook(book_2);
}

createDummyContent();