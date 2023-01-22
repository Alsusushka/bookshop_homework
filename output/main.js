/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_js_script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/js/script */ \"./src/js/script.js\");\n/* harmony import */ var _src_css_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/css/style.css */ \"./src/css/style.css\");\n\r\n\n\n//# sourceURL=webpack://books/./index.js?");

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://books/./src/css/style.css?");

/***/ }),

/***/ "./src/js/books.js":
/*!*************************!*\
  !*** ./src/js/books.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Books)\n/* harmony export */ });\nclass Books {\r\n    constructor(htmlBlock) {\r\n        this.keyApi = 'AIzaSyAE5jaE7bqtkhrmoHAM6estHSniStTI42A';\r\n        this.startIndex = 0;\r\n        this.maxResults = 6;\r\n        this.listBooks = htmlBlock;\r\n        this.listBooks.innerHTML = '';\r\n    }\r\n    \r\n    /* получение элементов */\r\n    getBooks(category) {\r\n        fetch('https://www.googleapis.com/books/v1/volumes?q=\"subject:' + category + '\"&key='\r\n            + this.keyApi + '&printType=books&startIndex=' + this.startIndex + '&maxResults=' + this.maxResults)\r\n        .then((response) => {\r\n            const result = response.json();\r\n            return result;\r\n        }).\r\n        then(data => {\r\n            this.paint(data.items)\r\n            this.startIndex =+ this.maxResults;\r\n        })\r\n        .catch((response) => { console.log('error', response) });\r\n    }\r\n\r\n\r\n    /* отображение элементов */\r\n    paint(arBooks) {\r\n        arBooks.forEach(item => {\r\n            let img = document.createElement('img');\r\n            img.classList.add('book-card__img');\r\n            if (item.volumeInfo.imageLinks.thumbnail) {\r\n                img.setAttribute('src', item.volumeInfo.imageLinks.thumbnail);\r\n            } else {\r\n                img.setAttribute('src', './src/images/not_img.png');\r\n            }\r\n            img.setAttribute('alt', item.volumeInfo.imageLinks.title);\r\n\r\n            let info = document.createElement('div');\r\n            info.classList.add('book-card__info');\r\n\r\n            if (item.volumeInfo.authors && item.volumeInfo.authors.length > 0) {\r\n                let authors = document.createElement('div');\r\n                info.classList.add('book-card-info__authors');\r\n                let authorsText = '';\r\n                item.volumeInfo.authors.forEach(author => {\r\n                    if (authorsText) {\r\n                        authorsText = authorsText + ', ' + author;\r\n                    } else {\r\n                        authorsText = author;\r\n                    }\r\n                })\r\n                authors.innerText = authorsText;\r\n                info.appendChild(authors);\r\n            }\r\n\r\n            let title = document.createElement('div');\r\n            title.classList.add('book-card-info__title');\r\n            title.innerText = item.volumeInfo.title;\r\n            info.appendChild(title);\r\n\r\n            if (item.volumeInfo.description || item.volumeInfo.ratingsCount) {\r\n                let ratings = document.createElement('div');\r\n                ratings.classList.add('book-card-info__ratings');\r\n\r\n                if (item.volumeInfo.averageRating) {\r\n                    let rating = document.createElement('div');\r\n                    rating.classList.add('rating_block');\r\n                    ratings.appendChild(rating);\r\n\r\n                    let active = document.createElement('div');\r\n                    active.classList.add('rating_active');\r\n                    let activeValue = item.volumeInfo.averageRating / 0.05;\r\n                    active.style.width = `${activeValue}%` ;\r\n                    rating.appendChild(active);\r\n                }\r\n\r\n                if (item.volumeInfo.ratingsCount) {\r\n                    let review = document.createElement('span');\r\n                    review.classList.add('rating_review');\r\n                    review.innerText = item.volumeInfo.ratingsCount + ' review';\r\n                    ratings.appendChild(review);\r\n                }\r\n                \r\n                info.appendChild(ratings);\r\n            }\r\n            \r\n\r\n            if (item.volumeInfo.description) {\r\n                let description = document.createElement('div');\r\n                description.classList.add('book-card-info__description');\r\n                description.innerText = item.volumeInfo.description;\r\n                info.appendChild(description);\r\n            }\r\n            \r\n            if (item.saleInfo.retailPrice) {\r\n                let price = document.createElement('div');\r\n                price.classList.add('book-card-info__price');\r\n                let priceText = '';\r\n                switch (item.saleInfo.retailPrice.currencyCode) {\r\n                    case 'USD':\r\n                        priceText = '$';\r\n                        break;\r\n                    case 'RUB':\r\n                        priceText = '₽';\r\n                        break;\r\n                }\r\n                price.innerText = priceText + item.saleInfo.retailPrice.amount;\r\n                info.appendChild(price);\r\n            }\r\n\r\n            let button = document.createElement('button');\r\n            button.classList.add('button');\r\n            button.classList.add('book-card-info__button');\r\n            button.innerText = 'buy now';\r\n            button.setAttribute('id', item.id);\r\n            button.addEventListener('click', this.buyBook);\r\n            info.appendChild(button);\r\n\r\n            let bookCard = document.createElement('div');\r\n            bookCard.classList.add('book-card');\r\n            bookCard.appendChild(img);\r\n            bookCard.appendChild(info);\r\n\r\n            this.listBooks.appendChild(bookCard);\r\n        });\r\n    }\r\n\r\n    buyBook(event) {\r\n        let button = event.target;\r\n        let id = button.id;\r\n        let booksShopBag = JSON.parse(localStorage.getItem(\"BooksShopBag\"));\r\n        if (booksShopBag && booksShopBag.constructor === Array) {\r\n            let index = booksShopBag.indexOf(id);\r\n            if (index !== -1) {\r\n                booksShopBag.splice(index, 1);\r\n            } else {\r\n                booksShopBag.push(id);\r\n            }\r\n        } else {\r\n            booksShopBag = [id];\r\n        }\r\n\r\n        let counter = booksShopBag.length;\r\n        if (counter) {\r\n            document.querySelectorAll('.shop-bag__counter').forEach(item => {\r\n                item.innerText = counter;\r\n                item.classList.remove('hidden');\r\n            });\r\n        } else {\r\n            document.querySelectorAll('.shop-bag__counter').forEach(item => {\r\n                item.innerText = '';\r\n                item.classList.add('hidden');\r\n            });\r\n        }\r\n        \r\n        localStorage.setItem(\"BooksShopBag\", JSON.stringify(booksShopBag));\r\n    }\r\n\r\n    getCategoriesBooks(category) {\r\n        this.startIndex = 0;\r\n        this.listBooks.innerHTML = '';\r\n        this.getBooks(category);\r\n    }\r\n}\n\n//# sourceURL=webpack://books/./src/js/books.js?");

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _books__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./books */ \"./src/js/books.js\");\n\r\n\r\nlet hamburger = document.querySelector('.hamburger');\r\nif (hamburger) {\r\n    hamburger.addEventListener('click', function (event) {\r\n        document.querySelector('.mobile-nav').classList.toggle('hidden');\r\n    });\r\n    \r\n}\r\n\r\nlet booksShopBag = JSON.parse(localStorage.getItem(\"BooksShopBag\"));\r\nif (booksShopBag && booksShopBag.length) {\r\n    document.querySelectorAll('.shop-bag__counter').forEach(item => {\r\n        item.innerText = booksShopBag.length;\r\n        item.classList.remove('hidden');\r\n    });\r\n}\r\n\r\nlet slider = document.querySelector('.slider');\r\nif (slider) {\r\n    let dots = slider.querySelectorAll('.slider-dots__dot');\r\n    dots.forEach(item => {\r\n        item.addEventListener('click', clickDotBanner);\r\n    });\r\n\r\n    function clickDotBanner() {\r\n        let index = this.id.split('_');\r\n\r\n        let banner = slider.querySelector('#banner_' + index[1]);\r\n        if (banner) {\r\n            slider.querySelectorAll('.slider-dots__dot').forEach(item => {\r\n                item.classList.remove('active');\r\n            });\r\n            slider.querySelectorAll('.slider-banners__img').forEach(item => {\r\n                item.classList.remove('active');\r\n            });\r\n            banner.classList.add('active');\r\n            this.classList.add('active');\r\n        }\r\n    }\r\n}\r\n\r\nlet booksBlock = document.querySelector('.books-block');\r\nif (booksBlock) {\r\n    const books = new _books__WEBPACK_IMPORTED_MODULE_0__[\"default\"](document.querySelector('.list-books-block'));\r\n\r\n    let categories = booksBlock.querySelectorAll('.categories-list__item');\r\n    categories.forEach(item => {\r\n        item.addEventListener('click', clickCategoriesBooks);\r\n    });\r\n\r\n    function clickCategoriesBooks(event) {\r\n        let categoryTag = event.target;\r\n\r\n\r\n        if (categoryTag) {\r\n            booksBlock.querySelectorAll('.categories-list__item').forEach(item => {\r\n                item.classList.remove('active');\r\n            });\r\n            categoryTag.parentElement.classList.add('active');\r\n            books.getCategoriesBooks(categoryTag.innerText);\r\n        }\r\n    }\r\n\r\n    let loadMore = document.querySelector('.load-more');\r\n    loadMore.addEventListener('click', getBooks);\r\n\r\n    function getBooks() {\r\n        let category = booksBlock.querySelector('.categories-list__item.active span');\r\n        if (category) {\r\n            books.getBooks(category.innerText);\r\n        }\r\n    }\r\n\r\n    getBooks();\r\n    \r\n}\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://books/./src/js/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;