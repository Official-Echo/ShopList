//Question 1: Should we consider duplicate products in the list? In what way? Do we need to add a new product or increase the quantity of the existing one?
//Question 2: Is limitation of 100 items for each product satisfactory?
//Question 3: Do we need to leave <hr> tags even if there are no products in the list?
const inputField = document.getElementById('product-name');
const addButton = document.getElementById('add-button');
const productList = document.getElementById('product-list');
const remainingList = document.querySelector('.remaining-item');
const boughtList = document.getElementById('bought-wrapper');

const initialProducts = [
	{ name: 'Помідори', quantity: 2, purchased: true },
	{ name: 'Печиво', quantity: 2, purchased: false },
	{ name: 'Сир', quantity: 1, purchased: true }
];

function addProduct() {
	const inputProductName = inputField.value.trim();
	if (inputProductName) {
		const existingProduct = initialProducts.find(product => product.name.toLowerCase() === inputProductName.toLowerCase());
		if (existingProduct && !existingProduct.purchased) {
			existingProduct.quantity++;
		} else {
			const newProduct = { name: inputProductName, quantity: 1, purchased: false };
			initialProducts.push(newProduct);
		}
		renderProducts();
		inputField.value = '';
		inputField.focus();
	}
}

function removeProduct(index) {
	initialProducts.splice(index, 1);
	renderProducts();
}

function togglePurchased(index) {
	initialProducts[index].purchased = !initialProducts[index].purchased;
	renderProducts();
}

function changeQuantity(index, increment) {
	if (increment && initialProducts[index].quantity < 99) {
		initialProducts[index].quantity++;
	} else if (!increment && initialProducts[index].quantity > 1) {
		initialProducts[index].quantity--;
	}
	renderProducts();
}

function renderProducts() {
	productList.innerHTML = '';
	document.querySelector('.remaining-items-container').innerHTML = '';
	remainingList.innerHTML = '';
	boughtList.innerHTML = '';

	let remainingTotal = 0;
	let boughtTotal = 0;

	initialProducts.forEach((product, index) => {
		const productItem = document.createElement('li');
		productItem.classList.add(product.purchased ? 'item-container' : 'not-item-container');

		const nameSpan = document.createElement('span');
		nameSpan.classList.add('product-noun');
		nameSpan.textContent = product.name;
		nameSpan.style.textDecoration = product.purchased ? 'line-through' : 'none';
		nameSpan.contentEditable = !product.purchased;
		nameSpan.addEventListener('blur', () => {
			if (!product.purchased) {
				product.name = nameSpan.textContent.trim();
				renderProducts();
			}
		});

		const minusButton = document.createElement('button');
		minusButton.classList.add('minus-button');
		minusButton.textContent = '−';
		minusButton.dataset.tooltip = product.quantity === 1 ? 'Для зменшення кількості оберіть хоча б <1 одиниці товару' : 'Зменшити кількість';
		minusButton.dataset.faded = product.quantity === 1 ? 'red-faded' : '';
		minusButton.id = product.purchased ? 'hidden-button' : '';
		minusButton.addEventListener('click', () => changeQuantity(index, false));

		const quantitySpan = document.createElement('span');
		quantitySpan.classList.add('quantity');
		quantitySpan.textContent = product.quantity;

		const plusButton = document.createElement('button');
		plusButton.classList.add('plus-button');
		plusButton.textContent = '+';
		plusButton.dataset.tooltip = 'Збільшити кількість';
		plusButton.id = product.purchased ? 'hidden-button' : '';
		plusButton.addEventListener('click', () => changeQuantity(index, true));

		const statusButton = document.createElement('button');
		statusButton.classList.add(product.purchased ? 'status-button' : 'not-status-button');
		statusButton.textContent = product.purchased ? 'Не куплено' : 'Куплено';
		statusButton.dataset.tooltip = product.purchased ? 'Зміна стану товару на "Не куплено"' : 'Зміна стану товару на "Куплено"';
		statusButton.addEventListener('click', () => togglePurchased(index));

		const deleteButton = document.createElement('button');
		deleteButton.classList.add('delete-button');
		deleteButton.textContent = '×';
		deleteButton.dataset.tooltip = 'Видалити товар';
		deleteButton.addEventListener('click', () => removeProduct(index));
		deleteButton.style.display = product.purchased ? 'none' : 'inline-block';

		productItem.appendChild(nameSpan);
		productItem.appendChild(minusButton);
		productItem.appendChild(quantitySpan);
		productItem.appendChild(plusButton);
		productItem.appendChild(statusButton);
		productItem.appendChild(deleteButton);

		productList.appendChild(productItem);
		if (index !== initialProducts.length - 1) {
			productList.appendChild(document.createElement('hr'));
		}

		if (!product.purchased) {
			const remainingItem = document.createElement('div');
			remainingItem.classList.add('remaining-item');
			remainingItem.textContent = `${product.name} `;
			const remainingAmount = document.createElement('span');
			remainingAmount.classList.add('amount');
			remainingAmount.textContent = product.quantity;
			remainingItem.appendChild(remainingAmount);
			document.querySelector('.remaining-items-container').appendChild(remainingItem);
			remainingTotal += product.quantity;
		} else {
			const boughtItem = document.createElement('div');
			boughtItem.classList.add('remaining-item');
			boughtItem.innerHTML = `<s>${product.name}</s> <span class="amount"><s>${product.quantity}</s></span>`;
			boughtList.appendChild(boughtItem);
			boughtTotal += product.quantity;
		}
	});

}

addButton.addEventListener('click', addProduct);
inputField.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		addProduct();
	}
});

renderProducts();