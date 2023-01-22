import Books from './books';

let hamburger = document.querySelector('.hamburger');
if (hamburger) {
    hamburger.addEventListener('click', function (event) {
        document.querySelector('.mobile-nav').classList.toggle('hidden');
    });
    
}

let booksShopBag = JSON.parse(localStorage.getItem("BooksShopBag"));
if (booksShopBag && booksShopBag.length) {
    document.querySelectorAll('.shop-bag__counter').forEach(item => {
        item.innerText = booksShopBag.length;
        item.classList.remove('hidden');
    });
}

let slider = document.querySelector('.slider');
if (slider) {
    let dots = slider.querySelectorAll('.slider-dots__dot');
    dots.forEach(item => {
        item.addEventListener('click', clickDotBanner);
    });

    function clickDotBanner() {
        let index = this.id.split('_');

        let banner = slider.querySelector('#banner_' + index[1]);
        if (banner) {
            slider.querySelectorAll('.slider-dots__dot').forEach(item => {
                item.classList.remove('active');
            });
            slider.querySelectorAll('.slider-banners__img').forEach(item => {
                item.classList.remove('active');
            });
            banner.classList.add('active');
            this.classList.add('active');
        }
    }
}

let booksBlock = document.querySelector('.books-block');
if (booksBlock) {
    const books = new Books(document.querySelector('.list-books-block'));

    let categories = booksBlock.querySelectorAll('.categories-list__item');
    categories.forEach(item => {
        item.addEventListener('click', clickCategoriesBooks);
    });

    function clickCategoriesBooks(event) {
        let categoryTag = event.target;


        if (categoryTag) {
            booksBlock.querySelectorAll('.categories-list__item').forEach(item => {
                item.classList.remove('active');
            });
            categoryTag.parentElement.classList.add('active');
            books.getCategoriesBooks(categoryTag.innerText);
        }
    }

    let loadMore = document.querySelector('.load-more');
    loadMore.addEventListener('click', getBooks);

    function getBooks() {
        let category = booksBlock.querySelector('.categories-list__item.active span');
        if (category) {
            books.getBooks(category.innerText);
        }
    }

    getBooks();
    
}




