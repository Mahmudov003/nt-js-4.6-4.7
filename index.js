//

async function myAsync(page = 1, search = "") {
    const resFetch = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=6129757b&page=${page}`)
    const result = await resFetch.json();
    if (result.Response === "True") {
        let lastPageItem = document.getElementById('lastPage');
        lastPageItem.innerText = Math.floor(result.totalResults / 10);
        return result.Search 
    } else {
        return []
    }
}

const mainContent = document.querySelector('.main .row')

function redMovie(movies) {
    mainContent.innerHTML = ""
    movies.forEach(movie => {
        const cartTeplate = document.getElementById('card-teplate').cloneNode(true).content;
        cartTeplate.querySelector(".card-img-top").src = movie.Poster;
        cartTeplate.querySelector('.card-title').innerHTML = movie.Title;
        cartTeplate.querySelector('.cardBtn').innerHTML = movie.Year;
        mainContent.append(cartTeplate)

        // console.log(movies)
    })
}

function getRendMovie(page, search) {
    myAsync(page, search).then(movies => {
        redMovie(movies)
    })
}

getRendMovie()

const pagination = document.querySelector('.pagination');
pagination.addEventListener('click', (e) => {
    let page = e.target.innerText;
    console.log(page)
    if (page === "Keyingi") {
        let lastPage = +localStorage.getItem('lastPage');
        if (!lastPage) lastPage = 1;
        page = lastPage + 1;
        localStorage.setItem('lastPage', page);
    } else if (page === "Oldingi") {
        let lastPage = +localStorage.getItem('lastPage');
        if (!lastPage) lastPage = 1;
        else page = lastPage - 1;
        localStorage.setItem('lastPage', page);
    }
     else  {
        localStorage.setItem('lastPage', page);
    }
    getRendMovie(page);
})

function search(e) {
    e.preventDefault();
    const searchInput = document.getElementById('search-input')
    getRendMovie(1, searchInput.value)
    searchInput.value = ""
}