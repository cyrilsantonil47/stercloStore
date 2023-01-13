
function closeCart() {
    const cart = document.querySelector('.producstOnCart');
    cart.classList.toggle('hide');
    document.querySelector('body').classList.toggle('stopScrolling')
}


const openShopCart = document.querySelector('.shoppingCartButton');
openShopCart.addEventListener('click', () => {
    const cart = document.querySelector('.producstOnCart');
    cart.classList.toggle('hide');
    document.querySelector('body').classList.toggle('stopScrolling');
});


const closeShopCart = document.querySelector('#closeButton');
const overlay = document.querySelector('.overlay');
closeShopCart.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);


function register() {
    var regUser = document.getElementById("regUser").value;
    var regPass = document.getElementById("regPass").value;
    if (regUser == "" || regPass == "" ){
        alert("Registration Failed");
    } else{
        alert("Login And Enjoy Shopping")
    }
}




function validate(){
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
if(username =="" || password == ""){
    alert("Login Failed");
}
else {
    alert("Hello " +username+ " Enjoy Shopping");
    window.location.href="index.html";
}
}