
const searchBook = () => {
    const inputText = document.getElementById('search-btn');

    const searchInput = document.getElementById('input-btn');
    const searchText = searchInput.value;
    console.log(searchText);


    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => loadBook(data.docs));

}

function loadBook(books){
    books.forEach(book => {
        const booksContainer = document.getElementById('books');

        const bookSingle = document.createElement('div');
        bookSingle.classList.add('row');
        bookSingle.classList.add('g-4');
        
        bookSingle.classList.add('container');
        

        bookSingle.innerHTML = `<div class="col">
        <div class="card">
          <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">Author: ${book.author_name[0]}</p>
            <p class="card-text">Published: ${book.publish_date[0]}</p>
          </div>
        </div>
      </div>`
        booksContainer.appendChild(bookSingle);
        /* console.log(book.cover_i);
        bookId(book.cover_i); */

    })
}

const bookId = (coverid) => {
    const url = `https://covers.openlibrary.org/b/id/${coverid}-M.jpg`
    fetch(url)
    .then(res => res.json())
    .then(data => displayCover(data.cover_i))
}

const displayCover = (id) => {
    console.log(id)
}

