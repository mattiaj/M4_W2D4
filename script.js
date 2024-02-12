fetch("https://striveschool-api.herokuapp.com/books")
.then((res) => res.json())
.then((json) => books(json))
.catch((err) => console.log("Error detected: ", err) );

let container = document.getElementById('bookContainer');
let cart = document.getElementById("cart");
// console.log(cart)

function books (result) {
    result.forEach(element => {
        // ciclati tutti gli elementi per le card
        const {title, img, price, category, asin} = element;
        // let title = element.title;
        // let img = element.img;
        // let price = element.price;
        // let category = element.category;
        // let asin = element.asin;
        // console.log(asin)
        // creo la card
        let card = document.createElement('div');
        card.classList.add('card', 'col-lg-3', 'col-md-4', 'col-12', 'px-0');
        card.style.backgroundColor = "#444242"
        card.id = asin;
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
        let cardTextFooter = [cardPrice, buttonCart];
        footerCard.append(...cardTextFooter);
        // creazione effettiva della card
        card.append(cardImg, cardBody, footerCard);
        // aggiungo la card al DOM
        container.append(card);
        // console.log(buttonCart)


        buttonCart.addEventListener('click', ()=>{
            cart.append(cartElement(element));
        })
    });
    
}

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

    return card;
}

