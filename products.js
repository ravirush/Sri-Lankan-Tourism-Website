let addCartButton = document.getElementsByClassName('addCart-btn')
for (let i = 0; i < addCartButton.length; i++) {
    let button = addCartButton[i]
    button.addEventListener('click', addCart)
}

let removeItemButton = document.getElementsByClassName("remove-btn")
for (let i = 0; i < removeItemButton.length; i++) {
    let button = removeItemButton[i]
    button.addEventListener('click', removeItems)
}

let inputQuantity = document.getElementsByClassName("quantity")
for (let i = 0; i < inputQuantity.length; i++) {
    let input = inputQuantity[i]
    input.addEventListener("change", changeQuantity)
}


// ADD TO CART BUTTON
function addCart(event) {
    let addButton = event.target
    let addItem = addButton.parentElement.parentElement
    let itemImg = addItem.getElementsByClassName("product-image")[0].src
    let itemName = addItem.getElementsByClassName("product-name")[0].innerText
    let itemPrice = addItem.getElementsByClassName("price")[0].innerText
    addItemToCart(itemImg,itemName, itemPrice)
}


// ADD TO CART
function addItemToCart(itemImg, itemName, itemPrice) {
    let newRow = document.createElement("tr")
    let cartTable = document.getElementsByClassName("table-body")[0]
    let cartItemName = cartTable.getElementsByClassName("product-name")
    for (let i = 0; i < cartItemName.length; i++) {
        if (cartItemName[i].innerText == itemName) {
            alert('This item has already been added')
            return
        } 
    }
    let newTableRows = `
    <tr class="table-row">
        <td><img src="${itemImg}" alt=""></td>
        <td class="product-name">${itemName}</td>
        <td class="price">${itemPrice}</td>
        <td><input type="number" value="1" class="quantity"></td>
        <td>$0</td>
        <td><button type="button" class="remove-btn">Remove</button></td>
        </tr>`
        newRow.innerHTML = newTableRows
    cartTable.append(newRow)
    newRow.getElementsByClassName("remove-btn")[0].addEventListener('click', removeItems)
    newRow.getElementsByClassName("quantity")[0].addEventListener("change", changeQuantity)
    updateSubtotal()
}


// REMOVE ITEMS FROM CART
function removeItems(event) {
    let clickedButton = event.target
    clickedButton.parentElement.parentElement.remove()
    updateSubtotal()
}


// CHANGE QUANTITY
function changeQuantity(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
    }
    updateSubtotal()
}


//CALCULATE SUBTOTALS
function updateSubtotal() {
    let cartTable = document.getElementsByClassName("table-body")[0]
    for (let i = 0; i < cartTable.rows.length; i++) {
        let cartRow = cartTable.rows[i]
        let priceElement = cartRow.cells[2];
        let price = parseFloat(priceElement.innerText.replace("LKR", ""));
        let quantityElement = document.getElementsByClassName("quantity")[i];
        let quantity = quantityElement.value;
        let subTotal = 0;
        subTotal = subTotal + (price * quantity)
        cartRow.cells[4].innerText = "LKR" + subTotal
    }   
    updateTotal();
}


//CALCULATE TOTALS
function updateTotal() {

    let cartTable = document.getElementsByClassName("table-body")[0]
    let total = 0
    for (let i = 0; i < cartTable.rows.length; i++) {
        let cartRow = cartTable.rows[i]
        let subTotalElement = cartRow.cells[4];
        let subtotals = parseFloat(subTotalElement.innerText.replace("LKR", ""))
        total = total + subtotals      
    }   
    document.getElementsByClassName("total-bill")[0].innerText = "LKR" + total;
    document.getElementById("amount").innerHTML = " Total Amount: " + "LKR" + total;
    if(total == 0){
        alert("Please choose atleast one product to check out");
    }
}

var cardNameError  = document.getElementById('Cname-error');
var cardNumError = document.getElementById('cardnum-error');
var secError = document.getElementById('Sec_code_error');



function validateName(){
    var Cname = document.getElementById('num').value;

    if(Cname.length == 0){
        cardNameError.innerHTML = 'Name is requried';
        return false;
    }

    if(!Cname.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
        cardNameError.innerHTML = 'Write Card Name';
        return false;
    }
    cardNameError.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
    return true;
}

function validateNumber(){
    var Cnumber = document.getElementById('Cardnumb').value;

    if(Cnumber.length == 0){
        cardNumError.innerHTML = 'Card Number is requried';
        return false;
    }

    if(Cnumber.length != 16){
        cardNumError.innerHTML = "Card no should be 16 digits";
        return false;
    }

    if(!Cnumber.match(/^\d{16}$/)){
        cardNumError.innerHTML = "Card no is required";
        return false;
    }

    cardNumError.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
    return true;
}


function validateCVV(){
    var CVVnum = document.getElementById('CVV').value;

    if(CVVnum.length == 0){
        secError.innerHTML ="CVV Required";
        return false;
    }
    if(CVVnum.length != 3){
        secError.innerHTML = "CVV should be 3 digits";
        return false;
    }
    secError.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
    return true;
}



document.getElementById('r').innerHTML = localStorage.getItem("textuu");
document.getElementById('result').innerHTML = localStorage.getItem("textValue");
document.getElementById('resu').innerHTML = localStorage.getItem("textiii");
document.getElementById('res').innerHTML = localStorage.getItem("textoo");
document.getElementById('re').innerHTML = localStorage.getItem("textbb");
document.getElementById('emailk').innerHTML = localStorage.getItem("textccc");


