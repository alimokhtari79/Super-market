const productsDOM = document.querySelector('.menu');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
// const cartDOM = document.querySelector('.cart');
// const cartOverlay = document.querySelector('.cart-overlay');
// const cartBtn = document.querySelector('.cart-btn');
// const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');

let productsData = [];
let cart = [];

const getProducts = async () => {
	try {
		const result = await fetch('/src/products.json');
		const data = await result.json();

		let ProductsData = data.items;

		ProductsData = ProductsData.map((item) => {
			const { title, price, rate } = item.fields;
			const { id } = item.sys;
			const image = item.fields.image.fields.file.url;
			return { title, price, rate, id, image };
		});

		return ProductsData;
	} catch (err) {
		console.log(err);
	}
};

const displayProducts = (products) => {
	let result = '';
	products.forEach((item) => {
		result += `
    <div class="h-44 rounded-3xl flex product-shadow">

      <div class="w-1/2 h-full flex items-center justify-center">
        <div class="w-36">
          <img src=${item.image} alt=${item.title} />
        </div>
      </div>

      <div class="w-1/2 flex items-center">
        <div
          class="w-full h-36 flex flex-col items-center justify-around px-7 sm:px-6"
        >
          <h2 class="item-title font-bold text-xl text-slate-700">
            ${item.title}
          </h2>
          <div class="w-full flex items-center justify-between">
            <div>
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-amber-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <p class="item-star ml-0.5 text-gray-400 text-xs">
                ${item.rate}</p>
              </div>
              <div class="item-price font-bold">$ ${item.price} </div>
            </div>
            <button
              class="bag-btn p-1 rounded-lg text-white bg-orange-500 active:-translate-y-1 transform data-id=${item.id}"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    `;
	});

	productsDOM.innerHTML = result;
};

const getCartButtons = () => {
	const buttons = [...document.querySelectorAll('.bag-btn')];

	buttons.forEach((item) => {
		let id = item.dataset.id;

		item.addEventListener('click', (event) => {
			let cartItem = { ...getProduct(id), amount: 1 };
			cart = [...cart, cartItem];

			saveCart(cart);

			setCartValues(cart);

			addCartItem(cartItem);
		});
	});
};

const setCartValues = (cart) => {
	let totalPrice = 0;
	let totalItems = 0;

	cart.map((item) => {
		totalPrice = totalPrice + item.price * item.amount;
		totalItems = totalItems + item.amount;
	});

	cartTotal.innerText = totalPrice;
	cartItems.innerText = totalItems;
};

const addCartItem = (item) => {
	const div = document.createElement('div');
	div.classList.add('cart-item');

	div.innerHTML = `
  <div
    class="cart-item text-gray-800 w-96 h-28 bg-white rounded-xl mb-5 flex items-center justify-around"
  >
    <figure>
      <img
        class="w-28 h-28"
        src=${item.image}
        alt=${item.title}
      />
    </figure>
    <div class="h-18 text-base">
      <p class="pb-2 font-bold">${item.title}</p>
      <p class="font-bold">${item.price}</p>
    </div>
    <div class="flex justify-center items-center">
      <button class="border border-gray-900 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18 12H6"
          />
        </svg>
      </button>
      <p class="px-2 font-bold">10</p>
      <button class="border border-gray-900 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </div>
    <div>
      <button class="remove-item bg-rose-800 px-2 py-1 rounded-lg text-white">
        delete
      </button>
    </div>
  </div>
  `;
	cartContent.appendChild(div);
};

const initApp = () => {
	cart = getCart();

	setCartValues(cart);
	populate(cart);
};

const populate = (cart) => {
	cart.forEach((item) => {
		return addCartItem(item);
	});
};

const cartProcess = () => {
	clearCartBtn.addEventListener('click', () => {
		clearCart();
	});

	cartContent.addEventListener('click', (event) => {
		if (event.target.classList.contains('remove-item')) {
			let removeItem = event.target;
			let id = removeItem.dataset.id;

			cartContent.removeChild(
				removeItem.parentElement.parentElement.parentElement
			);

			removeProduct(id);
		}

		if (event.target.classList.contains('fa-chevron-up')) {
			let addAmount = event.target;
			let id = addAmount.dataset.id;

			let product = cart.find((item) => {
				return item.id === id;
			});

			product.amount = product.amount + 1;

			saveCart(cart);
			setCartValues(cart);

			addAmount.nextElementSibling.innerText = product.amount;
		}

		if (event.target.classList.contains('fa-chevron-down')) {
			let lowerAmount = event.target;
			let id = lowerAmount.dataset.id;

			let product = cart.find((item) => {
				return item.id === id;
			});

			product.amount = product.amount - 1;

			if (product.amount > 0) {
				saveCart(cart);
				setCartValues(cart);
				lowerAmount.previousElementSibling.innerText = product.amount;
			} else {
				cartContent.removeChild(lowerAmount.parentElement.parentElement);
				removeProduct(id);
			}
		}
	});
};

const clearCart = () => {
	let cartItems = cart.map((item) => {
		return item.id;
	});

	cartItems.forEach((item) => {
		return removeProduct(item);
	});

	while (cartContent.children.length > 0) {
		cartContent.removeChild(cartContent.children[0]);
	}
};

const removeProduct = (id) => {
	cart = cart.filter((item) => {
		return item.id !== id;
	});

	setCartValues(cart);
	saveCart(cart);
};

// -----------------Storage-----------------

const saveProducts = (products) => {
	localStorage.setItem('products', JSON.stringify(products));
};

const getProduct = (id) => {
	let products = JSON.parse(localStorage.getItem('products'));

	return products.find((item) => item.id === id);
};

const saveCart = (cart) => {
	localStorage.setItem('cart', JSON.stringify(cart));
};

const getCart = () => {
	return localStorage.getItem('cart')
		? JSON.parse(localStorage.getItem('cart'))
		: [];
};

// -----------------Storage-----------------

document.addEventListener('DOMContentLoaded', () => {
	initApp();

	getProducts()
		.then((data) => {
			displayProducts(data);
			saveProducts(data);
		})
		.then(() => {
			getCartButtons();
			cartProcess();
		});
});

//----------Over lay----------

const shoppingCart = document.querySelector('.cart-overlay');
const shoppingCartOpen = () => {
	const shoppingCartBtn = document.querySelector('.shopping-cart--btn');
	const shoppingCartItems = document.querySelectorAll('.cart-item');

	shoppingCartBtn.addEventListener('click', () => {
		shoppingCart.classList.toggle('nav-active');

		shoppingCartItems.forEach((item, index) => {
			if (item.style.animation) {
				item.style.animation = '';
			} else {
				item.style.animation = `shoppingCartFade 0.5s ease forwards ${
					index / 7 + 0.8
				}s`;
			}
		});
	});
};

const shoppingCartSlide = () => {
	shoppingCartOpen();
};

shoppingCartSlide();

//----------Over lay----------
