let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));


if(!productsInCart){
    productsInCart = [];
    
}
const parentElement = document.querySelector('#buyItems');
const cartSumPrice = document.querySelector('#sum-prices');
const products = document.querySelectorAll('.product-under');


var countTheSumPrice = function () { // 4 everytime that you add a product the sum amount will be added as well
    let sum = 0;
    productsInCart.forEach(item => {
        sum += item.price;
    });
    return sum;
}


const updateShoppingCartHTML = function () {  // 3 retrieving/reflecting all the information that you get when you click addToCart to the HTML
    // of the class name product-under
    localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
    if (productsInCart.length > 0) {
        let result = productsInCart.map(product => {
            return `
                <li class="buyItem">
                    <img src="${product.image}">
                    <div>
                        <h4>${product.name}</h4>
                        <h6>₱${product.price}</h6>
                        <div>
                            <button class="button-minus" data-id=${product.id}>-</button>
                            <span class="countOfProduct">${product.count}</span>
                            <button class="button-plus" data-id=${product.id}>+</button>
                        </div>
                    </div>
                </li>`
        });
        parentElement.innerHTML = result.join('');
        document.querySelector('#checkOut').classList.remove('hidden');
        cartSumPrice.innerHTML = '₱' + countTheSumPrice();
        getBuyItems()

    }
    else {
        document.querySelector('#checkOut').classList.add('hidden');
        parentElement.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>';
        cartSumPrice.innerHTML = '';
    }
}

function updateProductsInCart(product) { // 2 increasing the count eveytime you click addToCart and multiply to total amount of the product
    for (let i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].id == product.id) {
            productsInCart[i].count += 1;
            productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
            return;
        }
    }
    productsInCart.push(product);
}

products.forEach(item => {   // 1 getting all information of the product after clicking addToCart.
    item.addEventListener('click', (e) => {
        if (e.target.classList.contains('addToCart')) {
            let productID = e.target.dataset.productId;
            let productName = item.querySelector('.productName').innerHTML;
            let productPrice = item.querySelector('.priceValue').innerHTML;
            let productImage = item.querySelector('img').src;
            let product = {
                name: productName,
                image: productImage,
                id: productID,
                count: 1,
                price: +productPrice,
                basePrice: +productPrice,
            }
            location.reload();
            updateProductsInCart(product);
            updateShoppingCartHTML();
        }
        
    });
});

    const getBuyItems = () => {
    const parentElement = document.querySelector('#buyItems');

parentElement.addEventListener('click', (e) => { // Last increment or decrement the count/quantity of the product
    const isPlusButton = e.target.classList.contains('button-plus');
    const isMinusButton = e.target.classList.contains('button-minus');
    if (isPlusButton || isMinusButton) {
        console.log(productsInCart.length);
        for (let i = 0; i < productsInCart.length; i++) {
            if (productsInCart[i].id == e.target.dataset.id) {
                if (isPlusButton) {
                    productsInCart[i].count += 1
                }
                else if (isMinusButton) {
                    productsInCart[i].count -= 1
                }
                productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

            }
            if (productsInCart[i].count <= 0) {
                productsInCart.splice(i, 1);
            }
            location.reload();
        }
        updateShoppingCartHTML();
    }
    
});
}

updateShoppingCartHTML();

let change = 0;
let grandTotal = 0;
let amount = 0;


function show_amount_paid_modal(){ //to input your money and to pay the product
    var mydiv = document.querySelector(".amount-paid");
    mydiv.classList.remove("hide");

    mydiv.querySelector(".input-amount").value = "";
    mydiv.querySelector(".input-amount").focus();

    updateShoppingCartHTML();
}

function hide_amount_paid_modal(){ //to cancel payment and hide the change for the receipt to popup
    var mydiv = document.querySelector(".amount-paid");
    mydiv.classList.add("hide");
    var mydiv = document.querySelector(".input-change");
    mydiv.classList.add("hide");
    
    updateShoppingCartHTML();

}

function input_change(){ // to show the change of the amount you paid and input you name for the receipt
    var mydiv = document.querySelector(".input-change");
    mydiv.classList.remove("hide");

    mydiv.querySelector(".change").innerHTML = "₱" + change;
    updateShoppingCartHTML();
}
grandTotal = countTheSumPrice();

function validate_amount_paid() { //to validate to amount paid by the customer
    amount = document.querySelector(".input-amount").value;
    
    if (amount == "") {
        alert("Enter a valid amount!");
        document.querySelector(".input-amount").focus();
        return;
    }

    amount = parseFloat(amount);
    if(amount < grandTotal) {
        alert("Your amount is not enough!");
        return;
    } else {
    change = amount - grandTotal;
    console.log(change);
    hide_amount_paid_modal();
    input_change();
    cartSumPrice.innerHTML = '';
    }
    updateShoppingCartHTML();
}

function print_receipt(){ // to print the receipt of the order

    let inputName = document.querySelector(".input-name").value;
    console.log(inputName);

    var mydiv = document.querySelector(".input-receipt");
    mydiv.classList.remove("hide");

    
    const productInfo = document.querySelector(".productInfo");
	const productPrice = document.querySelector(".productPrice");
	const productQuantity = document.querySelector(".productQuantity");
	const productTotal = document.querySelector(".productTotal");
    const bill = document.querySelector(".bill");
    const amountChange = document.querySelector(".amountChange");
    const nameUser = document.querySelector(".nameUser");


	for (let i = 0; i < productsInCart.length; i++){
		
			productInfo.innerHTML += productsInCart[i].name + '<br>';
			productPrice.innerHTML += productsInCart[i].basePrice + '<br>';
			productQuantity.innerHTML += productsInCart[i].count + '<br>';
			productTotal.innerHTML += productsInCart[i].price + '<br>';

	}
    mydiv.querySelector(".amount").innerHTML =  "Amount Paid: ₱" + amount;
    bill.innerHTML =  "Total Bill: ₱" + grandTotal;
    amountChange.innerHTML = "Change: ₱" + change;
    nameUser.innerHTML = "Thank You For Shopping " + inputName + "!";
    hide_amount_paid_modal();
 

}

function hide_receipt(){ //to finish the transaction
    var mydiv = document.querySelector(".input-receipt");
    mydiv.classList.add("hide");
    cartSumPrice.innerHTML = '';
    localStorage.removeItem('shoppingCart');
    location.reload();
}