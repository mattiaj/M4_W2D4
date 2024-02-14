fetch("https://striveschool-api.herokuapp.com/books")
.then((res) => res.json())
.then((json) => createTemplate(json))
.catch((err) => console.log("Error detected: ", err) );

const container = document.getElementById('container');
const containerBook = document.getElementById('bookContainer');
const cart = document.getElementById("cart");
const searchInput = document.getElementById('search-book');
const emptyCart = document.getElementById('empty-cart');
let activeResult;

// fetch sul singolo libro
const bookEndPoint = "https://striveschool-api.herokuapp.com/books/";
if(window.location.search) {
    let activeParams = window.location.search;
    let objParam = new URLSearchParams(activeParams);
    let bookId = objParam.get("id");

fetch("https://striveschool-api.herokuapp.com/books/"+bookId)
.then((res) => res.json())
.then((json) => createBookInfo(json))
.catch((err) => console.log("Error detected: ", err) );
}


// console.log(searchInput)

function createTemplate (books, savedResult = true) {
    if (savedResult) {
        activeResult = books;
    }
    books.forEach((element) => {
        createCard(element);
    })
}

function createCard (element) {
        // ciclati tutti gli elementi per le card
        const {title, img, price, category, asin} = element;
        let card = document.createElement('div');
        card.classList.add('card', 'col-lg-3', 'col-md-4', 'col-12', 'px-0');
        card.style.backgroundColor = "#444242"
        card.id = asin;
        let link = document.createElement('a');
        link.href =  `index.html?id=${card.id}`;
        link.innerText = "info";
        link.classList.add('text-light', 'link-underline','link-underline-opacity-0')
        let cardImg = document.createElement('img');
        cardImg.src = img;
        cardImg.classList.add('card-img-top');
        cardImg.style.maxHeight = '360px'
        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'text-light');
        let cardTitle = document.createElement('h5');
        cardTitle.innerText = title;
        let cardCategory = document.createElement('p');
        cardCategory.classList.add('card-text');
        cardCategory.innerText = category;
        let cardJump = document.createElement('a');
        cardJump.href = '#';
        cardJump.innerText = 'salta';
        let footerCard = document.createElement('div');
        footerCard.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'px-2', 'mb-2', 'text-light');
        let cardPrice = document.createElement('p');
        cardPrice.classList.add('m-0')
        cardPrice.innerText = "€" + price;
        let buttonCart = document.createElement('a');
        buttonCart.classList.add('btn', 'btn-dark')
        buttonCart.innerText = 'Add to Cart';
        // variabile che contiene tutto il corpo di cardBody
        let cardTextBody = [cardTitle, cardCategory,cardJump, footerCard];
        cardBody.append( ...cardTextBody);
        // variabile che contiene il footer della card
        let cardTextFooter = [cardPrice, link, buttonCart];
        footerCard.append(...cardTextFooter);
        // creazione effettiva della card
        card.append(cardImg, cardBody, footerCard);
        // aggiungo la card al DOM
        containerBook.appendChild(card);
        // console.log(buttonCart)

        cardJump.addEventListener('click', () => {
            card.remove()
        });
        
        buttonCart.addEventListener('click', ()=>{
            cart.append(cartElement(element));
            card.classList.add('border', 'border-danger')
        });
        
    
}

// funzione per creare le card del carrello
function cartElement(element) {
    let title = element.title;
    let img = element.img;
    let price = element.price;
    let asin = element.asin;
    

    let card = document.createElement('div');
    let cardImg = document.createElement('img');
    let cardBody = document.createElement('div');
    let cardTitle = document.createElement('h6');
    let cardPrice = document.createElement('p');
    let buttonRemove = document.createElement('a');
    

    card.classList.add('card', 'col-12', 'px-0', 'mt-2');
    cardImg.classList.add('card-img-top');
    cardBody.classList.add('card-body');
    cardPrice.classList.add('m-0');

    cardImg.style.maxHeight = "200px";
    cardImg.style.maxWidth = "160px";
    card.style.maxWidth = "160px";
    


    card.id = asin;
    cardImg.src = img;
    cardPrice.innerText = "€" + price;
    cardTitle.innerText= title;
    buttonRemove.innerText = "Remove";
    buttonRemove.href = "#";

    cardBody.append(cardTitle, cardPrice, buttonRemove);
    card.append(cardImg, cardBody);
    

    buttonRemove.addEventListener('click', () => {
        card.remove();
    })

    // svuota carrello
    emptyCart.addEventListener('click', () => {
        card.remove();
    })


    return card;
}

// funzione per la ricerca
function research () {
    if (activeResult) {
        containerBook.innerHTML = "";
        let liveSearch = searchInput.value;
        let filteredResult = activeResult.filter((books) => {
            return books.title.toLowerCase().includes(liveSearch.toLowerCase());
        })
        // console.log(filteredResult)

        createTemplate(filteredResult, false)
    }
}

function createBookInfo(element) {
    container.innerHTML = "";
    let title = element.title;
    let img = element.img;
    let category = element.category;
    let price = element.price;
    let text = "QUESTO LIBRO È BELLO! COMPRALO SUBITO!"

    let cardTitleBig = document.createElement('h1');
    let cardTitle = document.createElement('h2');
    let cardImg = document.createElement('img');
    let cardText = document.createElement('h5');
    let cardCategory = document.createElement('h4');
    let cardPrice = document.createElement('h6');
    let divImgText = document.createElement('div');
    let divtext = document.createElement('div');
    let divContainer = document.createElement('div');

    cardTitleBig.innerText = title;
    cardTitle.innerText = title;
    cardImg.src = img;
    cardText.innerText = text;
    cardCategory.innerText = category;
    cardPrice.innerText = "€" + price;

    cardImg.style.maxHeight = "500px"
    divtext.classList.add('text-light', 'mx-3');
    divImgText.classList.add('d-flex', );
    cardTitleBig.classList.add('text-light', 'text-center', 'mb-5', 'mt-4');
    cardText.classList.add('my-5');

    divtext.append(cardTitle, cardText, cardCategory, cardPrice);
    divImgText.append(cardImg, divtext);
    divContainer.append(cardTitleBig, divImgText);
    container.append(divContainer);
}