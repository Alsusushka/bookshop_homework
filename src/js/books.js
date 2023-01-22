export default class Books {
    constructor(htmlBlock) {
        this.keyApi = 'AIzaSyAE5jaE7bqtkhrmoHAM6estHSniStTI42A';
        this.startIndex = 0;
        this.maxResults = 6;
        this.listBooks = htmlBlock;
        this.listBooks.innerHTML = '';
    }
    
    /* получение элементов */
    getBooks(category) {
        fetch('https://www.googleapis.com/books/v1/volumes?q="subject:' + category + '"&key='
            + this.keyApi + '&printType=books&startIndex=' + this.startIndex + '&maxResults=' + this.maxResults)
        .then((response) => {
            const result = response.json();
            return result;
        }).
        then(data => {
            this.paint(data.items)
            this.startIndex =+ this.maxResults;
        })
        .catch((response) => { console.log('error', response) });
    }


    /* отображение элементов */
    paint(arBooks) {
        arBooks.forEach(item => {
            let img = document.createElement('img');
            img.classList.add('book-card__img');
            if (item.volumeInfo.imageLinks.thumbnail) {
                img.setAttribute('src', item.volumeInfo.imageLinks.thumbnail);
            } else {
                img.setAttribute('src', './src/images/not_img.png');
            }
            img.setAttribute('alt', item.volumeInfo.imageLinks.title);

            let info = document.createElement('div');
            info.classList.add('book-card__info');

            if (item.volumeInfo.authors && item.volumeInfo.authors.length > 0) {
                let authors = document.createElement('div');
                info.classList.add('book-card-info__authors');
                let authorsText = '';
                item.volumeInfo.authors.forEach(author => {
                    if (authorsText) {
                        authorsText = authorsText + ', ' + author;
                    } else {
                        authorsText = author;
                    }
                })
                authors.innerText = authorsText;
                info.appendChild(authors);
            }

            let title = document.createElement('div');
            title.classList.add('book-card-info__title');
            title.innerText = item.volumeInfo.title;
            info.appendChild(title);

            if (item.volumeInfo.description || item.volumeInfo.ratingsCount) {
                let ratings = document.createElement('div');
                ratings.classList.add('book-card-info__ratings');

                if (item.volumeInfo.averageRating) {
                    let rating = document.createElement('div');
                    rating.classList.add('rating_block');
                    ratings.appendChild(rating);

                    let active = document.createElement('div');
                    active.classList.add('rating_active');
                    let activeValue = item.volumeInfo.averageRating / 0.05;
                    active.style.width = `${activeValue}%` ;
                    rating.appendChild(active);
                }

                if (item.volumeInfo.ratingsCount) {
                    let review = document.createElement('span');
                    review.classList.add('rating_review');
                    review.innerText = item.volumeInfo.ratingsCount + ' review';
                    ratings.appendChild(review);
                }
                
                info.appendChild(ratings);
            }
            

            if (item.volumeInfo.description) {
                let description = document.createElement('div');
                description.classList.add('book-card-info__description');
                description.innerText = item.volumeInfo.description;
                info.appendChild(description);
            }
            
            if (item.saleInfo.retailPrice) {
                let price = document.createElement('div');
                price.classList.add('book-card-info__price');
                let priceText = '';
                switch (item.saleInfo.retailPrice.currencyCode) {
                    case 'USD':
                        priceText = '$';
                        break;
                    case 'RUB':
                        priceText = '₽';
                        break;
                }
                price.innerText = priceText + item.saleInfo.retailPrice.amount;
                info.appendChild(price);
            }

            let button = document.createElement('button');
            button.classList.add('button');
            button.classList.add('book-card-info__button');
            button.innerText = 'buy now';
            button.setAttribute('id', item.id);
            button.addEventListener('click', this.buyBook);
            info.appendChild(button);

            let bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            bookCard.appendChild(img);
            bookCard.appendChild(info);

            this.listBooks.appendChild(bookCard);
        });
    }

    buyBook(event) {
        let button = event.target;
        let id = button.id;
        let booksShopBag = JSON.parse(localStorage.getItem("BooksShopBag"));
        if (booksShopBag && booksShopBag.constructor === Array) {
            let index = booksShopBag.indexOf(id);
            if (index !== -1) {
                booksShopBag.splice(index, 1);
            } else {
                booksShopBag.push(id);
            }
        } else {
            booksShopBag = [id];
        }

        let counter = booksShopBag.length;
        if (counter) {
            document.querySelectorAll('.shop-bag__counter').forEach(item => {
                item.innerText = counter;
                item.classList.remove('hidden');
            });
        } else {
            document.querySelectorAll('.shop-bag__counter').forEach(item => {
                item.innerText = '';
                item.classList.add('hidden');
            });
        }
        
        localStorage.setItem("BooksShopBag", JSON.stringify(booksShopBag));
    }

    getCategoriesBooks(category) {
        this.startIndex = 0;
        this.listBooks.innerHTML = '';
        this.getBooks(category);
    }
}