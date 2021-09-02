const displayBooks = document.getElementById('display-books');
const emptyInput = document.getElementById('empty-input');
const spinner = document.getElementById('spinner');
const totalOutput = document.getElementById('total-output');

const searchButton = () =>{
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    searchInput.value = '';

    if(searchValue === ''){
        emptyInput.innerHTML = `
            <h1 class="text-danger text-center">Please search any book name</h1>
        `
        return
    }else{
        emptyInput.textContent = '';
    }
    // Clear dom
    displayBooks.textContent = '';

    // clear totalvalue
    totalOutput.textContent = '';
    
    // spinner
    spinner.classList.remove('d-none')
    
    fetch(`https://openlibrary.org/search.json?q=${searchValue}`)
    .then(res => res.json())
    .then(data => displayBook(data))
    .finally(() =>{
        searchInput.value = '';
        spinner.classList.add('d-none');
    })
}

const displayBook = books =>{
    console.log(books);

    // Total book found
    if(books.docs.length === 0){
        totalOutput.innerHTML = `
            <h2 class="text-center text-danger py-2">No Result Found</h2>
        `
    }
    else{
        totalOutput.innerHTML = `
            <h2 class="text-center text-info py-2">Search Result Found ${books.numFound}</h2>
        `
    }
    
    displayBooks.textContent = '';
    const bookList = books.docs;
    bookList.forEach(book => {
        const imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card">
            <img style=" height:230px;" src="https://covers.openlibrary.org/b/id/${book.cover_i? book.cover_i : '10909258'}-M.jpg" class="card-img-top text-center">
                <div class="card-body">
                    <h3 class="card-title">${book.title}</h3>
                    <h5 class="card-subtitle py-2">Author: ${book.author_name[0]}</h5>
                    <p class="card-text">Publisher: ${book.publisher[0]}</p>
                    <p class="card-text">Published Year: ${book.publish_date[0]}</p>
                </div>
            </div>
        `
        displayBooks.appendChild(div)
        console.log(book);
    })
}